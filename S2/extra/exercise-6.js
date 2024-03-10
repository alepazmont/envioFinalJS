/* Crea una función llamada ``swap`` que reciba un array y dos parametros que sean indices del array. La función deberá 
intercambiar la posición de los valores de los indices que hayamos enviado como parametro. Retorna el array 
resultante.
 */

function swap(array, entraAlCampo, dejaElCampo, minuto) {
    if (entraAlCampo < 0 || entraAlCampo >= array.length || dejaElCampo < 0 || dejaElCampo >= array.length) {
        console.log("Índices inválidos. No se realizará el cambio.");
        return array;
    } else if (array[dejaElCampo].nombre === array[entraAlCampo].nombre) {
        console.log("No puedes cambiar a", array[dejaElCampo].nombre, "por sí mismo... eso produciría graves consecuencias en el tejido espacio-temporal.")
        return array;
    } else if (array[entraAlCampo].jugando === true) {
        console.log(array[entraAlCampo].nombre, "no puede entrar en el campo porque ya está en él. Símplemente no lo cambies")
    } else if (array[dejaElCampo].jugando === false) {
        console.log(array[dejaElCampo].nombre, "no puede abandonar el campo porque ya está en el banquillo. Sería raro que se levantase para volver a sentarse.")
    } else if (array[entraAlCampo].jugando === false && array[dejaElCampo].jugando === true) {
        const cambio = array[entraAlCampo];
        array[entraAlCampo] = array[dejaElCampo];
        array[dejaElCampo] = cambio;

        array[dejaElCampo].cambiado = true;
        array[entraAlCampo].cambiado = true;

        array[entraAlCampo].jugando = true;
        array[dejaElCampo].jugando = false;

        console.log("En el minuto", minuto, "deja el campo", array[entraAlCampo].nombre, "y entra en su lugar", array[dejaElCampo].nombre)
        return array;
    } else {
        console.log("Solo soy un programa informático. No sé por qué, pero por alguna razón, lo que me pides no es posible.")
        return array;
    }
}

const campeonesEspaña2010 = [
/* 0 */ { nombre: 'Iker Casillas', posicion: 'Portero', jugando: true, titular: true},
/* 1 */ { nombre: 'Sergio Ramos', posicion: 'Defensa', jugando: true, titular: true},
/* 2 */ { nombre: 'Carles Puyol', posicion: 'Defensa', jugando: true, titular: true},
/* 3 */ { nombre: 'Gerard Piqué', posicion: 'Defensa', jugando: true, titular: true},
/* 4 */ { nombre: 'Joan Capdevila', posicion: 'Defensa', jugando: true, titular: true},
/* 5 */ { nombre: 'Andrés Iniesta', posicion: 'Centrocampista', jugando: true, titular: true},
/* 6 */ { nombre: 'Xavi Alonso', posicion: 'Centrocampista', jugando: true, titular: true}, // Sale por Fábregas
/* 7 */ { nombre: 'Xavi Hernández', posicion: 'Centrocampista', jugando: true, titular: true},
/* 8 */ { nombre: 'Sergio Busquets', posicion: 'Centrocampista', jugando: true, titular: true},
/* 9 */ { nombre: 'David Villa', posicion: 'Delantero', jugando: true, titular: true}, // Sale por Torres
/* 10 */ { nombre: 'Pedro Rodríguez', posicion: 'Delantero', jugando: true, titular: true}, // Sale por Navas
/* 11 */ { nombre: 'Fernando Torres', posicion: 'Delantero', jugando: false, titular: false }, // Entra por Villa
/* 12 */ { nombre: 'Víctor Valdés', posicion: 'Portero', jugando: false, titular: false },
/* 13 */ { nombre: 'Raúl Albiol', posicion: 'Defensa', jugando: false, titular: false },
/* 14 */ { nombre: 'Jordi Alba', posicion: 'Defensa', jugando: false, titular: false },
/* 15 */ { nombre: 'Cesc Fàbregas', posicion: 'Centrocampista', jugando: false, titular: false }, // Entra por Alonso
/* 16 */ { nombre: 'Jesús Navas', posicion: 'Delantero', jugando: false, titular: false }, // Entra por Rodríguez
/* 17 */ { nombre: 'Fernando Llorente', posicion: 'Delantero', jugando: false, titular: false }
];

 console.group("Once inicial:")
for (let i = 0; i < campeonesEspaña2010.length; i++) {
    const jugador = campeonesEspaña2010[i];
    if (jugador.titular) {
        console.log(`${i + 1}: ${jugador.nombre} - ${jugador.posicion}`);
    }
}
console.groupEnd()

console.group("Cambios:") 
swap(campeonesEspaña2010, 16, 10, 60);
swap(campeonesEspaña2010, 15, 6, 87);
swap(campeonesEspaña2010, 11, 9, 106);
console.groupEnd()

console.log("¡Andres Iniesta marca en el minuto 115!")

console.log("PI, PI, PIIIIIIIII\n¡Final del partido!\n¡ESPAÑA CAMPEONA DEL MUNDO!")


console.group("Once final:")
for (let i = 0; i < campeonesEspaña2010.length; i++) {
    const jugador = campeonesEspaña2010[i];
    if (jugador.titular) {
        console.log(`${i + 1}: ${jugador.nombre} - ${jugador.posicion}`);
    }
}
console.groupEnd()

console.group("Jugadores cambiados:")
for (const jugador of campeonesEspaña2010) {
    if (jugador.jugando === false && jugador.cambiado === true) {
        console.log(`${jugador.nombre} - ${jugador.posicion}`);
    }
}
console.groupEnd()

/* console.group("COMPROBACIONES:");

console.log(campeonesEspaña2010)

// Fuera de rango
console.log("Fuera de rango:");
swap(campeonesEspaña2010, -1, 2, 60);

// Cambiar por sí mismo
console.log("Cambiar por sí mismo:");
swap(campeonesEspaña2010, 17, 17, 60);

// Entra titular
console.log("Entra titular:");
swap(campeonesEspaña2010, 2, 15, 60);

// Sale banquillo
console.log("Sale banquillo:");
swap(campeonesEspaña2010, 13, 15, 60);

// Cambio exitoso
console.log("Cambio exitoso:");
swap(campeonesEspaña2010, 17, 2, 60);

console.groupEnd(); */