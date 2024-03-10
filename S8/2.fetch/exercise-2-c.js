/* En base al ejercicio anterior, crea un botón con el texto 'X' para cada uno de los p que hayas insertado y que si el usuario hace click 
en este botón eliminemos el parrafo asociado. */

const baseUrl = "https://api.nationalize.io?name=";

const inputFetch = document.querySelector("input");
const buttonFetch = document.querySelector("button");

/* Al hacer pruebas, pude ver que al escribir en el input y presionar Intro, no buscaba resultados, como suele verse en aplicaciones de este tipo.
    Busqué una manera de hacerlo y lo he dejado implementado, simplemente por saber cómo funciona */

inputFetch.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    buttonFetch.click();
  }
});

buttonFetch.addEventListener("click", function () {
  const name = inputFetch.value;
  const url = baseUrl + name;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const mapData = (data) => {
        return data.map((data) => ({}));
      };

      const newP = document.createElement("p");
      const xButton = document.createElement("button");
      xButton.innerText = "X";
      newP.textContent = `El nombre ${data.name} tiene un ${data.country[0].probability} porciento de ser de ${data.country[0].country_id} y un ${data.country[1].probability} porciento de ser de ${data.country[1].country_id}`;
      newP.appendChild(xButton);
      document.body.appendChild(newP);

      xButton.addEventListener("click", function () {
        this.parentNode.remove();
      });
    })

    .catch((error) => {
      console.error("Se produjo un error:", error);
    });
});
