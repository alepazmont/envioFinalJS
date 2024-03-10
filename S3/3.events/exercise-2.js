/* Basandote en el siguiente html, añade un evento 'focus' que ejecute un console.log con el valor del input. */

const inputText = document.querySelector('input[type="text"]');

/* aunque el ejercicio pide un evento focus, tiene mucho más sentido si se hace con blur, 
que viene a ser lo mismo que focus pero actúa al deseleccionar, que es lo que suele hacer el 
usuario después de escribir el valor en el input que queremos que el listener nos pase

así también evitamos que nos pase resultados vacíos al seleccionar el input
 */

inputText.addEventListener("blur", function () {
  console.log(inputText.value);
});

/* aún así, dejo hecho también el listener con el focus

inputText.addEventListener("focus", function (event) {
    console.log(inputText.value);
  });
    
  */
