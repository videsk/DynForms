/*
**  DynForms by Videsk™ 2019 - MIT
**
**  Class that generate forms with JSON schema. This library
**  was designed for create dynamic forms with JSON schema
**  provided from REST API.
**
**  Github: https://github.com/videsk/DynForms - NPM: https://npmjs.com/package/@videsk/DynForms
 */

import Components from './components/components';
import tooltip from 'tippy.js';

module.exports = class DynForm {

  constructor({ form, options, components }) {
    this.form = (Array.isArray(form)) ? form : this.Exception();
    this.options = options;
    this.data = [];
    this.components = (typeof components === 'function') ? components : Components;
    this.handler = { items: 0 };
    this.prefix = ('prefix' in options) ? options.prefix : 'dynforms__';
    this.types = this.typeElementsAvailable();
    this.className = (name) => `${this.prefix}${name}`;
  }

  render() {
    this.Debug('info', 'DynForms has started...');
    if (!this.validateOptions) new Error('The options isn\'t valid, please check properties and try again. Read documentation: https://github.com/videsk/DynForms');
    this.checkUnique(valid => {
      if (valid) this.createForm();
      else new Error('Please check ids, some id elements are repeated. Read documentation: https://github.com/videsk/DynForms' );
    });
  }

  createForm() {
    this.Debug('info', 'Creating Form...');
    // Start to parse object by object
    Promise.all(this.form.map(async obj => await this.renderElement(obj)))
      .then(() => this.Debug('info', `DynForm finished rendering ${this.handler.items} of ${this.form.length} elements.`));
  }

  updateData(id, newValue, self) {
    self = self || this;
    self.Debug('info', `Updating value of ${id} field...`);
    // Get the index on data array
    const index = self.data.findIndex(obj => obj.id === id);
    // Get value in object of field [READONLY]
    const { value } = self.data[index];
    // Get form of field
    const form = self.searchProperty(id);
    // Get label value
    const labelInOptions = () => {
      const obj = form.options[form.options.findIndex(obj => obj.value === newValue)];
      return (obj && 'label' in obj) ? obj.label : '';
    };
    const label = ('options' in form)
      ? labelInOptions()
      : form.label;
    // Search index in value
    const indexValue = (Array.isArray(value)) && value.findIndex(obj => obj.value === newValue);
    // Check if not exist in array value
    const checkInArray = indexValue > -1;
    // If value is array and not exist push
    if (Array.isArray(value) && !checkInArray) self.data[index].value.push({ label, value: newValue });
    // If value is array and exist splice
    else if (Array.isArray(value) && checkInArray) self.data[index].value.splice(indexValue, 1);
    // If value is object and is not equal set
    else if (typeof value === 'object') self.data[index].value = { label, value: newValue };
  }

  renderElement(obj) {
    if (this.types.includes(obj.type)) {
      this.Debug('info', `Rendering ${obj.type} element...`);
      // Create main container
      const container = this.createElement({ type: 'div', attr: { class: 'item' }, id: 'container' }, null, 'container');
      // Create label
      const label = ('label' in obj && obj.label) && this.createLabel(obj);
      // Append label to container
      if (label) container.appendChild(label);
      // Create element form
      const element = this.createFormElement(obj, container);
      container.appendChild(element);
      // Add elements finish
      this.handler.items++;
      // Append to main container in options
      // If is DOM node append
      if (typeof this.options['container'] === 'object') this.options['container'].appendChild(container);
      // If is string use querySelector
      else if (typeof this.options['container'] === 'string') document.querySelector(this.options['container']).appendChild(container);
      // If is other typeof return error
      else new Error('Container is a invalid format. DynForm allow DOM node or query string. Read documentation: https://github.com/videsk/DynForms');
    }
    else new Error('Some element has a type property that is not available yet. Read documentation: https://github.com/videsk/DynForms')
  }

  createElement(obj, parent, id, level) {
    if ('debug' in this.options && this.options.debug) console.log(`%c ${obj.type} %c ${id}`,
      'background: #137b13; color: white; border-radius: 4px 0 0 4px; padding: 3px 5px; font-weight: normal; text-align: center; box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2); font-family: sans-serif;',
      'background: #2472b7; color: white; border-radius: 0 4px 4px 0; padding: 3px 5px; font-weight: normal; text-align: center; box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2); font-family: sans-serif;');
    this.Debug('info', `Creating a ${obj.type} node...`);
    const element = document.createElement(obj.type);
    this.setAttributes(element, obj.attr, id, level);
    this.setContent(element, obj, id, level);
    if ('events' in obj) this.setEvents(element, id, obj.events);
    if (parent) parent.appendChild(element);
    else return element;
  }

  createFormElement(obj) {
    this.Debug('info', `Creating a ${obj.type} form element...`);
    // Get properties of form element
    let component = this.components(this.prefix)[obj.type];
    // Add to data array
    this.data.push({ id: obj.id, value: component.data });
    // Create element
    const element = this.createElement(this.mergeProperties(component, obj), null, obj.id);
    // Return element
    return element;
  };

  setContent(element, obj, id, level) {
  this.Debug('info', `Setting content of ${obj.type} node...`);
    const selectParser = (value) => (value.includes('{')
      && value.includes('}'))
        ? { value: this.parseValue(value), key: {} }
        : ((value.includes('[')
            && value.includes(']')
            && { value: this.parseContent(value), key: [] })
          );
    if (obj && 'content' in obj) {
      if (typeof obj['content'] === 'string') this.setOptions(element, obj, selectParser(obj['content']), id, level);
      else if (Array.isArray(obj['content'])) obj['content'].map(formElement => this.createElement(formElement, element, id, level));
    }
  }

  setAttributes(element, attr, id, level) {
    this.Debug('info', `Setting attributes of ${id} nodes...`);
    // Validate attributes
    if (this.validateProperty('attr', attr)) {
      // Get array of keys
      const attributes = Object.keys(attr);
      // Set attribute one by one
      attributes.map(prop => {
        // Only set if is valid attribute value
        if (this.validateProperty('string', attr[prop]) && prop === 'class') element.setAttribute(prop, `${this.className(this.parseAttribute(attr[prop], id))}`);
        else if (this.validateProperty('string', attr[prop]) && prop === 'tooltip') tooltip(element, { content: this.parseAttribute(attr[prop], id, level, 'label') });
        else if (this.validateProperty('string', attr[prop])) element.setAttribute(prop, this.parseAttribute(attr[prop], id, level));
      });
    }
  }

  setOptions(element, obj, { value, key }, id, level) {
    this.Debug('info', `Setting options of ${id} field...`);
    // Find index in form
    const index = this.form.findIndex(e => e.id === id);
    // Store object
    const data = this.form[index];
    // Get model of component
    const model = ('parent' in obj) && this.components(this.prefix)[obj.parent].models[value];
    // If is array create and append
    if (Array.isArray(key) && value in data) data[value].map((option, index) => this.createElement(Object.assign(model, option), element, id, { key: 'options', index }));
    // If is object get value with key
    else if (typeof key === 'object' && !level) element.innerHTML = (value in data) ? data[value] : '';
    // Is is nested content
    else if (typeof level === 'object') {
      const { label } = data[level.key][level.index];
      element.innerHTML = label;
    }
  }

  setEvents(element, id, events) {
    this.Debug('info', `Setting events of ${id} element...`);
    const data = this.searchData(id);
    const properties = this.searchProperty(id);
    Object.keys(events).map(event => events[event](
        element, // element
        id, // id
        this.updateData, // update
        data, // data
        properties, // form
        this, // self
      )
    );
  }

  parseAttribute(attr, id, level, subkey) {
    this.Debug('info', `Parsing attributes of ${id} field...`);
    if (attr.includes('{') && attr.includes('}')) {
      const key = this.searchProperty(id);
      if (key && typeof level === "object") {
        const data = key[level.key][level.index];
        return (subkey) ? data[subkey] : data.value;
      }
      else if (key) return key[this.parseValue(attr)] || '';
      else return '';
    }
    else return attr;
  }

  searchProperty(id) {
    if (!id) this.Debug('warn', 'The id is null, please check.  Read documentation: https://github.com/videsk/DynForms');
    this.Debug('info', `Searching properties of ${id} field...`);
    const index = this.form.findIndex(obj => obj.id === id);
    return this.form[index];
  }

  searchData(id) {
    if (!id) this.Debug('warn', 'The id is null, please check.  Read documentation: https://github.com/videsk/DynForms');
    this.Debug('info', `Searching data of ${id} field...`);
    const index = this.data.findIndex(obj => obj.id === id);
    return this.data[index];
  }

  parseValue(value) {
    this.Debug('info', 'Parsing value on a node...');
    // Get the value between {value}
    return value.substring(
      value.lastIndexOf('{') + 1,
      value.lastIndexOf('}')
    );
  }

  parseContent(content) {
    this.Debug('info', 'Parsing content on a node...');
    // Get the reference between [content]
    return content.substring(
      content.lastIndexOf('[') + 1,
      content.lastIndexOf(']')
    );
  }

  mergeProperties(component, element) {
    this.Debug('info', 'Merging a properties...');
    Object.keys(element).map(key => {
      if (key === 'type');
      else if (typeof element[key] === 'object' && key in component) this.mergeProperties(component[key], element[key]);
      else if (element[key] && component[key] && key === 'class') component[key] = component[key].concat(' ',element[key]);
      else component[key] = element[key];
    });
    return component;
  }

  createLabel(obj) {
    this.Debug('info', `Creating a label of ${obj.type} field...`);
    const element = document.createElement('div');
    const label = document.createElement('label');
    const help = document.createElement('div');
    element.classList.add(`${this.prefix}label`);
    label.innerText = obj.label;
    if ('helps' in obj && 'label' in obj.helps) tooltip(help, { content: obj.helps.label });
    element.appendChild(label);
    help.classList.add(`${this.prefix}tooltip`);
    if ('helps' in obj && 'label' in obj.helps) element.appendChild(help);
    return element;
  }

  validateProperty(type, value) {
    this.Debug('info', `Validating ${type} property...`);
    switch (type) {
      case 'attr': return value
                          && typeof value === 'object'
                          && Object.keys(value).length > 0;
        break;
      case 'options': return value
                              && Array.isArray(value)
                              && value.length > 0;
        break;
      case 'values': return value
                            && Array.isArray(value)
                            && value.length > 0;
        break;
      case 'string': return value === '' || value && typeof value === 'string';
        break;
    }
  }

  checkUnique(callback) {
    this.Debug('info', `Checking ids are uniques...`);
      callback(true);
  }

  typeElementsAvailable() {
    return Object.keys(this.components(this.prefix)).map(type => type);
  }

  validateOptions() {
    this.Debug('info', 'Validating an options...');
    return (this.options
      && typeof this.options === 'object'
      && 'container' in this.options);
  }

  Debug(type, msg) {
    const parse = (value) => (value < 10) ? `0${value}` : value;
    const { debug } = this.options;
    const today = new Date();
    if (debug) console[type](`%c ${msg} ${parse(today.getHours())}:${parse(today.getMinutes())}:${parse(today.getSeconds())}`,
      'font-family: sans-serif;');
  }

  Exception() {
    console.error(`The form need be Array, and is an ${typeof this.form}. Read documentation: https://github.com/videsk/DynForms`);
  }

  extends(a){
    let b;
    return b = a[a.length-1],
      a.pop(),
      ( a = a.length > 1 ) ? this.extends(a) : a[0],
      function(){
        b.apply(new a)
      }
  }

};
