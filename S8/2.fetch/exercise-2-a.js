/* Dado el siguiente javascript y html. Añade la funcionalidad necesaria usando fetch() para hacer una consulta 
a la api cuando se haga click en el botón, pasando como parametro de la api, el valor del input. */

const baseUrl = "https://api.nationalize.io?name=";

const inputFetch = document.querySelector("input");
const buttonFetch = document.querySelector("button");

buttonFetch.addEventListener("click", function () {
  const name = inputFetch.value;
  const url = baseUrl + name;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Se produjo un error:", error);
    });
});
