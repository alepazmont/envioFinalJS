/* Dado los siguientes arrays, crea un nuevo array juntandolos usando spread operatos
 */

const pointsList = [32, 54, 21, 64, 75, 43];
const pointsList2 = [54,87,99,65,32];

const stringsTogether = [...pointsList,...pointsList2]

console.log(stringsTogether)