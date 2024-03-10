/* Dado el siguiente javascript usa forof para recorrer el array de películas, genera un nuevo array con las categorías
de las películas e imprime por consola el array de categorías. Ten en cuenta que las categorías no deberían repetirse.
Para filtrar las categorías puedes ayudarte de la función `.includes()`. */

const movies = [
    {title: 'Madaraspar', duration: 192, categories: ['comedia', 'aventura']},
    {title: 'Spiderpan', duration: 122, categories: ['aventura', 'acción']},
    {title: 'Solo en Whatsapp', duration: 223, categories: ['comedia', 'thriller']},
    {title: 'El gato con guantes', duration: 111, categories: ['comedia', 'aventura', 'animación']},
]

let movieCategories = [];
let categoriesList = [];

for (let movie of movies) {
  for (let category of movie.categories)
    if (!movieCategories.includes(category)) {
      movieCategories.push(category);
    }
}
console.group("Lista de categorías de películas:");
for (let i of movieCategories) {
  console.log(i.charAt(0).toUpperCase() + i.slice(1)); 
  //Sé que esto es posterior... pero tuve que buscar. La primera en minúscula me estaba haciendo saltar el TOC...
}
console.groupEnd();
