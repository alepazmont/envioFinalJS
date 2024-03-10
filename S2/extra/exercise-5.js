/* Crea una función llamada ``rollDice()`` que reciba como parametro el numero de caras que queramos que tenga el dado 
que deberá silumar el codigo dentro de la función. Como hemos dicho, que la función use el parametro para simular 
una tirada de dado y retornar el resultado. Si no se te ocurre como hacer un numero aleatorio no te preocupes! busca 
información sobre la función de javascript ``Math.random()``
 */

function rollDice(sides) {
  const randomNumber = parseInt(Math.random() * sides + 1);
  return randomNumber;
}
console.group("Realizamos 5 lanzamientos:");
for (let i = 0; i < 5; i++) {
  const resultado = rollDice(6);
  console.log(`Lanzamiento ${i + 1}: ${resultado}`);
}
console.groupEnd();