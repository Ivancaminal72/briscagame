import { Card, dealThreeCards } from "./card";
import { Player } from "./player";

export class Brisca {
  constructor(max_players) {
    this._max_players = max_players;
    this._cards = [];
    this._players = [];
    this._table = [];
    this._scores = [];
    this._start_player = 0;
    this._current_player = 0;

    const PALES = ["basto", "espasa", "oro", "copa"];

    //Build cards
    for (let pale of PALES) {
      for (let i = 1; i <= 12; i++) {
        this._cards.push(new Card(i, pale));
      }
    }
    //Shuffle cards
    this._cards = this._cards.sort(() => Math.random() - 0.5);

    //Create players
    for (let i = 0; i < this._max_players; i++) {
      this._players.push(new Player(dealThreeCards(this._cards)));
    }

    //Create scores
    for (let i = 0; i < this._max_players; i++) {
      this._scores.push(0);
    }
  }

  get cards() {
    return this._cards;
  }

  get table() {
    return this._table;
  }

  get players() {
    return this._players;
  }

  get scores() {
    return this._scores;
  }

  get start_player() {
    return this._start_player;
  }

  get current_player() {
    return this._current_player;
  }

  set start_player(update) {
    this._start_player = update;
  }

  set current_player(update) {
    this._current_player = update;
  }

  get max_players() {
    return this._max_players;
  }

  //Create table
  initializeTable() {
    this._table = [];
    for (let i = 0; i < this._max_players; i++) {
      this._table.push(new Card(0, null));
    }
  }

  getLastCard() {
    return this._cards[this._cards.length - 1].toString();
  }

  getHandItem(index) {
    return this._players[this.current_player].hand[index].toString();
  }

  throwCardOnTheTable(index) {
    this._table[this._current_player] =
      this._players[this._current_player].hand[index];
  }

  giveNewCards(index) {
    this._players[this._current_player].hand.splice(index, 1);
    if (this._cards.length > 0) {
      this._players[this._current_player].hand.push(this._cards[0]);
      this._cards.shift();
    }
  }

  changePlayer() {
    this._current_player += 1;
    if (this._current_player === this._max_players) {
      this._current_player = 0;
    }
    if (this._current_player === this._start_player) {
      this._current_player = null;
    }
  }

  getRoundPoints() {
    let round_points = 0;
    for (let i = 0; i < this._max_players; i++) {
      round_points += this._table[i].points;
    }
    return round_points;
  }
}
