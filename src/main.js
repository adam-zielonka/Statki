import { Board } from "./components/board";
import { game } from "./engine/game";

document.getElementById("boards").append(Board(game.playerRed));
document.getElementById("boards").append(Board(game.playerGreen));

document.getElementById("newGame").addEventListener("click", game.newGame);

function update() {
  document.getElementById("ai").className = !game.activePlayer ? "active" : "";
  document.getElementById("pl").className = game.activePlayer ? "active" : "";
}

update();
game.register.push(update);
