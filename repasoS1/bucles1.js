/**
Crear la siguiente figura:
    *
   **
  ***
 ****
*****
 ****
  ***
   **
    *
*/
for (let i = 0 ; i <= 4 ; i++ ) {
    let fila = "";
    for (let j = 0 ; j <= i ; j++) {
    fila += "*"
    }
 console.log(" ".repeat(4 - i) + fila)
}
for (let i = 1; i <= 6; i++) {
    let fila = "";
    for (let j = 0; j <= 4 - i; j++) {
        fila += "*";
    }
    console.log(" ".repeat(i) + fila);
}