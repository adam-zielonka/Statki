import { useStore } from "./store";
import { Board } from "./components/board";

const { playerGreen, playerRed, newGame, register } = useStore();

document.getElementById("boards").append(Board(playerRed));
document.getElementById("boards").append(Board(playerGreen));

document.getElementById("newGame").addEventListener("click", newGame);

function update() {
  document.getElementById("ai").className = !useStore().activePlayer ? "active" : "";
  document.getElementById("pl").className = useStore().activePlayer ? "active" : "";
}

update();
register.push(update);
