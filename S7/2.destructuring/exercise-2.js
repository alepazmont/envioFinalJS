/* En base al siguiente javascript, usa destructuring para crear 3 variables llamadas fruit1, fruit2 y fruit3, 
con los valores del array. Posteriormente imprimelo por consola. */

const fruits = ['Banana', 'Strawberry', 'Orange'];

const [ fruit1, fruit2, fruit3 ] = fruits

console.group("Array fruits desestructurado:")
console.log("Fruit1:", fruit1);
console.log("Fruit2:", fruit2);
console.log("Fruit3:", fruit3);
console.groupEnd()