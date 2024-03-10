/**
Crear la siguiente figura:
***********
 *********
  *******
   *****
    ***
     *
*/
for (let i = 0; i < 6; i++) {
    let fila = "";
    for (let j = 0; j < 11 - 2 * i; j++) {
        fila += "*";
    }
    console.log(" ".repeat(i) + fila);
}