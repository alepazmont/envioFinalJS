/* Ejecuta `json-server --watch exercise-10.json` para obtener un endpoint de personajes `http://localhost:3000/characters`.

Pinta una galeria con los campos .name .image de los cinco primeros personajes. Para ello utilizaremos el endpoint con un filtro de página 
y limite de personajes de 5 por página `http://localhost:3000/characters?_page=1&_limit=5`.

Una vez pintados, crea un botón que esté situado abajo con el texto `Cargar más`. Si hacemos click en este botón hará un nuevo fetch 
a la siguiente página de personajes por lo tanto la url debería de ser la página actual + 1 `http://localhost:3000/characters?_page=2&_limit=5`. 
De esta forma obtendremos 5 personajes más que tendremos que pintar debajo de los anteriores.

La base de datos solo tiene 20 personajes así que lo ideal sería ocular el botón cuando estemos en la página 4. */

/* Le he dedicado bastante tiempo a este ejercicio y creo que lo tengo todo bien, pero por más que lo intento, no consigo que a través del cambio
del valor de page, se muestren más que los 5 primeros personajes.
Si imprimo la info de la API, aparecen los 20, pero no consigo hacerlo con el método que se propone.

Creo que puede deberse al propio sistema de json-server, que trata de replicar el funcionamiento de APIRest pero falla*/

// Elementos del DOM y variables iniciales
const charactersDiv$$ = document.querySelector('[data-fn="characters"]'); //Bloque para mostrar selección personajes
let page = 1;
let charactersCounter = 1; // Contador global de personajes

const loadMore = document.createElement("button");
loadMore.className = "loadMore";
loadMore.innerText = "Cargar más";
charactersDiv$$.after(loadMore);

// Obtención de datos
const getData = async (page) => {
    try {
        const response = await fetch(`http://localhost:3000/characters?_page=${page}&_limit=5`);
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error:", error);
    }
};

// Dibujar personajes y sus eventos
const drawCharacters = (characters) => {
    characters.forEach((character) => {
        const characterDiv = document.createElement("div");
        characterDiv.className = "characterDiv";
        characterDiv.innerHTML = `
            <h2 class="characterClass">${charactersCounter} - ${character.name}</h2>
            <img class="characterImg" src="${character.image}" alt="${character.name}">
        `;
        charactersDiv$$.appendChild(characterDiv);
        charactersCounter++; // Incrementar el contador global de personajes
    });
};

loadMore.addEventListener("click", async () => {
    page++; // Incrementamos la página antes de la solicitud
    console.log(page);
    const result = await getData(page);
    drawCharacters(result);

    if (page === 4) {
        loadMore.style.display = "none";
    }
});

// Función de inicialización
const init = async () => {
    const initialCharacters = await getData(page);
    drawCharacters(initialCharacters);
};

init();
