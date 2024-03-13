let cardArray = [
  {
    id: 1,
    name: "earth",
    img: "public/exercise-1/earth.svg",
  },
  {
    id: 2,
    name: "jupiter",
    img: "public/exercise-1/jupiter.svg",
  },
  {
    id: 3,
    name: "mars",
    img: "public/exercise-1/mars.svg",
  },
  {
    id: 4,
    name: "mercury",
    img: "public/exercise-1/mercury.svg",
  },
  {
    id: 5,
    name: "saturn",
    img: "public/exercise-1/saturn.svg",
  },
  {
    id: 6,
    name: "uranus",
    img: "public/exercise-1/uranus.svg",
  },
  {
    id: 7,
    name: "earth",
    img: "public/exercise-1/earth.svg",
  },
  {
    id: 8,
    name: "jupiter",
    img: "public/exercise-1/jupiter.svg",
  },
  {
    id: 9,
    name: "mars",
    img: "public/exercise-1/mars.svg",
  },
  {
    id: 10,
    name: "mercury",
    img: "public/exercise-1/mercury.svg",
  },
  {
    id: 11,
    name: "saturn",
    img: "public/exercise-1/saturn.svg",
  },
  {
    id: 12,
    name: "uranus",
    img: "public/exercise-1/uranus.svg",
  },
];

document.addEventListener("DOMContentLoaded", function() { //Esperamos a que el DOM esté cargado
    const main$$ = document.querySelector('[data-function="grid"]');
    const scoreBoard = document.querySelector('[data-function="score"]');
    const attemptsBoard = document.querySelector('[data-function="attempts"]');
    const restart = document.createElement("button");
    restart.innerText = "Restart";
    main$$.after(restart)
    restart.style.display = "none"


    let clickedCardsNumber = 0;
    let clickedCards = [];
    let shuffledPlanets = []

    const shuffleArray = (array) => {//Desordenamos el array antes de dibujar las cartas
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const drawCards = (planets) => {
        main$$.innerHTML = "";
        let matchedPairs = 0;
        let attempts = 0;

        shuffledPlanets = shuffleArray(planets); // Desordenamos llamando a la función


        for (const planet of shuffledPlanets) { //Recorremos el array de cartas desordenadas
            let cardDiv$$ = document.createElement("div");
            cardDiv$$.className = "card";
            main$$.appendChild(cardDiv$$);
            const flipCard = document.createElement("div");
            flipCard.className = "flip-card"; //Añadimos clase para que roten por CSS
            cardDiv$$.appendChild(flipCard)
            .innerHTML = //Dibujamos la carta con la estructura para que pueda rotar
            ` 
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                    </div>
                    <div class="flip-card-back">
                        <img src="${planet.img}" alt="${planet.name}" style="width:200px;height:200px;">
                    </div>
                </div>
            `;

            flipCard.addEventListener("click", () => { //Evento al hacer click
                if (!flipCard.classList.contains('flip-card-click') && clickedCardsNumber < 2) { //Si la carta está bocabajo y hay menos de 2 seleccionadas...
                    flipCard.classList.add('flip-card-click'); //Añadios a la carta la clase para que se voltee
                    clickedCardsNumber++; //Sumamos al contador de cartas seleccionadas
                    clickedCards.push({ element: flipCard, planet }); //Añadimos la carta al array de cartas seleccionadas

                    if (clickedCardsNumber === 2) { //Si hay 2 cartas seleccionadas empezamos a comprobar
                        attempts++; //Contabilizamos el intento
                        if (clickedCards[0].planet.name === clickedCards[1].planet.name) { //Si son pareja...
                            matchedPairs++; //Sumamos un punto
                            clickedCards = []; //Limpiamos array de cartas seleccionadas
                            clickedCardsNumber = 0; //Limpiamos el contador de cartas seleccionadas
                            if (matchedPairs === cardArray.length / 2) { //Si el número de parejas corresponde a la mitad del array (Todas las cartas)
                                setTimeout(() => { //Esperar medio segundo para que haya podido darse la vuelta la última carta
                                    alert(`¡Felicidades! ¡Has completado el juego!\n Intentos ${attempts} - Puntuación: ${matchedPairs} `);
                                    restart.style.display = "block";
                                    restart.addEventListener("click", restartGame);
                                }, 500);
                            }
                        } else {
                            setTimeout(() => { //Voltear cartas si no son pareja
                                clickedCards.forEach(({ element }) => {
                                    element.classList.remove('flip-card-click');
                                });
                                clickedCards = [];
                                clickedCardsNumber = 0;
                            }, 1000);
                        }
                    }
                    // Actualizar el contador de puntuación e intentos
                    scoreBoard.innerText = matchedPairs.toString();
                    attemptsBoard.innerText = attempts.toString(); 
                }
            });
        }
    };

    const restartGame = () => {
        matchedPairs = 0;
        attempts = 0;
        shuffledPlanets = [];
        scoreBoard.innerText = matchedPairs.toString();
        attemptsBoard.innerText = attempts.toString(); 
        drawCards(cardArray);
        restart.style.display = "none";

    }

    const init = async () => { //Inicializar juego
        drawCards(cardArray);
    };
    init();
});
