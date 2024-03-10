/* Dado el siguiente array, usa .find() para econtrar la pelicula del año 2010. */

const movies = [
  { title: "Madagascar", stars: 4.5, date: 2015 },
  { title: "Origen", stars: 5, date: 2010 },
  { title: "Your Name", stars: 5, date: 2016 },
];

const movieYear = 2010;

const movie = movies.find((movie) => movie.date === movieYear);

console.group(`Búsqueda de películas del ${movieYear}`);
if (movie) {
  console.log(`La película ${movie.title} es del ${movieYear}`);
} else {
  console.log(`No hay ninguna película del año ${movieYear}`);
}
console.groupEnd();
