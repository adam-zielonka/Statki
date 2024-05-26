import { game } from "../engine/game";

export function Box({ value, opponent, box={ship: false, shot: true} }) {
  const input = document.createElement("input");
  input.type = "button";
  input.value = value || "";
  input.addEventListener("click", () => box && game.fire(box));
  
  function update() {
    const isActive = opponent === !game.activePlayer;
    const classes = ["box"];

    if ((opponent || game.gameOver) && !box.shot && box.ship) classes.push("black");
    if (value && isActive) classes.push("orange");
    if (box.shot && !box.ship) classes.push("lightblue");
    if (box.shot && box.ship) classes.push(box.color);
    
    input.className = classes.join(" ");
    input.disabled = box.shot || !isActive || game.gameOver || opponent;
  };

  game.register.push(update);
  update();
  
  return input;
}
