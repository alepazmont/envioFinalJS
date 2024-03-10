/* Convierte la siguiente función con un fetch utilizando async-await. Recuerda que para usar .fetch() tendrás que probar el ejercicio en el navegador;*/

getCharacters = async () => {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const result = await response.json();
    console.log(result.results);
  } catch (error) {
    console.log(error);
  }
};

getCharacters();
