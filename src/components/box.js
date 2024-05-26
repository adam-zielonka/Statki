import { useStore } from "../store";

export function Box({ value, opponent, box={ship: false, shot: true} }) {
  const { fire, register } = useStore();
  const input = document.createElement("input");
  input.type = "button";
  input.value = value || "";
  input.addEventListener("click", () => box && fire(box));
  
  function update() {
    const { activePlayer, gameOver } = useStore();
    const isActive = opponent === !activePlayer;
    const classes = ["box"];

    if ((opponent || gameOver) && !box.shot && box.ship) classes.push("black");
    if (value && isActive) classes.push("orange");
    if (box.shot && !box.ship) classes.push("lightblue");
    if (box.shot && box.ship) classes.push(box.color);
    
    input.className = classes.join(" ");
    input.disabled = box.shot || !isActive || gameOver || opponent;
  };

  register.push(update);
  update();
  
  return input;
}
