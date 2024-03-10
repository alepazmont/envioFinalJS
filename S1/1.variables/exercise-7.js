/* Dado el siguiente javascript, actualiza el valor de la variable ``globalBasePrice`` a 25000 y actualiza la propiedad ``finalPrice`` 
de todos los coches con el valor de su propiedad ``basePrice`` más el valor de la variable ``globalBasePrice``. */

let globalBasePrice = 25000;
const car1 = {name: 'BMW m&m', basePrice: 50000, finalPrice: 60000};
const car2 = {name: 'Chevrolet Corbina', basePrice: 70000, finalPrice: 80000};

car1.finalPrice = globalBasePrice + car1.basePrice;
car2.finalPrice = globalBasePrice + car2.basePrice;

console.log(`El precio final actualizado de car1 es ${car1.finalPrice}`)
console.log(`El precio final actualizado de car2 es ${car2.finalPrice}`)


