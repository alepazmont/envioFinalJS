/* Dado el siguiente html y javascript, utiliza .filter() para mostrar por consola los streamers que incluyan la palabra introducida en el input. 
De esta forma, si introduzco 'Ru' me deberia de mostrar solo el streamer 'Rubius'. Si introduzco 'i', me deberia de mostrar el streamer 'Rubius' e 'Ibai'.

En este caso, muestra solo los streamers filtrados cuando hagamos click en el button. */

const streamers = [
  { name: "Rubius", age: 32, gameMorePlayed: "Minecraft" },
  { name: "Ibai", age: 25, gameMorePlayed: "League of Legends" },
  { name: "Reven", age: 43, gameMorePlayed: "League of Legends" },
  { name: "AuronPlay", age: 33, gameMorePlayed: "Among Us" },
];

const formFilter = document.querySelector(
  'input[data-function="toFilterStreamers"]'
);
const buttonFilter = document.querySelector(
  'button[data-function="toShowFilterStreamers"]'
);

buttonFilter.addEventListener("click", function () {
  const filteredStreamers = streamers.filter((guy) =>
    guy.name.toLowerCase().includes(formFilter.value.toLowerCase())
  );
  console.group("Lista de Streamers Filtrados");
  filteredStreamers.forEach((gamer) => {
    console.log(gamer.name);
  });
  console.groupEnd();
});
