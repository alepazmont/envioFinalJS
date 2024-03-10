/* Usa el siguiente código como base y crea 3 funciones llamadas father, confirmExample, promptExample. 
La función confirmExample recibirá una variable de tipo string (description) que mostrará como titulo de la ventana y retornará el valor del confirm. 
La función promptExample hará lo mismo pero con un prompt. La función father recibirá como parámetros description, con el valor del titulo de las ventanas 
y una función callback (confirmExample o promptExample).

La función father deberá ejecutar la función que reciba como callback y añadir el valor resultado que retorne la función al array userAnwsers.

Ejecuta varias veces la función father y haz finalmente un console.log de userAnwsers */

const userAnwsers = [];

function confirmExample(question) {
  return confirm(question);
}

function promptExample(question) {
  return prompt(question);
}

function father(question, fn) {
  const result = fn(question);
  userAnwsers.push(result);
}

father("¿Qué edad tienes?", promptExample);
father("¿Aceptas las condiciones de esta página?", confirmExample);
father("¿Cedes tu alma a este sitio web?", confirmExample);

console.log(userAnwsers);

// guia de confirm y prompt
// const confirmValue = confirm('Soy un texto');
// const propmt = prompt('Soy un texto');
