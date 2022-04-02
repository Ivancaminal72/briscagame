export class Card {
  constructor(number, pale) {
    this._number = number;
    this._pale = pale;
  }
  get number() {
    return this._number;
  }
  get pale() {
    return this._pale;
  }
}

export function dealThreeCards(cards) {
  let hand = [];
  hand.push(cards[0]);
  hand.push(cards[1]);
  hand.push(cards[2]);
  cards.shift();
  cards.shift();
  cards.shift();
  return hand;
}
