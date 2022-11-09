//state
//score
//player pick
//ai pick

const playerWinsLSKey = "playerWins";
const aiWinsLSKey = "aiWins";
const winningResaultsMap = {
  paper: ["rock"],
  scissors: ["paper"],
  rock: ["scissors"],
};

let state = {
  playerWins: Number(localStorage.getItem(playerWinsLSKey)) || 0,
  aiWins: Number(localStorage.getItem(aiWinsLSKey)) || 0,
  playerPick: null,
  aiPick: null,
};
const renderScore = () => {
  const pointsElement = document.querySelector(".points");
  pointsElement.innerText = state.playerWins - state.aiWins;
};

const bindPickEvents = () => {
  document.querySelectorAll(".options button").forEach((button) => {
    button.addEventListener("click", pick);
  });
  document.querySelector(".resault__button").addEventListener("click", reset);
};

const pick = (e) => {
  pickByPlayer(e.currentTarget.dataset.pick);
  pickByAi();
  hideOptions();
  showFight();
};
const pickByPlayer = (pickedOption) => {
  state = {
    ...state,
    playerPick: pickedOption,
  };
};

const pickByAi = () => {
  const options = ["rock", "paper", "scissors"];
  const aiPick = options[Math.floor(Math.random() * options.length)];
  state = {
    ...state,
    aiPick,
  };
};
const hideOptions = () => {
  const optionsElement = document.querySelector(".options");
  optionsElement.classList.add("slide-left");
};
const showFight = () => {
  const fightElement = document.querySelector(".fight");
  fightElement.classList.add("slide-left");

  createElementPickedByPlayer();
  createElementPickedByAI();

  document.querySelectorAll(".options button").forEach((button) => {
    button.setAttribute("tabindex", -1);
  });
  document.querySelector(".resault__button").setAttribute("tabindex", 0);

  showResault();
};
const showResault = () => {
  const resaultTextElement = document.querySelector(".resault__text");
  if (state.aiPick === state.playerPick) {
    resaultTextElement.innerText = "DRAW";
  } else if (winningResaultsMap[state.playerPick].includes(state.aiPick)) {
    resaultTextElement.innerText = "YOU WIN";
    localStorage.setItem(playerWinsLSKey, state.playerWins + 1);
    console.log("player wins");
    state = {
      ...state,
      playerWins: state.playerWins + 1,
    };
  } else {
    resaultTextElement.innerText = "YOU LOSE";
    localStorage.setItem(playerWinsLSKey, state.aiWins + 1);
    console.log("ai wins");
    state = {
      ...state,
      aiWins: state.aiWins + 1,
    };
  }
  setTimeout(renderResault, 1000);
  renderScore();
};
const renderResault = () => {
  document.querySelector(".resault").classList.add("shown");
  document.querySelector(".pick--player").classList.add("moved");
  document.querySelector(".pick--ai").classList.add("moved");
};
const createElementPickedByPlayer = () => {
  const playerPick = state.playerPick;

  const pickContainerElement = document.querySelector(
    ".pick__container--player"
  );
  pickContainerElement.innerHTML = "";
  pickContainerElement.appendChild(createPickElement(playerPick));
};
const createElementPickedByAI = () => {
  const AIPick = state.aiPick;

  const pickContainerElement = document.querySelector(".pick__container--ai");
  pickContainerElement.innerHTML = "";
  pickContainerElement.appendChild(createPickElement(AIPick));
};
const createPickElement = (options) => {
  const pickElement = document.createElement("div");
  pickElement.classList.add("button", `button--${options}`);
  const imageContainerElement = document.createElement("div");
  imageContainerElement.classList.add("button__image-container");
  const imgElement = document.createElement("img");
  imgElement.src = `./images/icon-${options}.svg`;
  imgElement.alt = options;
  imageContainerElement.appendChild(imgElement);
  pickElement.appendChild(imageContainerElement);
  return pickElement;
};
const reset = () => {
  const fightElement = document.querySelector(".fight");
  fightElement.classList.remove("slide-left");

  const optionsElement = document.querySelector(".options");
  optionsElement.classList.remove("slide-left");

  document.querySelectorAll(".options button").forEach((button) => {
    button.setAttribute("tabindex", 0);
  });
  document.querySelector(".resault__button").setAttribute("tabindex", -1);
};
const init = () => {
  renderScore();
  bindPickEvents();
};

init();
