/* Vamos a usar de nuevo JSON SERVER para crear un listado de personajes de la serie Dragon Ball.

Para ello, ejecutemos `json-server --watch exercise-4.json`. En este caso el endpoint con los personajes es `http://localhost:3000/characters`.

La idea es crear una galería con los planetas, que podemos obtener del endpoint `http://localhost:3000/planets` y, 
que si el usuario hace click en alguno de los planetas, salga debajo los personajes que están asociados por el .idPlanet a ese planeta en cuestión, 
mostrando tanto sus imágenes .avatar como sus nombres .name. Para poder obtener la información de los personajes podemos hacer un filtro de los personajes 
llamando a la url, por ejemplo `http://localhost:3000/characters?idPlanet=1` y, teniendo en cuenta que el idPlanet variará dependiendo del planeta seleccionado.
 
Además de esto, agrega un buscador para poder filtrar los personajes por nombre una vez que has seleccionado el planeta. Por lo tanto, deberemos incluir el 
input debajo del planeta y encima de los personajes listados.

Como extra podríamos hacer que si haces click a un personaje salga la descripción debajo. Como extra del extra haz que la descripción se oculte si vuelves a hacer 
click en el mismo personaje. */

const planetsDiv$$ = document.querySelector(`[data-function="planets"]`);
const charactersDiv$$ = document.querySelector(`[data-function="characters"]`);
const searchDiv$$ = document.querySelector(`[data-function="search"]`);
let searchInput; 

let currentPlanet = null;
let allCharacters = []; 
let charactersOnPlanet = [];

const getData = async () => {
  try {
    const responsePlanets = await fetch("http://localhost:3000/planets");
    const resultPlanets = await responsePlanets.json();

    const responseCharacters = await fetch("http://localhost:3000/characters");
    allCharacters = await responseCharacters.json(); 

    init(resultPlanets, allCharacters);
  } catch (error) {
    console.error("Error:", error);
  }
};

const drawPlanets = (planets) => {
  planetsDiv$$.innerHTML = "";
  for (let planet of planets) {
    const planetDiv = document.createElement("div");
    planetDiv.className = "planetDiv";
    const planetImg = document.createElement("img");
    planetImg.src = planet.image;
    const planetName = document.createElement("h2");
    planetName.innerText = planet.name;

    planetsDiv$$.appendChild(planetDiv);
    planetDiv.appendChild(planetImg);
    planetDiv.appendChild(planetName);

    planetDiv.addEventListener("click", () => {
      console.log("Planeta seleccionado ID:", planet.id);
      currentPlanet = planet;
      charactersOnPlanet = allCharacters.filter((character) => character.idPlanet == currentPlanet.id);
      filterCharacters(searchInput.value);
    });
  }
};

const drawCharacters = (characters) => {
  charactersDiv$$.innerHTML = "";
  console.log("Personajes a dibujar:", characters);
  for (let character of characters) {
    const characterDiv = document.createElement("div");
    characterDiv.className = "characterDiv";
    const characterImg = document.createElement("img");
    characterImg.src = character.avatar;
    const characterName = document.createElement("h2");
    characterName.innerText = character.name;
    const characterDescription = document.createElement("p");
    characterDescription.innerText = character.description;
    characterDescription.style.position = "absolute";
    characterDescription.style.display = "none";

    charactersDiv$$.appendChild(characterDiv);
    characterDiv.appendChild(characterImg);
    characterDiv.appendChild(characterName);
    characterDiv.appendChild(characterDescription);

    characterDiv.addEventListener("click", () => {
      console.log("Personaje clicado:", character.name);
      if (characterDescription.style.display === "none") {
        characterDescription.style.display = "block";
      } else {
        characterDescription.style.display = "none";
      }
    });

    charactersDiv$$.appendChild(characterDiv);
  }
};

const filterCharacters = (filter) => {
  if (!currentPlanet) return;
  const filteredCharacters = charactersOnPlanet.filter((character) =>
    character.name.toLowerCase().includes(filter.toLowerCase())
  );
  drawCharacters(filteredCharacters);
};

const drawInput = () => {
  searchInput = document.createElement("input");
  searchInput.placeholder = "Buscar personaje en el planeta seleccionado"
  searchInput.addEventListener("input", () =>
    filterCharacters(searchInput.value)
  );
  searchDiv$$.appendChild(searchInput);
};

const init = (planets) => {
    drawPlanets(planets);
    drawInput();
  };
  
  getData();
