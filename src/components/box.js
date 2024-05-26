import { useStore } from "../store";
import { cx } from "../utils";

export function Box({ value, opponent, box={ship: false, shot: true}}) {
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
