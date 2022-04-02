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

  get points() {
    switch (this._number) {
      case 1:
        return 11;
        break;
      case 3:
        return 10;
        break;
      case 12:
        return 4;
        break;
      case 11:
        return 3;
        break;
      case 10:
        return 2;
        break;
      default:
        return 0;
    }
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
