/* Basandote en el ejercicio anterior. Crea un botón para cada uno de los elementos de 
las listas que elimine ese mismo elemento del html. */

const countries = [
  { title: "Random title", imgUrl: "https://picsum.photos/300/200?random=1" },
  { title: "Random title", imgUrl: "https://picsum.photos/300/200?random=2" },
  { title: "Random title", imgUrl: "https://picsum.photos/300/200?random=3" },
  { title: "Random title", imgUrl: "https://picsum.photos/300/200?random=4" },
  { title: "Random title", imgUrl: "https://picsum.photos/300/200?random=5" },
];

const mainDiv = document.createElement("div");
mainDiv.className = "flexBox";

for (let country in countries) {
  const div = document.createElement("div");

  const titulo = document.createElement("h4");
  titulo.innerText = countries[country].title;

  const imagen = document.createElement("img");
  imagen.src = countries[country].imgUrl;

  const buttonToDeleteSelf = document.createElement("button");
  buttonToDeleteSelf.innerText = "Elimina este bloque";
  buttonToDeleteSelf.className = "buttonToDeleteSelf";

  buttonToDeleteSelf.addEventListener("click", function () {
    this.parentNode.remove();
  });

  div.append(imagen);
  div.append(titulo);
  div.append(buttonToDeleteSelf);

  mainDiv.append(div);
}

document.body.append(mainDiv);

const buttonToDelete = document.querySelector("#removeElement");

buttonToDelete.addEventListener("click", function () {
  const divs = document.querySelectorAll("div");
  const lastDiv = divs[divs.length - 1];

  if (divs.length === 1) {
    alert("No hay elementos a eliminar") 
    return;
   } else {

  lastDiv.remove();
  }
});
