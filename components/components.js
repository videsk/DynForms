export default (prefix) => ({
  container: {
    type: 'div',
    attr: {
      class: 'item',
    },
  },
  input: {
    type: 'input',
    data: { label: "", value: "" },
    attr: {
      class: 'input',
      placeholder: '{placeholder}',
      'dyn-data-id': '{id}',
    },
    events: {
      onkeyup: (element, id, update, data, form, self) => {
        element.onkeyup = function () {
          const value = element.value;
          update(id, value, self);
        };
      },
    },
  },
  textarea: {
    type: 'textarea',
    data: { label: "", value: "" },
    attr: {
      class: 'textarea',
      resize: '{resize}',
      'dyn-data-id': '{id}',
    },
    events: {
      onkeyup: (element, id, update, data, form, self) => {
        element.onkeyup = function () {
          const value = element.value;
          update(id, value, self);
        };
      },
    },
  },
  select: {
    type: 'div',
    data: { label: "", value: "" },
    attr: {
      class: 'select',
      tabindex: '0',
      'dyn-data-id': '{id}',
    },
    content: [
      {
        type: 'div',
        attr: {
          class: 'select-value-container',
        },
        content: [
          {
            type: 'div',
            attr: {
              class: 'select-value',
            },
            content: [
              {
                type: 'input',
                attr: {
                  placeholder: '{placeholder}',
                },
                events: {
                  onfocus: (element, id) => {
                    element.onfocus = function () {
                      // Add focused class
                      document.querySelector(`[dyn-data-id="${id}"]`).classList.add(`${prefix}focused`);
                      // Show hidden
                      document.querySelectorAll(`[dyn-data-id="${id}"] ul > li`).forEach(option => option.classList.remove(`${prefix}hidden`));
                    };
                  },
                  onblur: (element, id, update, data) => {
                    element.onblur = function () {
                      // Remove focused class
                      document.querySelector(`[dyn-data-id="${id}"]`).classList.remove(`${prefix}focused`);
                      // Set the value
                      if (data) element.value = data.label;
                    };
                  },
                  onkeyup: (element, id) => {
                    element.onkeyup = function () {
                      // Get value of input
                      const { value } = document.querySelector(`[dyn-data-id="${id}"] input`);
                      // Hide all
                      document.querySelectorAll(`[dyn-data-id="${id}"] ul > li`).forEach(option => (!option.childNodes[0].innerText.trim().toLowerCase().includes(value.trim().toLowerCase())) && option.classList.add(`${prefix}hidden`));
                      // Show only values match
                      document.querySelectorAll(`[dyn-data-id="${id}"] ul > li`).forEach(option => {
                        if  (option.childNodes[0].innerHTML.toLowerCase().includes(value.toLowerCase())) option.classList.remove(`${prefix}hidden`);
                      });
                    };
                  }
                },
              },
            ],
          },
          {
            type: 'div',
            attr: {
              class: 'select-arrow',
            },
          }
        ],
      },
      {
        type: 'div',
        attr: {
          class: 'select-container',
        },
        content: [
          {
            type: 'ul',
            content: '[options]',
            parent: 'select',
          },
        ]
      },
    ],
    models: {
      options: {
        type: 'li',
        attr: {
          'data-value': '{value}',
        },
        content: [
          {
            type: 'div',
            attr: {
              class: 'option-label',
            },
            content: '{label}'
          },
          {
            type: 'div',
            attr: {
              class: 'selected-icon',
            },
          },
        ],
        events: {
          onclick: (element, id, update, data, form, self) => {
            element.onclick = function () {
              // Delete selected
              document.querySelectorAll(`[dyn-data-id="${id}"] ul > li`).forEach(option => option.classList.remove(`${prefix}selected`));
              // Get value
              const value = element.getAttribute('data-value');
              const { label } = form.options[form.options.findIndex(obj => obj.value === value)];
              // Blur Form item
              document.querySelector(`[dyn-data-id="${id}"]`).blur();
              document.querySelector(`[dyn-data-id="${id}"] input`).value = label;
              // Add selected class
              element.classList.add(`${prefix}selected`);
              // Update in form
              update(id, value, self);
            };
          },
        },
      },
    },
  },
  multiple: {
    type: 'div',
    data: [],
    attr: {
      class: 'select',
      tabindex: '0',
      'dyn-data-id': '{id}',
    },
    content: [
      {
        type: 'div',
        attr: {
          class: 'select-value-container',
        },
        content: [
          {
            type: 'div',
            attr: {
              class: 'select-value',
            },
            content: [
              {
                type: 'ul',
                attr: {
                  class: 'select-selections',
                },
                content: '[values]',
                parent: 'multiple',
              },
              {
                type: 'input',
                attr: {
                  placeholder: '{placeholder}',
                },
                events: {
                  onfocus: (element, id) => {
                    element.onfocus = function () {
                      // Add selected class
                      document.querySelector(`[dyn-data-id="${id}"]`).classList.add(`${prefix}focused`);
                      // Show all options hidden
                      document.querySelectorAll(`[dyn-data-id="${id}"] ul > li`).forEach(option => option.classList.remove(`${prefix}hidden`));
                    }
                  },
                  onblur: (element, id) => {
                    element.onblur = function () {
                      // Remove selected class
                      document.querySelector(`[dyn-data-id="${id}"]`).classList.remove(`${prefix}focused`);
                    }
                  },
                  onkeyup: (element, id) => {
                    element.onkeyup = function () {
                      // Get value of input
                      const { value } = element;
                      // Hide all
                      document.querySelectorAll(`[dyn-data-id="${id}"] ul > li`).forEach(option => option.classList.add(`${prefix}hidden`));
                      // Show only values match
                      document.querySelectorAll(`[dyn-data-id="${id}"] ul > li`).forEach(option => {
                        if (option.childNodes[0].innerText.toLowerCase().includes(value.toLowerCase())) option.classList.remove(`${prefix}hidden`);
                      })
                    };
                  },
                }
              },
            ],
          },
          {
            type: 'div',
            attr: {
              class: 'select-arrow',
            },
          }
        ],
      },
      {
        type: 'div',
        attr: {
          class: 'select-container',
        },
        content: [
          {
            type: 'ul',
            content: '[options]',
            parent: 'multiple',
          }
        ]
      },
    ],
    models: {
      options: {
        type: 'li',
        attr: {
          'data-value': '{value}'
        },
        content: [
          {
             type: 'div',
             attr: {
               class: 'option-label',
             },
             content: '{label}',
          },
          {
             type: 'div',
             attr: {
               class: 'selected-icon',
             },
          }
        ],
        events: {
          onclick: (element, id, update, data, form, self) => {
            element.onclick = function () {
              // Get the value of option
              const value = element.getAttribute('data-value');

              if (element.classList.contains(`${prefix}selected`)) {
                // Delete selected class
                element.classList.remove(`${prefix}selected`);
                // Update data
                update(id, value, self);
                // Remove from selected
                const node = document.querySelector(`[dyn-data-id="${id}"] .${prefix}select-selections > li[data-value="${value}"]`);
                if (node && typeof node === 'object') node.remove();
              }
              else {
                // Update value
                update(id, value, self);
                // Add class selected to option
                element.classList.add(`${prefix}selected`);
                // Get the value in input
                const input = document.querySelector(`[dyn-data-id="${id}"] input`);
                // If have text clear and focus
                if (input.value.length > 0) {
                  input.value = '';
                  input.focus();
                }
                // Create element
                const node = document.createElement('li');
                const text = document.createElement('label');
                const close = document.createElement('div');
                node.classList.add(`${prefix}select-container-value`);
                close.classList.add(`${prefix}select-remove-value`);
                close.onclick = function (event) {
                  event.stopPropagation();
                  // Delete selected class
                  element.classList.remove(`${prefix}selected`);
                  // Update data
                  update(id, value, self);
                  // Remove from selected
                  const node = document.querySelector(`[dyn-data-id="${id}"] .${prefix}select-selections > li[data-value="${value}"]`);
                  if (node && typeof node === 'object') node.remove();
                };
                const { label } = form.options[form.options.findIndex(obj => obj.value === value)];
                text.innerText = label;
                node.setAttribute('data-value', value);
                node.appendChild(text);
                node.appendChild(close);
                document.querySelector(`[dyn-data-id="${id}"] .${prefix}select-selections`).appendChild(node);
              }
            };
          },
        },
      },
      values: {
        type: 'div',
        attr: {
          class: 'select-container-value',
          'data-value': '{value}',
        },
        content: [
          {
            type: 'label',
            content: '{label}',
          },
          {
            type: 'div',
            attr: {
              class: 'select-remove-value',
            },
          },
        ],
      }
    },
  },
  radio: {
    type: 'ul',
    data: { label: "", value: "" },
    attr: {
      class: 'radio-group',
      'dyn-data-id': '{id}',
    },
    content: '[options]',
    parent: 'radio',
    models: {
      options: {
        type: 'li',
        attr: {
          class: 'radio-option',
          'data-value': '{value}',
        },
        content: [
          {
            type: 'div',
            attr: {
              class: 'radio-selector',
            },
          },
          {
            type: 'label',
            content: '{label}',
          }
        ],
        events: {
          onclick: (element, id, update, data, form, self) => {
            element.onclick = function () {
              document.querySelectorAll(`[dyn-data-id="${id}"] li`).forEach(option => option.classList.remove(`${prefix}checked`));
              update(id, element.getAttribute('data-value'), self);
              element.classList.add(`${prefix}checked`);
            };
          },
        }
      }
    },
  },
  checkbox: {
    type: 'ul',
    data: [],
    attr: {
      class: 'checkbox-group',
      'dyn-data-id': '{id}',
    },
    content: '[options]',
    parent: 'checkbox',
    models: {
      options: {
        type: 'li',
        attr: {
          class: 'checkbox-option',
          'data-value': '{value}',
        },
        content: [
          {
            type: 'div',
            attr: {
              class: 'checkbox-selector',
            },
          },
          {
            type: 'label',
            content: '{label}',
          }
        ],
        events: {
          onclick: (element, id, update, data, form, self) => {
            element.onclick = function () {
                const value = element.getAttribute('data-value');
                update(id, value, self);
                if(element.classList.contains(`${prefix}checked`)) element.classList.remove(`${prefix}checked`);
                else element.classList.add(`${prefix}checked`);
            };
          },
        }
      }
    },
  },
  rate: {
    type: 'ul',
    data: { label: "", value: "" },
    attr: {
      class: 'rate-group',
      'dyn-data-id': '{id}',
    },
    content: '[options]',
    parent: 'rate',
    models: {
      options: {
        type: 'li',
        attr: {
          class: '{icon}',
          'data-value': '{value}',
          tooltip: '{label}',
        },
        events: {
          onclick: (element, id, update, data, form, self) => {
            element.onclick = function () {
              console.log(data);
              const node = document.querySelector(`[dyn-data-id="${id}"]`);
              const clearable = node.getAttribute('clearable');
              if (clearable !== null && data.value.value !== '') document.querySelectorAll(`[dyn-data-id="${id}"] li`).forEach(option => option.classList.remove(`${prefix}selected`));
              else if (clearable !== null && data.value.value === '') {
                element.classList.add(`${prefix}selected`);
                update(id, element.getAttribute('data-value'), self);
              }
              else if (clearable === null && data.value.value === '') {
                element.classList.add(`${prefix}selected`);
                update(id, element.getAttribute('data-value'), self);
              }
            };
          },
        }
      }
    },
  },
});
