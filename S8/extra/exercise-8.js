/* Añade un evento click al botón `Call a cat` que haga una petición a `https://api.thecatapi.com/v1/images/search`. Pinta la imagen que recibas de la api y añade además un botón `Eliminar` que elimine la imagen del gato.

Puedes hacer click tantas veces como quieras en el botón `Call a cat`. De modo que si hago click 5 veces, pintaré 5 gatos */

/* const getData = async () => {
    try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search`);
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error:", error);
    }
};

const drawButton = async () => {
    const button = document.createElement("button");
    button.innerText = "Call a cat";
    document.body.appendChild(button);

    button.addEventListener("click", async () => {
        const catData = await getData();
        drawCat(catData[0].url);
    });
};

const mainCatBlock = document.createElement("div");
mainCatBlock.className = "catBlock";
document.body.appendChild(mainCatBlock);

const drawCat = (catUrl) => {

    const catDiv = document.createElement("div");
    catDiv.className = "catContainer";

    const catPhoto = document.createElement("img");
    catPhoto.src = catUrl;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Eliminar";
    deleteButton.addEventListener("click", () => {
        catDiv.remove();
    });

    catDiv.appendChild(catPhoto);
    catDiv.appendChild(deleteButton);
    mainCatBlock.appendChild(catDiv);

};

const init = async () => {
    await drawButton();
};

document.addEventListener("DOMContentLoaded", function() {

    init();
}); */

/* Vamos a utilizar la api `https://ghibliapi.herokuapp.com/films` para pintar las peliculas en una galería.

Recoge los datos de la api y recorrelos para pintar en la web la imagen y el titulo de las peliculas.

Añade también clases a los elementos para poder darle estilos. */

const getData = async () => {
  try {
    const response = await fetch(`https://ghibliapi.dev/films/`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

const drawMovies = (movies) => {
  const gallery = document.createElement("div");
  gallery.className = "mainContainer";
  document.body.appendChild(gallery);
  for (let movie of movies) {
    const movieCard = document.createElement("div");
    movieCard.className = "movieCard flip-card";
    movieCard.innerHTML = `
    <div class="flip-card-inner">
        <div class="flip-card-front">
            <h2>Title: ${movie.title}</h2>
            <h3>Original Title: ${movie.original_title}</h3>
            <img src="${movie.image}" alt="${movie.title}">
            <p>Duration: ${movie.running_time} - Release date: ${movie.release_date}</p>
            <p>Director: ${movie.director}</p>
            <p></p>Producer: ${movie.producer}</p>
            <p>Rotten Tomatoes Score: ${movie.rt_score}</p>
        </div>
            <div class="flip-card-back">
            <h2>Description:</h2>
            <p class="movieDesc">${movie.description}</p>
        </div>
    </div>
        `;
    gallery.appendChild(movieCard);
  }
};

const init = async () => {
  const movies = await getData();
  drawMovies(movies)
};

init();
