/* Basandote en el ejercicio anterior. Crea un botón que elimine el último elemento de la lista. */

const countries = [
  { title: "Random title", imgUrl: "https://picsum.photos/300/200?random=1" },
  { title: "Random title", imgUrl: "https://picsum.photos/300/200?random=2" },
  { title: "Random title", imgUrl: "https://picsum.photos/300/200?random=3" },
  { title: "Random title", imgUrl: "https://picsum.photos/300/200?random=4" },
  { title: "Random title", imgUrl: "https://picsum.photos/300/200?random=5" },
];

const mainDiv = document.createElement("div");
mainDiv.className = "flexBox";

for (let country of countries) {
  const div = document.createElement("div");

  const titulo = document.createElement("h4");
  titulo.innerText = country.title;

  const imagen = document.createElement("img");
  imagen.src = country.imgUrl;

  div.append(imagen);
  div.append(titulo);
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
