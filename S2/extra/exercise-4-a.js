/* Crea una función llamada `findArrayIndex` que reciba como parametros un array de textos y un texto y devuelve la 
posición del array cuando el valor del array sea igual al valor del texto que enviaste como parametro.

Haz varios ejemplos y compruebalos.*/

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

const dragonBallCharacters = [
  // Dragon Ball
  "Goku",
  "Bulma",
  "Yamcha",
  "Oolong",
  "Puar",
  "Maestro Roshi",
  "Krillin",
  "Tenshinhan",
  "Piccolo",

  // Dragon Ball Z
  "Raditz",
  "Nappa",
  "Vegeta",
  "Gohan",
  "Trunks",
  "Goten",
  "C17",
  "C18",
  "Cell",
  "Majin Buu",
];

findArrayIndex(dragonBallCharacters, "Puar");
findArrayIndex(dragonBallCharacters, "Cell");
findArrayIndex(dragonBallCharacters, "Goku");
findArrayIndex(dragonBallCharacters, "Gohan");
