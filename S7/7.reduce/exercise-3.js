/* Dado el siguiente array, haz la media de las notas de todos los examenes .reduce(). */

const exams = [
  { name: "Abel Cabeza Román", score: 5 },
  { name: "Maria Aranda Jimenez", score: 1 },
  { name: "Cristóbal Martínez Lorenzo", score: 6 },
  { name: "Mercedez Regrera Brito", score: 7 },
  { name: "Pamela Anderson", score: 3 },
  { name: "Enrique Perez Lijó", score: 6 },
  { name: "Pedro Benitez Pacheco", score: 8 },
  { name: "Ayumi Hamasaki", score: 4 },
  { name: "Robert Kiyosaki", score: 2 },
  { name: "Keanu Reeves", score: 10 },
];


const sumWithInitial = exams.reduce( (accumulator, currentValue) => accumulator + currentValue.score, 0);

  const media = sumWithInitial / exams.length

  console.log(media); 

/*  ESTO ES POR RECORDAR Y PARA COMPROBAR EL RESULTADO DE OTRA FORMA

    let suma = 0

  for (let exam of exams) {
    suma += exam.score;
  }
  let mediafor = suma / exams.length
  console.log(suma)
  console.log(mediafor) */
