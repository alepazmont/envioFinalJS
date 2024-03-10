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

const battleButton = document.createElement("button");
battleButton.innerText = "Siguiente Jugada";
battleButton.className = "battleButton";


let selectedCharacters = [];
let gameStarted = false;
let gameLog = [];
let turn = 0;

const startButton = document.createElement("button");
startButton.innerText = "Empezar la batalla";
startButton.className = "strteButton";
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
        // Mostrar el botón si se seleccionan 2 personajes
        if (selectedCharacters.length === 2) {
          startButton.style.display = "block";
        }
      } else if (characterIsSelected) {
        console.log("Personajes seleccionados:", selectedCharacters);
        const deselectCharacterIndex = selectedCharacters.findIndex(
          (char) => char.name === character.name
        );
        selectedCharacters.splice(deselectCharacterIndex, 1);
        characterDiv.style.backgroundColor = "beige";
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
  }
};

startButton.addEventListener("click", startGame);

const battle = () => {
  const player1 = selectedCharacters[0];
  const player2 = selectedCharacters[1];

  const rollDices = (player) => {
    let totalDamage = 0;
    for (let dice of player.damage) {
      const [rolls, sides] = dice.split("d").map(Number);
      for (let i = 0; i < rolls; i++) {
        totalDamage += Math.floor(Math.random() * sides) + 1;
      }
    }
    return totalDamage;
  };

  const gameLogElement = document.createElement("div");
  gameLogElement.className = "gameLog";
  gameInfo.appendChild(gameLogElement);

  const updateGameLog = () => {
    gameLogElement.innerHTML = "";


    // Iterar sobre las entradas del gameLog y mostrarlas en el elemento gameLogElement
    gameLog.forEach((entry, index) => {
      const logEntry = document.createElement("div");
      logEntry.textContent = `Turno ${index + 1}: ${selectedCharacters[0].name} hizo ${entry.attacker.damage} de daño, ${selectedCharacters[1].name} hizo ${entry.defender.damage} de daño.`;
      gameLogElement.appendChild(logEntry);
    });
  };

  const playerTurn = (attacker, defender) => {
    const attackerDamage = rollDices(attacker);
    const defenderDamage = rollDices(defender);
  
    defender.vitality -= attackerDamage;
    attacker.vitality -= defenderDamage;
  
    gameLog.push({
      attacker: {
        damage: attackerDamage,
        remainingLife: attacker.vitality,
      },
      defender: {
        damage: defenderDamage,
        remainingLife: defender.vitality,
      },
    });

    turn++

    updateRemainingLife([player1, player2]);

    if (player1.vitality <= 0 || player2.vitality <= 0) {
      if (player1.vitality <= 0) {
        alert("La partida ha finalizado. El vencedor es " + player2.name);
      } else {
        alert("La partida ha finalizado. El vencedor es " + player1.name);
      }
    }
    updateGameLog();
  };

  const nextMove = () => {
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

const init = async () => {
  const characters = await getData();
  drawCharacters(characters, charactersDiv$$);
};
init();
