/* Basandote en el siguiente html, elimina todos los nodos que tengan la clase .fn-remove-me */

const classfn = document.querySelectorAll("p.fn-remove-me");

for (let element of classfn) {
  element.remove();
}
