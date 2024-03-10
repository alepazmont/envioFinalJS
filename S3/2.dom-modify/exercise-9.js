/* Basandote en el siguiente html y javascript,inserta p con el texto 'Voy dentro!', 
dentro de todos los div con la clase .fn-insert-here */

const divs = document.querySelectorAll("div.fn-insert-here");

for (let div of divs) {
  const fill = document.createElement("p");
  fill.innerText = "Voy dentro!";
  div.append(fill);
}
