import { numberToChar } from "./utils";
import { useStore } from "./store";
import { cx } from "./utils";

function Box({ value, opponent, box={ship: false, shot: true}}) {
  const { fire, register } = useStore();
  const input = document.createElement("input");
  input.type = "button";
  input.value = value || "";

  function onClickHandler() {
    if(box) fire(box);
  }
  input.addEventListener("click", onClickHandler);

  function update() {
    const { activePlayer, gameOver } = useStore();
    const isActive = opponent === !activePlayer;
    const classes = {
      black: (opponent || gameOver) && !box.shot && box.ship, 
      orange: value && isActive,
      lightblue: box.shot && !box.ship,
      [box.color]: box.shot && box.ship,
    };
  
    input.className = cx("box", classes);
    input.disabled = !!(box.shot || !isActive || gameOver || opponent);
  };
  register.push(update);
  update();
  return input;
}

function Row(boxes) {
  const row = document.createElement("div");
  row.className = "row";
  row.append(...boxes);
  return row;
}

function Board(player) {
  const { getBox, opponent } = player;

  const board = document.createElement("div");
  board.className = "board";

  const firstRow = [0,1,2,3,4,5,6,7,8,9,10]
    .map(value => Box({ value, opponent }));
  board.append(Row(firstRow));

  for (let i = 0; i < 10; i++) {
    const row = [0,1,2,3,4,5,6,7,8,9]
      .map(j => Box({ box: getBox(i,j), opponent }));
    board.append(Row([Box({ value: numberToChar(i+1), opponent }), ...row]));
  }

  return board;
}

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
