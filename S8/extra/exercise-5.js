/* En base a la api Open Trivia (https://opentdb.com/api_config.php), vamos a desarrollar un trivial con 
la siguiente url 'https://opentdb.com/api.php?amount=10&type=multiple'. 
Esta api nos devolverá una serie de preguntas con sus respuestas, tanto erroneas como correctas. 

La idea es hacer un juego en el que el usuario introduzca en un input las caracteristicas del Trivial 
y que al darle al 'Start Game' le salgan las preguntas de la api para que 
pueda comenzar el juego. Una vez las responda todas, le mostraremos al usuario el resultado.

Ten en cuenta que hay dos tipos de preguntas. Aquellas con 3 respuestas erroneas y 1 correcta y aquellas con respuesta verdadero / falso.
 */

const input$$ = document.querySelector(`[data-function="questions-number"]`);
const start$$ = document.querySelector(`[data-function="start-game"]`);
const board$$ = document.querySelector(`[data-function="gameboard"]`);
const check$$ = document.querySelector(`[data-function="check-game"]`);

let rightAnswers = 0;
let wrongAnswers = 0;
let gameStarted = false;
const questions = [];

const getData = async () => {
    try {
        const response = await fetch(`https://opentdb.com/api.php?amount=${input$$.value}&type=multiple`);
        const result = await response.json();
        console.log(result.results);
        result.results.forEach(question => questions.push(question));
    } catch (error) {
        console.error("Error:", error);
    }
};

const drawCard = (question) => {
    const cardDiv = document.createElement("div");
    const firstCategoryWord = question.category.split(' ')[0]; 
    cardDiv.className = `cardDiv ${firstCategoryWord}`; 

    const cardCategory = document.createElement("h2");
    cardCategory.innerText = question.category;
    const cardQuestion = document.createElement("p");
    cardQuestion.innerText = question.question;
    const questionsList = document.createElement("ul");

    board$$.appendChild(cardDiv);
    cardDiv.appendChild(cardCategory);
    cardDiv.appendChild(cardQuestion);
    cardDiv.appendChild(questionsList);

    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    allAnswers.sort(() => Math.random() - 0.5);

    allAnswers.forEach(answer => {
        const answerItem = document.createElement("li");
        answerItem.innerText = answer;
        questionsList.appendChild(answerItem);

        answerItem.addEventListener("click", () => {
            if (answer === question.correct_answer) {
                alert("Respuesta Correcta");
                rightAnswers++;
            } else {
                alert(`Respuesta Erronea\nLa respuesta correcta es ${question.correct_answer}`);
                wrongAnswers++;
            }

            cardDiv.remove();

            if (questions.length > 0) {
                const nextQuestion = questions.shift(); 
                drawCard(nextQuestion);
            } else {
                alert(`¡Juego terminado!\nRespuestas correctas: ${rightAnswers}\nRespuestas incorrectas: ${wrongAnswers}`);
                gameStarted = false;
                rightAnswers = 0;
                wrongAnswers = 0;
            }
        });
    });
};

const checkGame = () => {
    if (gameStarted === false) {
        alert(`Debes comenzar el juego para poder comprobar tus resultados`);
    } else {
        alert(`Llevas ${rightAnswers} respuestas correctas y ${wrongAnswers} incorrectas`);
    }
};

check$$.addEventListener("click", checkGame);

const init = async () => {
    if (gameStarted) {
        alert("Ya has comenzado un juego");
        return;
    }
    
    const numQuestions = parseInt(input$$.value);
    if (isNaN(numQuestions) || numQuestions <= 0) {
        alert("Debes introducir un número válido de preguntas mayor que cero");
        return;
    }

    rightAnswers = 0;
    wrongAnswers = 0;

    await getData();
    if (questions.length > 0) {
        const firstQuestion = questions.shift();
        drawCard(firstQuestion);
        gameStarted = true;
    } else {
        alert("Debes introducir el número de preguntas que quieres");
    }
};

start$$.addEventListener("click", init);
