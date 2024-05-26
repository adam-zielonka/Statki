import { AI } from "./engine/ai";
import { Board } from "./engine/board";

function bind(methods, object) {
  methods.forEach(method => object[method] = object[method].bind(object));
}

export class Store {
  constructor() {
    bind(["fire", "changePlayer", "newGame"], this);

    this.activePlayer = true;
    this.gameOver = true;
    this.playerRed = new Board({ color: "red", opponent: true, ships: [
      ["B2","B3","B4","C2","D2","E2","E3","E4","F4","G4","H4","I4","I3","I2"],
      ["B6","C6","D6","E6","F6","G6","H6","I6","E7","B8","C8","D8","E8","F8","G8","H8","I8"],
      ["B10","C10","D10","E10","F10","G10","H10","I10"]
    ]});
    this.playerGreen = new Board({ color: "green", opponent: false, ships: [
      ["B1","C1","D1","E1","F1","G1","H1","I1"],
      ["B3","C3","D3","E3","F3","G3","H3","I3","B4","B5","C5","D5","E5","E4"],
      ["B7","B8","B9","C7","D7","E7","E8","E9","F9","G9","H9","I9","I8","I7"]
    ]});
    this.ai = new AI(this.playerRed, this.fire);
    this.register = [];
  }

  update() {
    this.register.forEach(u => u());
  }

  changePlayer() {
    this.update();
    this.activePlayer = !this.activePlayer;
    if (!this.activePlayer) this.ai.play();
    this.update();
  }

  fire(box) {
    const [result, won] = box.shoot();
    this.update();
    if (won) {
      this.gameOver = true;
      this.update();
      return false;
    } else {
      if (!result) {this.changePlayer(); return false;}
      else return true;
    }
  }

  newGame() {
    // eslint-disable-next-line no-console
    console.clear();
    this.activePlayer = true;
    this.gameOver = false;
    this.playerRed.reset();
    this.playerGreen.reset();
    this.playerGreen.opponent = false;
    this.ai.reset();
    this.update();
  }
}

const store = new Store();

export function useStore() {
  return store;
}
