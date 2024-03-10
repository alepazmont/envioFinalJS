/* Dado el siguiente html usa querySelector para mostrar por consola 
todos los elementos con el atributo data-function="testMe". */

let spans = document.querySelectorAll('span[data-function="testMe"]');

for (let span of spans) {
    console.log(span)
}