/* En base al ejercicio anterior. Crea dinamicamente un elemento <p> por cada petición a la api que diga...'El nombre X tiene un Y porciento de ser de Z' etc etc.

EJ: El nombre Abel tiene un 22 porciento de ser de ET y un 6 porciento de ser de MZ. */

const baseUrl = "https://api.nationalize.io?name=";

const inputFetch = document.querySelector("input");
const buttonFetch = document.querySelector("button");

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

      newP.textContent = `El nombre ${data.name} tiene un ${data.country[0].probability} porciento de ser de ${data.country[0].country_id} y un ${data.country[1].probability} porciento de ser de ${data.country[1].country_id}`;

      document.body.appendChild(newP);
    })
    .catch((error) => {
      console.error("Se produjo un error:", error);
    });
});
