/* Basandote en el html siguiente, elimina el elemento que tenga la clase .fn-remove-me. */

const toDelete = document.getElementsByClassName("fn-remove-me");

for (let element of toDelete) {
  element.remove();
}
