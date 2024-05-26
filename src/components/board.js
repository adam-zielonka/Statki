import { numberToChar } from "../utils";
import { Box } from "./box";
import { Row } from "./row";

export function Board(player) {
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
