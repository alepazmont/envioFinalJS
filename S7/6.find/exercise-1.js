/* Dado el siguiente array, usa .find() para econtrar el número 100. */

const numbers = [32, 21, 63, 95, 100, 67, 43];

const numSearch = 100

if (numbers.find(number => number === numSearch)) {
    console.log(`El número ${numSearch} está en la lista`);
} else {
    console.log(`No se ha encontrado el número ${numSearch} en la lista`);
}
