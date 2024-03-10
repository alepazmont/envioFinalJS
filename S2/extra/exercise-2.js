/* Dado el siguiente javascript usa forof y forin para hacer la media del volumen de todos los sonidos favoritos que tienen
 los usuarios. */

const users = [
  {
    name: "Manolo el del bombo",
    favoritesSounds: {
      waves: { format: "mp3", volume: 50 },
      rain: { format: "ogg", volume: 60 },
      firecamp: { format: "mp3", volume: 80 },
    },
  },
  {
    name: "Mortadelo",
    favoritesSounds: {
      waves: { format: "mp3", volume: 30 },
      shower: { format: "ogg", volume: 55 },
      train: { format: "mp3", volume: 60 },
    },
  },
  {
    name: "Super Lopez",
    favoritesSounds: {
      shower: { format: "mp3", volume: 50 },
      train: { format: "ogg", volume: 60 },
      firecamp: { format: "mp3", volume: 80 },
    },
  },
  {
    name: "El culebra",
    favoritesSounds: {
      waves: { format: "mp3", volume: 67 },
      wind: { format: "ogg", volume: 35 },
      firecamp: { format: "mp3", volume: 60 },
    },
  },
];

let soundsVolumesList = [];
let totalVolumes = 0;
let formatList = [];
let mp3Count = 0;
let oggCount = 0;

for (let user of users) {
  for (let sound in user.favoritesSounds) {
    soundsVolumesList.push(user.favoritesSounds[sound].volume);
  }

  for (let formats in user.favoritesSounds) {
    if (user.favoritesSounds[formats].format === "ogg") {
      oggCount++;
    } else {
      mp3Count++;
    }
  }
}

for (let soundsVolumes of soundsVolumesList) {
  totalVolumes += soundsVolumes;
}

console.log(`La suma total de volúmenes es ${parseFloat(totalVolumes)}`);
console.log(
  `El número de sonidos contabilizados es ${parseFloat(
    soundsVolumesList.length
  )}`
);
console.log(
  `La media de volúmenes, por tanto, es ${
    parseFloat(totalVolumes) / soundsVolumesList.length
  }`
);
console.log(
  `Entre todos los usuarios, hay ${oggCount} archivos en ogg y ${mp3Count} en mp3`
);
