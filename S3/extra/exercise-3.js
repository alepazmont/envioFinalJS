/* Dado el siguiente html y javascript. Utiliza el array para crear dinamicamente una lista 
ul > li de elementos en el div de html con el atributo data-function="printHere". */

const cars = ["Mazda 6", "Ford fiesta", "Audi A4", "Toyota corola"];

const carsList = document.querySelector('[data-function="printHere"]');
const list = document.createElement("ul");

for (let car of cars) {
  const li = document.createElement("li");
  li.innerText = car;

  list.append(li);
}

carsList.append(list);
