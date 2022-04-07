import "./style.css";
import { Brisca } from "./library/brisca";

let brisca = new Brisca(4);

//View
const playerElement = document.getElementById("player");
const tablePaleElement = document.getElementById("table-pale");
const tableElement = document.getElementById("table");
const playerHandElement = document.getElementById("player-hand");
const scoresElement = document.getElementById("scores");

//Render
const renderHandItem = (index) => {
  const button = document.createElement("button");
  button.classList.add("card");
  button.textContent = brisca.getHandItem(index);
  button.setAttribute("x-data-index", index);
  button.addEventListener("click", onCardSelection);
  return button;
};

const renderTableItem = (index) => {
  const button = document.createElement("button");
  if (brisca.table[index].pale === null) return button;
  button.classList.add("card");
  if (index === brisca.start_player) {
    button.classList.add("start");
  }
  button.textContent = brisca.table[index].toString();
  button.setAttribute("x-data-index", index);
  button.addEventListener("click", onRoundWinner);
  return button;
};

const renderScoreItem = (index) => {
  const li = document.createElement("li");
  li.textContent = `Player ${index}: ${brisca.scores[index]}`;
  return li;
};

const render = () => {
  if (brisca.current_player === null) {
    playerElement.textContent = `Select round winner`;
  } else if (
    brisca.cards.length === 0 &&
    brisca.players[brisca.current_player].hand.length === 0
  ) {
    playerElement.textContent = `End game`;
  } else {
    // console.log(players[current_player].hand);
    playerElement.textContent = `Player ${brisca.current_player}`;
  }
  tablePaleElement.textContent = "";
  tableElement.textContent = "";
  playerHandElement.textContent = "";
  scoresElement.textContent = "";
  if (brisca.cards.length !== 0) {
    const button = document.createElement("button");
    button.classList.add("card");
    button.textContent = brisca.getLastCard();
    tablePaleElement.appendChild(button);
  }
  for (let i = 0; i < brisca.table.length; i++) {
    tableElement.appendChild(renderTableItem(i));
  }
  if (brisca.current_player !== null) {
    for (
      let i = 0;
      i < brisca.players[brisca.current_player].hand.length;
      i++
    ) {
      playerHandElement.appendChild(renderHandItem(i));
    }
  }
  for (let i = 0; i < brisca.max_players; i++) {
    scoresElement.appendChild(renderScoreItem(i));
  }
};

const onCardSelection = (event) => {
  const button = event.currentTarget;
  const index = Number(button.getAttribute("x-data-index"));
  //Modifico el modelo
  brisca.throwCardOnTheTable(index);
  //Reparto nuevas cartas
  brisca.giveNewCards(index);
  brisca.changePlayer();
  //Pintar el modelo
  render();
};

const onRoundWinner = (event) => {
  if (brisca.current_player !== null) return;
  const button = event.currentTarget;
  const index = Number(button.getAttribute("x-data-index"));
  //Modifico el modelo
  brisca.scores[index] += brisca.getRoundPoints();
  brisca.start_player = index;
  brisca.current_player = index;
  brisca.initializeTable();
  //Pintar el modelo
  render();
};

brisca.initializeTable();
render();
