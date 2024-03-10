/* Dado el siguiente javascript filtra los videojuegos por gender = 'RPG' usando .filter() y usa .reduce() para conseguir la media de sus .score. 
La función .find() también podría ayudarte para el contrar el genero 'RPG' en el array .gender. */

const videogames = [
    {name: 'Final Fantasy VII', genders: ['RPG'], score: 9.5},
    {name: 'Assasins Creed Valhala', genders: ['Aventura', 'RPG'], score: 4.5},
    {name: 'The last of Us 2', genders: ['Acción', 'Aventura'], score: 9.8},
    {name: 'Super Mario Bros', genders: ['Plataforma'], score: 8.5},
    {name: 'Genshin Impact', genders: ['RPG', 'Aventura'], score: 7.5},
    {name: 'Legend of Zelda: Breath of the wild', genders: ['RPG', 'La cosa más puto bonita que he visto nunca'], score: 10},
]

const rpgGames = videogames.filter((game) => game.genders.includes("RPG"));
const rpgGamesTotalScore = rpgGames.reduce(
  (accumulator, currentValue) => accumulator + currentValue.score,
  0
);
const meanRpgScore = rpgGamesTotalScore / rpgGames.length;
console.log(
  `De los ${rpgGames.length} juegos pertenecientes al género RPG, la suma total de sus puntuaciones es ${rpgGamesTotalScore} y la media de las mismas es ${meanRpgScore}`
);
