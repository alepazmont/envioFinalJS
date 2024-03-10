/* # Descripción

En este ejercicio vamos a simular una batalla de rol, con dados y estadísticas por doquier!

De nuevo, tendremos una api local que deberemos ejecutar con json-server `json-server --watch exercise-6.json` . La url en cuestión de los personajes sería
`http://localhost:3000/characters`. Ten en cuenta que como usamos imágenes locales tienes que hacer el ejercicio en esta misma carpeta o llevarte la carpeta /public (carpeta con imágenes) donde tengas tus propios ejercicios.

En este caso vamos a realizar una batalla entre dos razas a elegir por el usuario. Por lo tanto, lo primero que
deberíamos hacer es una petición a personajes para imprimir sus datos en la página web. Tanto nombre, como imágenes y
estadísticas.

Cuando el usuario elija dos personajes, aparecerá un botón que diga "Luchar!". Una vez que el usuario haga click en el
botón luchar se realizarán una serie de tiradas de dados que decidirán que raza es la ganadora (puedes simular estas
tiradas haciendo un time out para que no salgan todos los resultados directamente).

# Condiciones de victoria

Para que una raza gane el combate tiene que dejar al contrincante con 0 puntos de vida (vitality). Para ello, Los
personajes lanzarán los dados que tengan sus características (damage) de forma ordenada (primero una raza, luego la
otra) y teniendo en cuenta las siguientes condiciones.

Si la raza tiene tiene por ejemplo este daño:

`"damage": ["2d6","1d10","2d20"]`

Significa que tendrá que lanzar 2 dados de 6 caras, 1 de 10 caras y 2 de 20 caras por turno. Para simular una tirada
aleatoria de dados podéis utilizar el siguiente código ``Math.floor(Math.random() * 10) + 1;``. Donde 10 es el numero
máximo del dado.

Por cada dado, tendremos que comprobar si el resultado coincide con el valor de la propiedad .critic del personaje. En
caso afirmativo, el daño de ESE dado se multiplicará x2.

````
Ejemplo de resultado de una tirada de humano:

4
2
8
10 x2 = 20
20
10 x2 = 20

Daño total = 74
````

Una vez que tengamos el daño completo, le restaremos el valor de la propiedad .defense del adversario.

`Ejemplo de la anterior tirada contra un enano que tiene 15 de defensa: 74 - 15 = 59`

Ese resultado, será el daño que el ha hecho el personaje al adversario, por lo cual, el resultado habría que restárselo
a la vitalidad del adversario (vitality).

`Ejemplo de vida restante del enano después del primer golpe del humano: 325 - 59 = 266`

Una vez concluido el golpe de un personaje pasaríamos al otro que haría el mismo proceso.

Este proceso se debería hacer constantemente hasta que uno de los personajes tenga 0 o menos puntos de vida. En cuyo
caso, el adversario sería el ganador.

Lo ideal es que una vez concluya una batalla, mostremos un botón para poder resetear el juego.

Para terminar y por hacer más justa la batalla, que raza ataca primero se decidirá de manera aleatoria.

**Mucha suerte a todos los contrincantes!**
 */


const charactersDiv$$ = document.querySelector('[data-function="characters"]');
const arenaDiv$$ = document.querySelector('[data-function="arena"]');
const title$$ = document.querySelector(".title");

const playersBox = document.createElement("div");
playersBox.className = "playersBox";
const gameInfo = document.createElement("div");
gameInfo.className = "gameInfo";
const gameResult = document.createElement("div");
gameResult.className = "gameResult";
gameResult.style.display = "none"

const battleButton = document.createElement("button");
battleButton.innerText = "Siguiente Jugada";
battleButton.className = "battleButton";
const gameLogList = document.createElement("div");
gameLogList.className = "gameLogList";

const restartGameButton = document.createElement("button");
restartGameButton.innerText = "Empezar nueva partida";
restartGameButton.className = "restartButton";

let selectedCharacters = [];
let gameStarted = false;
let gameLog = [];
let turn = 0;

const startButton = document.createElement("button");
startButton.innerText = "Empezar la batalla";
startButton.className = "strtButton";
startButton.style.display = "none";
charactersDiv$$.after(startButton);

const getData = async () => {
  try {
    const response = await fetch("http://localhost:3000/characters");
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

const drawCharacters = (characters, node) => {
  node.innerHTML = "";
  for (let character of characters) {
    const characterDiv = document.createElement("div");
    characterDiv.className = "characterDiv";
    characterDiv.innerHTML = `
      <h2 class="characterClass">${character.name}</h2>
      <img class="characterImg" src="${character.avatar}" alt="${character.name}">
      `;

    node.appendChild(characterDiv);

    const characterData = document.createElement("div");
    characterData.className = "CharacterData";
    characterDiv.appendChild(characterData);
    const characterStats = `
      <ul class="stats">
      <h5 class="statsTitle">Estadísticas</h5>
          <li>Vida: ${character.vitality}</li>
          <li>Crítico: ${character.critic}</li>
          <li>Defensa: ${character.defense}</li>
      </ul>`;

    characterData.innerHTML = characterStats;

    const characterDmg = document.createElement("ul");
    characterDmg.className = "dmgDices";
    const dmgTitle = document.createElement("h5");
    dmgTitle.innerText = "Daño:";
    characterDmg.appendChild(dmgTitle);
    let diceRolls = [];
    for (let dice of character.damage) {
      const damageDice = document.createElement("li");
      damageDice.innerText = dice;
      characterDmg.appendChild(damageDice);
      diceRolls.push(dice);
    }
    characterData.appendChild(characterDmg);
    const characterLife = document.createElement("div");
    let remainingLife = character.vitality;
    characterLife.innerHTML = `
    <h3 class="remainingLife" style="display: none;">Vida restante: ${remainingLife}</h3>
    `;
    characterData.after(characterLife);

    let characterIsSelected = false;

    characterDiv.addEventListener("click", () => {
      if (
        selectedCharacters.length >= 2 &&
        !characterIsSelected &&
        !gameStarted
      ) {
        alert("Solo puedes seleccionar dos personajes");
      } else if (!characterIsSelected && selectedCharacters.length < 2) {
        console.log("Personajes seleccionados:", selectedCharacters);
        selectedCharacters.push(character);
        characterDiv.style.backgroundColor = "green";
        characterIsSelected = true;
        if (selectedCharacters.length === 2) {
          startButton.style.display = "block";
        }
      } else if (characterIsSelected) {
        console.log("Personajes seleccionados:", selectedCharacters);
        const deselectCharacterIndex = selectedCharacters.findIndex(
          (char) => char.name === character.name
        );
        selectedCharacters.splice(deselectCharacterIndex, 1);
        characterDiv.style.backgroundColor = "transparent";
        characterIsSelected = false;
        if (selectedCharacters.length < 2) {
          startButton.style.display = "none";
        }
      }
    });
  }
};

const startGame = () => {
  if (!gameStarted) {
    charactersDiv$$.innerHTML = "";
    arenaDiv$$.appendChild(playersBox);
    arenaDiv$$.appendChild(gameInfo);

    gameStarted = true;
    drawCharacters(selectedCharacters, playersBox);
    startButton.style.display = "none";
    title$$.innerText = "¡Comienza la batalla!";
    battleButton;
    console.log(selectedCharacters);
    battleButton.style.display = "block";
    const playersLife$$ = document.querySelectorAll(".remainingLife");
    playersLife$$.forEach((life) => {
      life.style.display = "block";
    });

    gameInfo.appendChild(battleButton);
    gameInfo.appendChild(gameLogList);
    gameInfo.after(gameResult)
  }
};

startButton.addEventListener("click", startGame);

const decideFirstPlayer = () => {
  const randomNumber = Math.random();
  const firstPlayerDecided = document.createElement("h3");
  if (randomNumber < 0.5) {
    firstPlayerDecided.innerText = `¡Empieza el ${selectedCharacters[0].name}!`;
    gameLogList.appendChild(firstPlayerDecided);
    return selectedCharacters[0]; 
  } else {
    firstPlayerDecided.innerText = `¡Empieza el ${selectedCharacters[1].name}!`;
    gameLogList.appendChild(firstPlayerDecided);
    return selectedCharacters[1];
  }
};

const firstPlayer = decideFirstPlayer();
const secondPlayer = selectedCharacters.find(player => player !== firstPlayer);

const battle = () => {
  battleButton.disabled = true;

  battleButton.removeEventListener("click", battle);

  const player1 = firstPlayer;
  const player2 = secondPlayer;


  const rollDices = (player) => {
    let totalDamage = 0;
    let diceResults = []; 

    for (let dice of player.damage) {
      const [rolls, sides] = dice.split("d").map(Number);
      let damageFromDice = 0;
      for (let i = 0; i < rolls; i++) {
        let rolledDiceDmg = Math.floor(Math.random() * sides) + 1;
        damageFromDice += rolledDiceDmg;
        diceResults.push(rolledDiceDmg);
      }
      totalDamage += damageFromDice;
    }

    return { totalDamage, diceResults }; 
  };

  const updateGameLog = () => {
    gameLog.forEach((entry, index) => {
      if (entry.battleResult) {
        const battleResultEntry = document.createElement("div");
        battleResultEntry.textContent = entry.battleResult;
        gameLogList.appendChild(battleResultEntry);
      } else {
        const logEntry = document.createElement("div");
        logEntry.className = "logEntry";
        logEntry.textContent = `Turno ${index + 1}: ${entry.attacker.name} hizo ${entry.attacker.damage} de daño a ${entry.defender.name}.`;
        gameLogList.appendChild(logEntry);
        const diceResultsEntry = document.createElement("div");
        diceResultsEntry.textContent = `Tiradas: ${entry.attacker.diceResults.join(", ")}`;
        gameLogList.appendChild(diceResultsEntry);
      }
    });
};

const playerTurn = (attacker, defender) => {
  const { totalDamage, diceResults } = rollDices(attacker); 

  defender.vitality -= totalDamage;

  let battleResultText; 

  if (player1.vitality <= 0 || player2.vitality <= 0) {
    const battleResult = document.createElement("div");
    battleResult.className = "battleRslt"
    if (player1.vitality <= 0) {
      battleResultText = "La partida ha finalizado. El vencedor es " + player2.name;
      gameResult.style.display = "block"
      alert(battleResultText);
      battleResult.innerText = battleResultText;
      battleButton.style.display = "none"
      restartGameButton.style.display = "block"
      battleResult.appendChild(restartGameButton)


    } else {
      battleResultText = "La partida ha finalizado. El vencedor es " + player1.name;
      gameResult.style.display = "block"
      alert(battleResultText);
      battleResult.innerText = battleResultText;
      battleButton.style.display = "none"
      restartGameButton.style.display = "block"
      battleResult.appendChild(restartGameButton)



    }
    gameLog.push({ 
      battleResult: battleResultText
    });
    gameResult.appendChild(battleResult);
  }

  gameLog.push({
    attacker: {
      name: attacker.name,
      damage: totalDamage,
      diceResults: diceResults,
    },
    defender: {
      name: defender.name, 
      remainingLife: defender.vitality,
    },
  });

  turn++;

  updateRemainingLife([player1, player2]);

  updateGameLog();

  battleButton.disabled = false;
  battleButton.addEventListener("click", battle);
};

  const nextMove = () => {
    gameLogList.innerHTML = "";
    if (turn % 2 === 0) {
      playerTurn(player1, player2);
    } else {
      playerTurn(player2, player1);
    }
  };

  nextMove();
};

battleButton.addEventListener("click", battle);

const updateRemainingLife = (characters) => {
  const remainingLifeElements = document.querySelectorAll(".remainingLife");
  remainingLifeElements.forEach((element, index) => {
    element.textContent = `Vida restante: ${characters[index].vitality}`;
  });
};

const restartGame = async () => {
  const characters = await getData();
  charactersDiv$$.innerHTML = "";
  arenaDiv$$.innerHTML = "";  
  gameLogList.innerHTML = "";
  gameResult.innerHTML = "";
  restartGameButton.style.display = "none"
  gameResult.style.display = "none"
  
selectedCharacters = [];
gameStarted = false;
gameLog = [];
turn = 0;

  drawCharacters(characters, charactersDiv$$);

gameStarted = false

}

restartGameButton.addEventListener("click", async () => {
  const restartGameQuestion = confirm("¿Quieres empezar una nueva partida?");
  if (restartGameQuestion) {
    await restartGame();
  }
});

const init = async () => {
  const characters = await getData();
  drawCharacters(characters, charactersDiv$$);
};
init();
