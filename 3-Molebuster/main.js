document.addEventListener("DOMContentLoaded", function() {
    document.body.addEventListener("click", () => { //Animación del mazo 
        document.body.classList.add('click-cursor'); // Aplica la clase para cambiar el cursor al hacer clic
      
        setTimeout(() => {
          document.body.classList.remove('click-cursor'); // Elimina la clase después del tiempo asignado
        }, 100);
      });

    const startButton = document.querySelector("button");
    let gameStarted = false; // Variable para controlar si el juego ya está en marcha
    let gameOver = false; // Variable para controlar si el juego ha terminado

    startButton.addEventListener("click", startGame);

    function startGame() {
        if (gameStarted) return; // Si el juego ya está en marcha, no hagas nada
        gameStarted = true; // Establece el juego como iniciado

        let score = 0; //Puntuación inicial
        const scoreDisplay = document.querySelector('.score'); //Marcador de juego

        let timeLeft = 10; // Tiempo de juego en segundos
        let centisecondsLeft = 99; // Centésimas de segundo
        const timerDisplay = document.querySelector('.countdown'); //Temporizador de juego
        timerDisplay.textContent = formatTime(timeLeft, centisecondsLeft); //Formatear temporizador

        const holes = document.querySelectorAll('.hole'); //Encontrar los hoyos en el html

        function showMole() {
            if (gameOver) return; // Detener la función si el juego ha terminado
            const randomHoleIndex = getRandomNumber(0, holes.length - 1); //Obtener el número de uno de los hoyos
            const randomHole = holes[randomHoleIndex]; //Encontrar el hoyo mediante el index
            const mole = randomHole.querySelector('.mole'); //Seleccionar al topo del hoyo seleccionado

            
            if (!mole.classList.contains('up')) { // Asegurarse de que el agujero esté vacío antes de mostrar el topo
                mole.classList.add('up');
                randomHole.classList.add('up');
                setTimeout(() => {
                    mole.classList.remove('up');
                    randomHole.classList.remove('up');

                }, getRandomNumber(1000, 2000)); // Mostrar el topo durante un tiempo aleatorio entre 1 y 2 segundos
            }

            setTimeout(showMole, getRandomNumber(1000, 1500)); // Llamar a showMole de nuevo después de un tiempo aleatorio
        }

        function bonkMole() {
            if (!this.classList.contains('up')) return; // No sumar puntos si no hay topo
            score++;
            this.classList.remove('up');
            scoreDisplay.textContent = score;
        }

        holes.forEach(hole => hole.addEventListener('click', bonkMole));

        showMole(); // Comienza a mostrar los topos

        const timerInterval = setInterval(() => { //Actualizar temporizador para cada centésima
            if (gameOver) { // Si el juego ha terminado, detener el temporizador
                clearInterval(timerInterval);
                return;
            }
            
            centisecondsLeft--;
            if (centisecondsLeft < 0 && !gameOver) { //Reiniciar centésimas cada segundo
                centisecondsLeft = 99;
                timeLeft--;
            }
            timerDisplay.textContent = formatTime(timeLeft, centisecondsLeft);

            if (timeLeft < 0) { //Finalizar juego al acabar el tiempo
                gameOver = true;
                gameStarted = false; 
                alert('¡Fin del juego! Tu puntuación final es: ' + score);
                timeLeft = 0;
                centisecondsLeft = 0;
                startButton.innerText = "Restart!";
                startButton.removeEventListener("click", startGame);
                startButton.addEventListener("click", restartGame);
                timerDisplay.textContent = formatTime(timeLeft, centisecondsLeft);
            }
        }, 10); // Actualizar cada centésima de segundo

        function restartGame() {
            gameOver = false;
            timeLeft = 10;
            centisecondsLeft = 0;
            timerDisplay.textContent = formatTime(timeLeft, centisecondsLeft)
            console.log("Game Restarted")
            score = 0;
            scoreDisplay.textContent = score;
            startGame();
        }
    }
});

function getRandomNumber(min, max) { //Obtener número aleatorio en un rango max-min
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatTime(seconds, centiseconds) { //Formatear tiempo para que se vea bien en string
    let formattedSeconds;
    let formattedCentiseconds;
    
//Si los segundos o las centésimas son menos de 10, añade un 0 para que mantenga formato de 2 cifras
    if (seconds < 10) {  
        formattedSeconds = `0${seconds}`;
    } else {
        formattedSeconds = seconds;
    }

    if (centiseconds < 10) {
        formattedCentiseconds = `0${centiseconds}`;
    } else {
        formattedCentiseconds = centiseconds;
    }

    return `${formattedSeconds}:${formattedCentiseconds}`;
}
