# DynForms by Videsk™

DynForms or Dynamics Forms es una bifurcación o continuación de [AOForm](https://github.com/videsk/aoform) que corresponde a la primera librería creada para generar formularios a partir de esquemas JSON.

---

Esta biblioteca permite generar formularios con un esquema JSON simple para navegadores modernos. La idea proviene de generar formularios dinámicos con un esquema JSON proporcionado a través de REST API para Videsk ™.

Se utilizó flexbox para cada posición de los componentes, generando un diseño totalmente responsivo. Las interacciones con los componentes están diseñadas con 50% de CSS y 50% de Javascript ES6, lo que hace que el tiempo de ejecución sea muy rápido y liviano.

Puede configurar o agregar sus estilos personalizados para cada componente. En ese caso, recomendamos leer la documentación de CSS personalizada con detención, porque CSS es esencial en el estado, las interacciones y los indicadores visuales. Pero es realmente fácil modificar estilos básicos de elementos como `colores`, `radio` y otros.

## Índice

- [Ejemplo de prueba](#ejemplos-de-prueba)
- [Instalación](#instalacion)
- [Características](#caracteristicas)
- [Cómo usar](#como-usar)
- [Elementos](#elementos)
- [Propiedades](#propiedades)
    - [type](#type)
    - [id](#id)
    - [label](#label)
    - [attr](#attr)
    - [helps](#helps)
    - [options](#options)
    - [values](#values)
- [Validaciones](#validaciones)
- [Cargas dinámicas](#cargas-dinamicas)
- [Configuración](#configuracion)
- [Derechos de uso](#derechos-de-uso)

## Ejemplo de prueba

Para ver el ejemplo de prueba haga [clic aquí](https://videsk.github.io/DynForms/examples/).

Recuerde que para visualizar los datos debe acceder a la consola de desarrollador o DevTools, apretando la tecla F12, o bien la combinación de teclas Ctrl + Shift + i o clic derecho y luego clic en Inspeccionar.

Acceda a la pestaña `Console` o presione la tecla Esc. Luego escriba `Form.data`, mostrando el listado de los valores.

## Instalación

Si desea utilizar DynForms en sus proyectos personales o empresariales solo deberá hacerlo mediante:

Via NPM
```js
npm i @videsk/dynforms
```

or en el body
```html
<script src="/dynforms.min.js" async></script>
```
**Utilice la versión minimizada en producción ubicada en la carpeta dist /.**

## Características

Esta librería permite generar formularios dinámicos con una simple estructura JSON, es decir, que mediante una breve configuración se podrá generar un formulario de forma sencilla.

Un formato JSON (acrónimo de Javascript Object Notation, «notación de objeto de JavaScript») es un formato de texto sencillo para el intercambio de datos.

Con el siguiente ejemplo generaremos un formulario que contenga:

- Campo de texto
- Área de texto (multi línea)
- Selector con capacidad de filtrar opciones
- Selector múltiple con capacidad de filtrar opciones
- Selección de alternativa única
- Selección múltiple
- Selección de rango (Rating)

> Para ver ejemplos por cada elemento, vea la sección [Elementos](https://github.com/videsk/DynForms#elementos)

Para generar los tipos de elementos mencionados anteriormente se utilizará el siguiente código:

```js
[
  {
    type: 'input',
    id: 'name',
    label: 'Nombre',
    placeholder: 'Escriba su nombre completo',
  },
  {
    type: 'textarea',
    id: 'about',
    label: 'Acerca de su vida',
    attr: {
      placeholder: 'Escriba algo acerca de su vida...',
    },
    helps: {
      label: 'Escriba un texto inferior a 100 carácteres',
    },
  },
  {
    type: 'select',
    id: 'country',
    label: 'País',
    options: [
      { label: 'Chile', value: 'CL' },
      { label: 'EEUU', value: 'US' },
      { label: 'Alemania', value: 'DE' },
    ],
    helps: {
      label: 'Seleccione su país de residencia',
    }
  },
  {
    type: 'multiple',
    id: 'color',
    label: 'Color Favorito',
    options: [
      { label: 'Azul', value: 'blue' },
      { label: 'Verde', value: 'green' },
      { label: 'Negro', value: 'black' },
    ],
    helps: {
      label: 'Seleccione su color favorito',
    }
  },
  {
    type: 'radio',
    id: 'gender',
    label: 'Género',
    options: [
      { label: 'Hombre', value: 'male' },
      { label: 'Mujer', value: 'female' },
      { label: 'Otro', value: 'other' },
    ],
    helps: {
      label: 'Seleccione su género',
    }
  },
  {
    type: 'checkbox',
    id: 'pet',
    label: 'Mascota Favorita',
    options: [
      { label: 'Gato', value: 'cat' },
      { label: 'Perro', value: 'dog' },
      { label: 'Ave', value: 'bird' },
      { label: 'Hurón', value: 'ferret' },
    ],
    helps: {
      label: 'Select su mascota actual o favorita',
    }
  },
  {
    type: `rate`,
    id: 'satisfaction',
    label: '¿Cuán satisfecho está con la atención?',
    icon: 'star',
    options: [
      { label: 'Muy Satisfecho', value: '5' },
      { label: 'Satisfecho', value: '4' },
      { label: 'Indiferente', value: '3' },
      { label: 'Insatisfecho', value: '2' },
      { label: 'Decepcionado', value: '1' },
    ],
    helps: {
      label: 'En un rango de Muy Satisfecho a Decepcionado',
    }
  }
];
```

Con el anterior formato JSON podrá generar un formulario de forma sencilla. Aún así existe la posibilidad de realizar configuraciones más complejas para cada uno de los elementos, para ello dirígase a la sección [Propiedades](https://github.com/videsk/DynForms#propiedades).

## ¿Cómo usar?

Para usar DynForms requiere de dos parámetros obligatorios `form` y `options`, mientras que `components` es opcional. Los parámetros anteriores deben ir en un objeto único.

Ejemplo:

```js
const parameters = { form: [{...}, options: {...}, components: () => ({...})] }
```

> En caso que desee reemplazar la actual estructura HTML de cada elemento proporcione la propiedad `components` como función que retorne un objeto con los elementos.

Para generar un formulario debe realizar dos pasos, instanciar DynForms y luego dar orden de renderizar.

#### 1) Instanciar

```js
const form = new DynForm(parameters);
```

#### 2) Renderizar
```js
form.render();
```

Con estos dos pasos se obtendrá renderizado un formulario según los elementos entregados en el parámetro `form` y en el elemento del DOM configurado en `options.container`.

## Elementos

El listado de elementos disponibles en la versión actual ![version](https://img.shields.io/github/package-json/v/videsk/DynForms) son:

- `input`
- `select`
- `multiple`
- `radio`
- `checkbox`
- `rate`


## Propiedades

Existen propiedades las cuales permiten que DynForms interprete y genere un elemento.

> Hay propiedades que solo están disponibles para ciertos elementos dependiendo de su composición. En esta sección se mencionarán solo los globales, para casos específicos dirígase a la sección [Elementos](https://github.com/videsk/DynForms#elementos).

### `type`

La propiedad `type` proporciona el tipo de elemento que se desea generar. Los tipos de elementos disponibles se pueden encontrar en la sección anterior.

Esta propiedad es obligatoria y debe ser de tipo `string`.

### `id`

La propiedad `id` proporciona un identificador para el elemento, esto con el objetivo de lograr identificar en el listado de respuestas el valor que le corresponde al elemento.

Esta propiedad es obligatoria y debe ser de un tipo `string`.

### `label`

La propiedad `label` proporciona un título al elemento. Es decir, indica al usuario que se requiere ingresar o seleccionar.

Esta propiedad es opcional y debe ser de tipo `string`.

### `attr`

La propiedad `attr` proporciona un listado de atributos que se añadirán al elemento. Algunos ejemplos de attributos serían `class`, `placeholder`, `style`, `disabled`, etc. En el caso de ser añadir una o más clases, estas se anexarán a la por defecto del elemento, que se compone de `dynforms__element`.

Esta propiedad es opcional y debe ser de tipo `object`.

### `helps`

La propiedad `helps` proporciona un tooltip o ayuda flotante hacia los usuarios para entregar más información respecto a la información solicitada. Es posicionado en un icono de pregunta al lado derecho de la propiedad `label` luego de ser renderizado.

Este es un campo opcional y debe ser de tipo `string`.

### `options`

La propiedad `options` proporciona el listado de opciones a seleccionar en elementos como selección múltiple (multiple y checkbox), seleccion única (select y radio), y selección por rango (rate).

Esta propiedad es obligatoria para `select`, `multiple`, `radio`, `checkbox` y `rate`. Debe ser de tipo `array` compuesto por `objects`.

### `values`

La propiedad `values` proporciona el listado de valores por defecto que estarán seleccionadas en el elemento. Esta propiedad aplica a los mismos elementos que la propiedad `options`.

Esta propiedad es opcional y debe ser de tipo `array` compuesto solo por los valores en formato `string`.


### Extras

Para el caso de elementos tipo `select` y `multiple` la propiedad `placeholder` no se debe incluir en `attr` (atributos), si no que en la raíz de las propiedades. Ejemplo:

```js
{
  type: 'select' || 'multiple',
  id: 'country',
  placeholder: 'Seleccone un país', // Correcto
  attr: {
    placeholder: 'Seleccione un país', // Incorrecto
  },
  ...
}
```

Para el caso de `rate` debe ir obligatoriamente la propiedad `icon` en raíz, el cual proporciona el ícono a utilizar en el elemento de rango. Los iconos disponibles en la versión actual ![version](https://img.shields.io/github/package-json/v/videsk/DynForms) son:

- `star`
- `heart`

Un ejemplo:

```js
{
  type: 'rate',
  id: 'nps',
  icon: 'star' || 'heart',
  ...
}
```

## Validaciones

DynForms no incluye funciones de validaciones debido a la enorma cantidad de variantes posibles, por ello se diseño bajo una capa de abstracción que permitiese realizar validaciones bajo librerías de terceros o bien manualmente.

Actualmente se puede acceder a los datos mediante la varable asignada en la instanciación de la clase. Es decir, si declara:


```
const form = new DynForm({...});
```

Entonces la variable `form` permitirá el acceder mediante:

```js
form.data;

// Output
[{...}, {...}]
```

Mediante la actualización en vivo del formulario podrá validar que se cumplan los requisitos para cada uno de los campos con sus propias funciones.

> Desde la versión 1.2.0 se añadirá o añadió la capacidad de extender las funciones de eventos como por ejemplo onclick, onkeyup, onblur, onfocus, etc.

## Cargas dinámicas

Si desea realizar cargas dinámicas de opciones basadas en un valor de un campo anterior se recomienda instanciar dos formularios diferentes. Es decir:

En este ejemplo cargaremos un opciones basados en el primer elemento.

```js
let element1, element2;
element1 = new DynForm({...});
element1.render();

const { data } = element1;

fetch(`/options`, { method: 'POST', body: data.value })
  .then(response => {
    element2 = new Dynform({form: response, options });
    element2.render();
  });
```

Con el ejemplo anterior podemos cargar un elemento con opciones de selección dinámicos dependiendo de un valor anterior. Esto no tan solo permite cargar opciones o valores de forma dinámica, si no que también permite crear elementos dinámicos, como por ejemplo basado en un la respuesta 1, se renderiza un selector o un campo de texto.

## Configuración

La configuración requerida para instanciar un nuevo formulario consiste en proporcionar un `object` con las siguientes propiedades:

```js
const options = {
  container: '#myelement' || document.querySelector('#myelement'),
  debug: Boolean,
}
```

### `container`

La propiedad `container` proporciona el nodo DOM en el cual se añadirá el formulario. DynForms adjunta elementos por lo que no reemplazará lo que contenga el nodo proporcionado.

El valor de esta propiedad es obligatorio y puede ser la selección de un element como `string`, o bien como nodo DOM `object`.

### `debug`

La propiedad `debug` proporciona la orden de imprimir información de depuración en la consola de desarrollador o no.

El valor de esta propiedad es opcional y debe ser de tipo `boolean`.

## Derechos de uso

This library is totally open source with MIT license, but was designed for Videsk™ products.
