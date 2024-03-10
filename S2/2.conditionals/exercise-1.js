/* Comprueba en cada uno de los usuarios que tenga almenos dos trimestres aprobados y añade la propiedad isApproved a true o false en consecuencia. 
Una vez lo tengas compruebalo con un console.log. */

const alumns = [
  { name: "Pepe Viruela", T1: false, T2: false, T3: true },
  { name: "Lucia Aranda", T1: true, T2: false, T3: true },
  { name: "Abel Cabeza", T1: false, T2: true, T3: true },
  { name: "Alfredo Blanco", T1: false, T2: false, T3: false },
  { name: "Raquel Benito", T1: true, T2: true, T3: true },
];

for (let i in alumns) {
  let trimestresAprobados = 0;
  if (alumns[i].T1 === true) {
    trimestresAprobados++;
  }
  if (alumns[i].T2 === true) {
    trimestresAprobados++;
  }
  if (alumns[i].T3 === true) {
    trimestresAprobados++;
  }
  alumns[i].numeroTrimestresAprobados = trimestresAprobados;

  if (trimestresAprobados >= 2) {
    alumns[i].isApproved = true;
    console.log(
      `El/La alumno/a ${alumns[i].name} tiene ${trimestresAprobados} trimestres aprobados. Pasa de curso. `
    );
  } else {
    alumns[i].isApproved = false;
    console.log(
      `El/La alumno/a ${alumns[i].name} tiene ${trimestresAprobados} trimestres aprobados. Tiene que repetir. `
    );
  }
}
