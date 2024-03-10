/* En base al siguiente javascript, usa destructuring para crear 2 variables igualandolo a la función e imprimiendolo por consola.
 */


const animalFunction = () => {
    return {name: 'Bengal Tiger', race: 'Tiger'}
};
const { name: nombreAnimal, race: razaAnimal } = animalFunction();

console.log(nombreAnimal); 
console.log(razaAnimal);
