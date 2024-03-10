/* Basandonos en el ejercicio 6 (con tener la parte de llamar a los personajes nos vale pero si lo tenemos 
todo lo podríamos mezclar y hacer un super mega ultra ejercicio 3000) vamos a crear un formulario para añadir nuevos luchadores al elenco.

Para ello añade al html un formulario para añadir los campos:

- name (input tipo string)
- avatar (input tipo string). Me vale con que el usuario ponga una url de internet
- critic (input tipo number)
- defense (input tipo number)
- vitality (input tipo number)
- damage (input tipo string)

Cuando el usuario le de al botón de guardar del formulario. Obtendremos un objeto con todos los datos introducidos por el usuario y guardaremos este luchador en la base de datos (JSON) enviando el luchador mediante un metodo POST a la url `http://localhost:3000/characters`.

Recuerda tener arrancado el servidor json-server para poder acceder a los personajes. */

// Elementos iniciales del DOM

const charactersDiv$$ = document.querySelector('[data-function="characters"]'); //Bloque para mostrar selección personajes
const arenaDiv$$ = document.querySelector('[data-function="arena"]'); //Bloque para mostrar combate jugadores
const title$$ = document.querySelector(".title");
const loader$$ = document.querySelector(".loaderContainer")
loader$$.style.display = "none";


const playersBox = document.createElement("div"); //Mostrar jugadores
playersBox.className = "playersBox";
const gameInfo = document.createElement("div"); //Mostrar resultados combate
gameInfo.className = "gameInfo";
const gameResult = document.createElement("div"); //Mostrar números combate
gameResult.className = "gameResult";
gameResult.style.display = "none";

const createButton = document.createElement("button"); //Botón crear nuevo personaje
createButton.className = "createButton";
createButton.innerText = "Crear tu propio personaje";
charactersDiv$$.after(createButton);
const createCharacterContainer = document.createElement("div"); //Bloque oscuro para creación personaje
createCharacterContainer.className = "createCharacterContainer";
createCharacterContainer.style.display = "none";

const restartGameButton = document.createElement("button");
restartGameButton.innerText = "Empezar nueva partida";
restartGameButton.className = "restartButton";

const battleButton = document.createElement("button");
battleButton.innerText = "Siguiente Jugada";
battleButton.className = "battleButton";
const gameLogList = document.createElement("div");
gameLogList.className = "gameLogList";

let charactersArray = [];
let selectedCharacters = [];
let gameStarted = false;
let gameLog = [];
let turn = 0;

const startButton = document.createElement("button");
startButton.innerText = "Empezar la batalla";
startButton.className = "strtButton";
startButton.style.display = "none";
charactersDiv$$.after(startButton);

// Obtención de datos

const getData = async () => {
  try {
    const response = await fetch("http://localhost:3000/characters");
    const result = await response.json();
    charactersArray.splice(0, charactersArray.length, ...result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};


// Dibujar personajes y sus eventos

const drawCharacters = (characters, node) => {
  console.log(characters)
  node.innerHTML = ""; // Limpiamos el nodo
  for (let character of characters) { // Recorremos cada personaje y añadimos elementos
    const characterDiv = document.createElement("div");
    characterDiv.className = "characterDiv";
    characterDiv.innerHTML = `
      <h2 class="characterClass">${character.name}</h2>
      <img class="characterImg" src="${character.avatar}" alt="${character.name}">
    `;
    const characterData = document.createElement("div");
    characterData.className = "characterData";
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
    let diceRolls = [];   
    characterDmg.appendChild(dmgTitle);
    for (let dice of character.damage) {
      const damageDice = document.createElement("li");
      damageDice.innerText = dice;
      characterDmg.appendChild(damageDice);
      diceRolls.push(dice);
    }
    const characterLife = document.createElement("div");
    let remainingLife = character.vitality;
    characterLife.innerHTML = `
      <h3 class="remainingLife" style="display: none;">Vida restante: ${remainingLife}</h3>
    `;

    node.appendChild(characterDiv);
    characterDiv.appendChild(characterData);
    characterData.appendChild(characterDmg);
    characterData.after(characterLife);

    let characterIsSelected = false; // Marcamos inicialmente el personaje como NO seleccionado

    characterDiv.addEventListener("click", () => {
      // Añadimos evento para la selección de personajes
      if (selectedCharacters.length >= 2 && !characterIsSelected && !gameStarted) {
        alert("Solo puedes seleccionar dos personajes");
      } else if (!characterIsSelected && selectedCharacters.length < 2) {
        // Si el personaje no está seleccionado y hay menos de 2 seleccionados
        console.log("Personajes seleccionados:", selectedCharacters);
        selectedCharacters.push(character);
        characterDiv.style.backgroundColor = "green";
        characterIsSelected = true;
        if (selectedCharacters.length === 2) {
          startButton.style.display = "block";
        }
      } else if (characterIsSelected) {
        // Deseleccionamos si el personaje ya está seleccionado
        console.log("Personajes seleccionados:", selectedCharacters);
        const deselectCharacterIndex = selectedCharacters.findIndex(
          (char) => char.name === character.name
        );
        selectedCharacters.splice(deselectCharacterIndex, 1);
        characterDiv.style.backgroundColor = "transparent";
        characterIsSelected = false;
        if (selectedCharacters.length < 2) {
          // Si vuelve a haber menos de 2 ocultamos Empezar batalla
          startButton.style.display = "none";
        }
      }
    });
  }
};

const createCharacter = () => {
  //Añadir nuevo personaje

  createButton.addEventListener("click", () => {
    //Mostrar bloque creación personaje
    createCharacterContainer.style.display = "flex";
  });

  const createCharacterBlock = document.createElement("div"); //Bloque formulario
  createCharacterBlock.className = "createCharacterBlock";
  createCharacterBlock.style.display = "flex";

  const newCharacterTitle = document.createElement("h3"); // Título e inputs
  newCharacterTitle.for = "newCharacterTitle";
  newCharacterTitle.innerText = "Datos del personaje";

  const inputCharacterNameLabel = document.createElement("label");
  inputCharacterNameLabel.htmlFor = "inputCharacterName";
  inputCharacterNameLabel.innerText = "Raza/nombre";
  const inputCharacterName = document.createElement("input");
  inputCharacterName.type = "text";
  inputCharacterName.id = "inputCharacterName";

  const inputCharacterAvatarLabel = document.createElement("label");
  inputCharacterAvatarLabel.htmlFor = "inputCharacterAvatarLabel";
  inputCharacterAvatarLabel.innerText = "Avatar (URL)";
  const inputCharacterAvatar = document.createElement("input");
  inputCharacterAvatar.type = "url";
  inputCharacterAvatar.id = "inputCharacterAvatar";

  const inputCharacterCriticLabel = document.createElement("label");
  inputCharacterCriticLabel.htmlFor = "inputCharacterCriticLabel";
  inputCharacterCriticLabel.innerText = "Crítico";
  const inputCharacterCritic = document.createElement("input");
  inputCharacterCritic.type = "number";
  inputCharacterCritic.id = "inputCharacterCritic";

  const inputCharacterDefenseLabel = document.createElement("label");
  inputCharacterDefenseLabel.htmlFor = "inputCharacterDefenseLabel";
  inputCharacterDefenseLabel.innerText = "Defensa";
  const inputCharacterDefense = document.createElement("input");
  inputCharacterDefense.type = "number";
  inputCharacterDefense.id = "inputCharacterDefense";

  const inputCharacterVitalityLabel = document.createElement("label");
  inputCharacterVitalityLabel.htmlFor = "inputCharacterVitalityLabel";
  inputCharacterVitalityLabel.innerText = "Vitalidad";
  const inputCharacterVitality = document.createElement("input");
  inputCharacterVitality.type = "number";
  inputCharacterVitality.id = "inputCharacterVitality";

  const inputCharacterDamageLabel = document.createElement("label");
  inputCharacterDamageLabel.htmlFor = "inputCharacterLabel";
  inputCharacterDamageLabel.innerText = "Daño (Nº Tiradas + Caras del dado";
  const inputCharacterDamageDiv = document.createElement("div");
  inputCharacterDamageDiv.className = "inputCharacterDamageDiv";
  const inputCharacterDamageRolls = document.createElement("input");
  inputCharacterDamageRolls.type = "number";
  inputCharacterDamageRolls.placeholder = "Tiradas";
  const inputCharacterDamageText = document.createElement("p");
  inputCharacterDamageText.innerText = "d";
  const inputCharacterDamageSides = document.createElement("input");
  inputCharacterDamageSides.type = "number";
  inputCharacterDamageSides.placeholder = "Caras";

  const pushCharacter = (array) => {
    let diceRolls = [];   

    const inputCharacterDamage = inputCharacterDamageRolls.value+inputCharacterDamageText.innerText+inputCharacterDamageSides.value //Asignar valores correctamente para el daño antes de empujar
    diceRolls.push(inputCharacterDamage)
    console.log(inputCharacterDamage)

    //Añadir personaje al array
    const newCharacter = {
      id: "6",
      name: inputCharacterName.value,
      avatar: inputCharacterAvatar.value,
      critic: inputCharacterCritic.value,
      defense: inputCharacterDefense.value,
      vitality: inputCharacterVitality.value,
      damage: diceRolls,
    };

    if (!inputCharacterName.value.trim()) {
      //Avisos al añadir personaje
      alert("Debes darle un nombre a tu nuevo personaje");
    } else if (typeof inputCharacterName.value !== "string") { 
      alert("El nombre debe ser una cadena de texto"); 
    } else if (!inputCharacterAvatar.value) {
      alert("Debes introducir una URL válida"); 
    } else if (
      inputCharacterCritic.value < 0 ||
      inputCharacterDefense.value < 0 ||
      inputCharacterVitality.value < 0 ||
      inputCharacterCritic.value > 20 ||
      inputCharacterDefense.value > 20 ||
      inputCharacterVitality.value > 300
    ) {
      alert("Debes introducir unos valores más razonables para tu personaje");
    } else if (
      inputCharacterDamageRolls.value * inputCharacterDamageSides <= 40 ||
      inputCharacterDamageRolls.value * inputCharacterDamageSides >= 60
    ) {
      alert("El daño (Nº tiradas x Caras) debe estar entre los 40 y 60 puntos");
    } else {
      charactersArray.push(newCharacter);
      console.log(charactersArray);
      createCharacterContainer.style.display = "none";

      drawCharacters(charactersArray, charactersDiv$$);
      selectedCharacters = []
      createButton.style.display = "none";

    }
  };

  const addCharacter = document.createElement("button");
  addCharacter.className = "addCharacter";
  addCharacter.innerText = "Añadir";
  addCharacter.addEventListener("click", pushCharacter);

  const cancelAdd = document.createElement("h4");
  cancelAdd.className = "cancelAdd";
  cancelAdd.innerText = "Cancelar";
  cancelAdd.addEventListener("click", () => {
    createCharacterContainer.style.display = "none";
  });

  createCharacterBlock.appendChild(newCharacterTitle);
  createCharacterBlock.appendChild(inputCharacterNameLabel);
  createCharacterBlock.appendChild(inputCharacterName);
  createCharacterBlock.appendChild(inputCharacterAvatarLabel);
  createCharacterBlock.appendChild(inputCharacterAvatar);
  createCharacterBlock.appendChild(inputCharacterCriticLabel);
  createCharacterBlock.appendChild(inputCharacterCritic);
  createCharacterBlock.appendChild(inputCharacterDefenseLabel);
  createCharacterBlock.appendChild(inputCharacterDefense);
  createCharacterBlock.appendChild(inputCharacterVitalityLabel);
  createCharacterBlock.appendChild(inputCharacterVitality);
  createCharacterBlock.appendChild(inputCharacterDamageLabel);
  createCharacterBlock.appendChild(inputCharacterDamageDiv);
  inputCharacterDamageDiv.appendChild(inputCharacterDamageRolls);
  inputCharacterDamageDiv.appendChild(inputCharacterDamageText);
  inputCharacterDamageDiv.appendChild(inputCharacterDamageSides);
  createCharacterBlock.appendChild(addCharacter);
  createCharacterBlock.appendChild(cancelAdd);
  createCharacterContainer.appendChild(createCharacterBlock);

  charactersDiv$$.appendChild(createCharacterContainer);
};

const startGame = () => {
  if (!gameStarted) {
    charactersDiv$$.innerHTML = "";
    arenaDiv$$.appendChild(playersBox);
    arenaDiv$$.appendChild(gameInfo);

    gameStarted = true;
    drawCharacters(selectedCharacters, playersBox);
    createButton.style.display = "none"
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
    gameInfo.after(gameResult);
  }
};

startButton.addEventListener("click", startGame);

const decideFirstPlayer = () => {
  const randomNumber = Math.random();
  const firstPlayerDecided = document.createElement("h3");
  if (randomNumber < 0.5) {
    return selectedCharacters[0];
  } else {
    return selectedCharacters[1];
  }
};

const firstPlayer = decideFirstPlayer();
const secondPlayer = selectedCharacters.find(
  (player) => player !== firstPlayer
);

const showCombatLoader = () => {
  return new Promise(resolve => {
    loader$$.style.display = "block";
    setTimeout(() => {
      loader$$.style.display = "none"; 
      resolve();
    }, 2000); 
  });
};

const battle = async () => {
  battleButton.disabled = true;

  battleButton.removeEventListener("click", battle);

  const player1 = selectedCharacters[0];
  const player2 = selectedCharacters[1];

  const rollDices = async (player) => {

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
        logEntry.textContent = `Turno ${index + 1}: ${
          entry.attacker.name
        } hizo ${entry.attacker.damage} de daño a ${entry.defender.name}.`;
        gameLogList.appendChild(logEntry);
        const diceResultsEntry = document.createElement("div");
        diceResultsEntry.textContent = `Tiradas: ${entry.attacker.diceResults.join(
          ", "
        )}`;
        gameLogList.appendChild(diceResultsEntry);
      }
    });
  };

  const playerTurn = async (attacker, defender) => {
    const { totalDamage, diceResults } = await rollDices(attacker);

    defender.vitality -= totalDamage;

    let battleResultText;

    if (player1.vitality <= 0 || player2.vitality <= 0) {
      const battleResult = document.createElement("div");
      battleResult.className = "battleRslt";
      if (player1.vitality <= 0) {
        battleResultText =
          "La partida ha finalizado. El vencedor es " + player2.name;
        gameResult.style.display = "block";
        alert(battleResultText);
        battleResult.innerText = battleResultText;
        battleButton.style.display = "none";
        restartGameButton.style.display = "block";
        battleResult.appendChild(restartGameButton);
      } else {
        battleResultText =
          "La partida ha finalizado. El vencedor es " + player1.name;
        gameResult.style.display = "block";
        alert(battleResultText);
        battleResult.innerText = battleResultText;
        battleButton.style.display = "none";
        restartGameButton.style.display = "block";
        battleResult.appendChild(restartGameButton);
      }
      gameLog.push({
        battleResult: battleResultText,
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
    await showCombatLoader();
    gameLogList.innerHTML = "";

    updateRemainingLife([player1, player2]);

    updateGameLog();

    battleButton.disabled = false;
    battleButton.addEventListener("click", battle);
  };

  const nextMove = async () => {
    if (turn % 2 === 0) {
      await playerTurn(player1, player2);
    } else {
      await playerTurn(player2, player1);
    }
  };

  await nextMove();
};

battleButton.addEventListener("click", battle);

const updateRemainingLife = (character) => {
  const remainingLifeElements = document.querySelectorAll(".remainingLife");
  remainingLifeElements.forEach((element, index) => {
    element.textContent = `Vida restante: ${character[index].vitality}`;
  });
};

const restartGame = async () => {
  try {
    const characters = await getData();
    charactersArray = [...characters];
    charactersDiv$$.innerHTML = "";
    arenaDiv$$.innerHTML = "";
    gameLogList.innerHTML = "";
    gameResult.innerHTML = "";
    restartGameButton.style.display = "none";
    gameResult.style.display = "none";
    createButton.style.display = "block";
    gameStarted = false;
    gameLog = [];
    selectedCharacters = []
    turn = 0;
    drawCharacters(charactersArray, charactersDiv$$);
  } catch (error) {
    console.error("Error al reiniciar el juego:", error);
  }
};

restartGameButton.addEventListener("click", async () => {
  const restartGameQuestion = confirm("¿Quieres empezar una nueva partida?");
  if (restartGameQuestion) {
    await restartGame();
  }
});

const init = async () => {
  await getData();
  drawCharacters(charactersArray, charactersDiv$$);
  createCharacter();
};
init();
