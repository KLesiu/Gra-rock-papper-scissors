//state
//score
//player pick
//ai pick

const playerWinsLSKey = "playerWins";
const aiWinsLSKey = "aiWins";

let state = {
  playerWins: localStorage.getItem(playerWinsLSKey) || 0,
  aiWins: localStorage.getItem(aiWinsLSKey) || 0,
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
  document.querySelector(".options").classList.add("hidden");
};
const showFight = () => {
  document.querySelector(".fight").classList.remove("hidden");
  createElementPickedByPlayer();
  createElementPickedByAI();
};
const init = () => {
  renderScore();
  bindPickEvents();
};

init();
