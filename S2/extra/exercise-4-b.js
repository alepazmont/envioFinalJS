/* Usando la función anterior beneficiate de poder conocer el indice del array para crear una función llamada 
`removeItem` que pasandole un array y un texto como parametros (los mismos parametros que en el anterior ejercicio) 
llame a la función anteriormente creada ``findArrayIndex`` y obten el indice para posteriormente usar la función de 
javascript ``.splice()`` para eliminar el elemento del array. Finalmente retorna el array.

De nuevo haz varios ejemplos para practicar y comprueba que funcionan correctamente.
 */
function findArrayIndex(array, text) {
  let iterations = 0;

  for (let position of array) {
    iterations++;
    if (position === text) {
      console.log(
        `El texto ${text} aparece en la lista en el puesto ${iterations}`
      );
      break;
    }
  }
}
function deleteEntry(array, text) {
  let iterations = 0;

  for (let position of array) {
    iterations++;
    if (position === text) {
      array.splice(iterations - 1, 1);
    }
  }
}

const avengers = [
  "Iron Man",
  "Capitán América",
  "Thor",
  "Hulk",
  "Viuda Negra",
  "Ojo de Halcón",
  "Máquina de Guerra",
  "Visión",
  "Bruja Escarlata",
  "Falcon",
  "Ant-Man",
];

console.log(`Antes de Infinity War, los Vengadores eran:`);
for (let i = 0; i < avengers.length - 1; i++) {
  console.log(i + 1, avengers[i]);
}

console.log(
  "y por último,",
  avengers.length,
  avengers[avengers.length - 1],
  "\ny en total eran",
  avengers.length,
  "integrantes."
);

deleteEntry(avengers, "Iron Man");
deleteEntry(avengers, "Capitán América");
deleteEntry(avengers, "Viuda Negra");
deleteEntry(avengers, "Visión");

console.log("\nPero murieron 3 y uno se jubiló.\n");

console.log("Después de End Game, los Vengadores son");
for (let i = 0; i < avengers.length - 1; i++) {
  console.log(i + 1, avengers[i]);
}

console.log(
  "y",
  avengers.length,
  avengers[avengers.length - 1],
  "\ny ahora son",
  avengers.length,
  "integrantes."
);
