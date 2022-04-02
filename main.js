import "./style.css";
import { Card, dealThreeCards } from "./library/card";
import { Player } from "./library/player";

const PALES = ["basto", "espasa", "oro", "copa"];
const MAX_PLAYERS = 4;

//Build cards
let cards = [];
for (let pale of PALES) {
  for (let i = 1; i <= 12; i++) {
    cards.push(new Card(i, pale));
  }
}

//Shuffle cards
cards = cards.sort(() => Math.random() - 0.5);

//Create players
let players = [];
for (let i = 0; i < MAX_PLAYERS; i++) {
  players.push(new Player(dealThreeCards(cards)));
}

//Create table
let table = [];
function initializeTable() {
  table = [];
  for (let i = 0; i < MAX_PLAYERS; i++) {
    table.push(new Card(0, null));
  }
}

//Create scores
let scores = [];
for (let i = 0; i < MAX_PLAYERS; i++) {
  scores.push(0);
}

//View
const playerElement = document.getElementById("player");
const tableElement = document.getElementById("table");
const playerHandElement = document.getElementById("player-hand");
const scoresElement = document.getElementById("scores");

//Render
const renderHandItem = (index) => {
  const button = document.createElement("button");
  button.classList.add("card");
  button.textContent =
    players[current_player].hand[index].number +
    " " +
    players[current_player].hand[index].pale;
  button.setAttribute("x-data-index", index);
  button.addEventListener("click", onCardSelection);
  return button;
};

const renderTableItem = (index) => {
  const button = document.createElement("button");
  if (table[index].pale === null) return button;
  button.classList.add("card");
  if (index === start_player) {
    button.classList.add("start");
  }
  button.textContent = table[index].number + " " + table[index].pale;
  button.setAttribute("x-data-index", index);
  button.addEventListener("click", onRoundWinner);
  return button;
};

const renderScoreItem = (index) => {
  const li = document.createElement("li");
  li.textContent = `Player ${index}: ${scores[index]}`;
  return li;
};

const render = () => {
  if (current_player !== null) {
    playerElement.textContent = `Player ${current_player}`;
  } else {
    playerElement.textContent = `Select round winner`;
  }
  tableElement.textContent = "";
  playerHandElement.textContent = "";
  scoresElement.textContent = "";
  for (let i = 0; i < table.length; i++) {
    tableElement.appendChild(renderTableItem(i));
  }
  for (let i = 0; i < 3; i++) {
    if (current_player !== null) {
      playerHandElement.appendChild(renderHandItem(i));
    }
  }
  for (let i = 0; i < MAX_PLAYERS; i++) {
    scoresElement.appendChild(renderScoreItem(i));
  }
};

const onCardSelection = (event) => {
  const button = event.currentTarget;
  const index = Number(button.getAttribute("x-data-index"));
  //Modifico el modelo
  table[current_player] = players[current_player].hand[index];
  //Reparto nuevas cartas
  players[current_player].hand.splice(index, 1);
  players[current_player].hand.push(cards[0]);
  cards.shift();

  changePlayer();
  //Pintar el modelo
  render();
};

function changePlayer() {
  current_player += 1;
  if (current_player === MAX_PLAYERS) {
    current_player = 0;
  }
  if (current_player === start_player) {
    current_player = null;
  }
}

const onRoundWinner = (event) => {
  if (current_player !== null) return;
  const button = event.currentTarget;
  const index = Number(button.getAttribute("x-data-index"));
  //Modifico el modelo
  let round_points = 0;
  for (let i = 0; i < MAX_PLAYERS; i++) {
    round_points += table[i].points;
  }
  scores[index] += round_points;
  start_player = index;
  current_player = index;
  initializeTable();
  //Pintar el modelo
  render();
};

let start_player = 0;
let current_player = 0;
initializeTable();
render();
