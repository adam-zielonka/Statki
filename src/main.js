import { useStore } from "./store";
import { cx } from "./utils";
import { Board } from "./components/board";

const { playerGreen, playerRed, newGame, register } = useStore();

document.getElementById("boards").append(Board(playerRed));
document.getElementById("boards").append(Board(playerGreen));

document.getElementById("newGame").addEventListener("click", newGame);

function update() {
  document.getElementById("ai").className = cx({active: !useStore().activePlayer});
  document.getElementById("pl").className = cx({active: useStore().activePlayer});
}
update();
register.push(update);
