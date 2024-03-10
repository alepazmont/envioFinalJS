/* Usa un bucle for of para recorrer todos los juguetes y elimina los que incluyan la palabra `gato`. 
Recuerda que puedes usar la función `.includes()` para comprobarlo. */

const toys = [
  { id: 5, name: "Buzz MyYear" },
  { id: 11, name: "Action Woman" },
  { id: 23, name: "Barbie Man" },
  { id: 40, name: "El gato con Guantes" },
  { id: 40, name: "El gato felix" },
];

/* ESTA ES LA SOLUCIÓN QUE ESCOJO TENIENDO EN CUENTA EL ENUNCIADO DEL EJERCICIO.
 PARA CUMPLIR CON EL USO DE FOR OF, HAGO PRIMERO EL RECORRIDO PARA ELEGIR LAS POSICIONES A ELIMINAR
 PERO DESPUÉS NO CONSIGO HACER SLICE SIN RECORRER EL BUCLE, Y SI TIENE QUE RECORRERLO, 
 SIGO TENIENDO EL MISMO PROBLEMA SI LO RECORRE DE ADELANTE HACIA ATRÁS.
 
 DE AHÍ QUE RECORRA DOS VECES, LA PRIMERA VEZ RECORRE toys EN FOR OF, Y LA OTRA, 
 RECORRE elementsToDelete CON LA FORMA CLÁSICA PARA PODER HACERLO A LA INVERSA */

console.log("Array inicial:", toys);

let position = 0;
let elementsToDelete = [];

for (let toy of toys) {
  position++;
  if (toy.name.includes("gato")) {
    elementsToDelete.push(position);
  }
}
console.log("Posiciones del array a eliminar:", elementsToDelete);

for (let i = elementsToDelete.length - 1; i >= 0; i--) {
  toys.splice(elementsToDelete[i] - 1, 1);
}

console.log("Array actualizado:\n", toys);

/* ESTA ES LA SOLUCIÓN QUE YO COGERÍA, YA QUE HACE LO QUE SE PIDE CON LA MENOR CANTIDAD DE CÓDIGO
LO QUE PASA ES QUE NO USA UN FOR OF, YA QUE EL RECORRIDO DEL BUCLE SE HACE DE FORMA INVERSA


for (let i = toys.length - 1; i >= 0; i--) {
  if (toys[i].name.includes("gato")) {
    toys.splice(i, 1);
  }
}

console.log(toys); */

/*  ESTAS SON OTRAS OPCIONES QUE FUI PROBANDO


for (let toy of toys) {
  if (toy.name.includes("gato")) {
    const index = toys.indexOf(toy);
    toys.splice(index, 1);
  }
} */

/* for (let i of toys) {
  if (toys[i].name.includes("gato")) {
    toys.splice(i, 1);
  }
} */

/* for (let i = toys.length - 1; i >= 0; i--) {
  if (toys[i].name.includes("gato")) {
    toys.splice(i, 1);
  }
}

console.log(toys); */

/* ESTAS ÚLTIMAS NO TRATAN DE ELIMINAR DEL ARRAY ORIGINAL, SINO QUE CREAN UNO NUEVO
E IMPRIMEN EL RESULTADO EXCLUYENDO LAS ENTRADAS QUE CONTIENEN GATO EN EL STRING

const updatedToys = [];

for (let toy of toys) {
  if (!toy.name.includes("gato")) {
    // Si el nombre del juguete no incluye "gato", lo agregamos al nuevo array
    updatedToys.push(toy);
  }
}

// Sobrescribe el array original con los juguetes actualizados
toys.length = 0;
toys.push(...updatedToys);

console.log(toys); */

/* const updatedToys = [];

for (let toy of toys) {
  if (!toy.name.includes("gato")) {
    // Si el nombre del juguete no incluye "gato", lo agregamos al nuevo array
    updatedToys.push(toy);
  }
}

console.log(updatedToys); */
