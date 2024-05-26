import { getRandom, sleep, shuffle } from "../utils";

export class AI {
  constructor(board, fire) {
    this.board = board;
    this.fire = fire;
    this.last = undefined;
    this.masts = [];
  }

  reset = () => {
    this.last = undefined;
    this.masts = [];
  };

  maxMin = (xy) => {
    let maxMin = {};
    maxMin.max = this.masts[0][xy];
    maxMin.min = this.masts[0][xy];
    for (let i = 1; i < this.masts.length; i++) {
      if (this.masts[i][xy] > maxMin.max) maxMin.max = this.masts[i][xy];
      if (this.masts[i][xy] < maxMin.min) maxMin.min = this.masts[i][xy];
    }
    return maxMin;
  };

  around = (i, j) => {
    if (this.masts.length < 2) {
      const boxes = [];
      if (i-1>=0 && !this.board.boxes[i-1][j].shot) boxes.push([i-1,j]);
      if (i+1<10 && !this.board.boxes[i+1][j].shot) boxes.push([i+1,j]);
      if (j-1>=0 && !this.board.boxes[i][j-1].shot) boxes.push([i,j-1]);
      if (j+1<10 && !this.board.boxes[i][j+1].shot) boxes.push([i,j+1]);

      shuffle(boxes);

      if (boxes.length) return boxes[0];
      else return this.selectRandom();

    } else {
      if (this.masts[0][0] === this.masts[1][0]) {
        let [x, y] = [this.masts[0][0], this.maxMin(1)];
        if (y.min-1>=0 && !this.board.boxes[x][y.min-1].shot) return [x,y.min-1];
        if (y.max+1<10 && !this.board.boxes[x][y.max+1].shot) return [x,y.max+1];
      } else {
        let [x, y] = [this.maxMin(0), this.masts[0][1]];
        if (x.min-1>=0 && !this.board.boxes[x.min-1][y].shot) return [x.min-1,y];
        if (x.max+1<10 && !this.board.boxes[x.max+1][y].shot) return [x.max+1,y];
      }
      this.reset();
      return this.selectRandom();
    }
  };

  selectRandom = () => {
    const [x, y] = [getRandom(0, 10), getRandom(0, 10)];
    if (this.board.getBox(x, y).shot) return this.selectRandom();
    return [x, y];
  };

  play = async () => {
    await sleep(500);
    const [x, y] = this.last ? this.around(this.last[0], this.last[1]) : this.selectRandom();
    const result = this.fire(this.board.getBox(x,y));

    if (result) {
      this.last = [];
      this.last[0] = x;
      this.last[1] = y;
      this.masts.push(this.last);
      this.play();
    }
  };
}
