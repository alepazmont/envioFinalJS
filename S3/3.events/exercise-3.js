/* Basandote en el siguiente html, añade un evento 'focus' que ejecute un console.log con el valor del input. */

const inputText = document.querySelector('[type="text"]');

inputText.addEventListener("input", function () {
  console.log(inputText.value);
});
