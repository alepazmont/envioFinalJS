/* Inserta dinamicamente en un html un div que contenga una p con javascript. */

const div = document.createElement("div");
const p = document.createElement("p");
p.textContent = "Este texto está en un párrafo que a su vez está en un div.";

div.appendChild(p);
document.body.appendChild(div);
