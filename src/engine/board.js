import { generateShips, getXY, printBoardInConsole } from "../utils";

export class Board {
  constructor({color, opponent, ships}) {  
    this.color = color;
    this.opponent = opponent;
    this.ships = ships;
    this.boxes = [];
    for (let i = 0; i < 10; i++) {
      this.boxes[i] = [];
      for (let j = 0; j < 10; j++)
        this.boxes[i][j] = {
          ship: false,
          shot: false,
          color: color,
          shoot: () => this.shoot(i, j)
        };
    }
    this.setShips(false);
  }
  
  reset = () => {
    this.boxes.forEach(row => {
      row.forEach(box => {
        box.ship = false;
        box.shot = false;
      });
    });
    this.setShips();
  };
  
  isShipDown = (ship) => {
    for (let mast of ship) {
      const [x, y] = getXY(mast);
      if(!this.boxes[x][y].shot) return false;
    }
    return true;
  };
  
  shoot = (x, y) => {
    let won = true;
    this.boxes[x][y].shot = true;
    for (let ship of this.ships) {
      if(this.isShipDown(ship)) {
        this.shipDown(ship);
      } else {
        won = false;
      }
    }
    return [this.boxes[x][y].ship, won];
  };
  
  shipDown = (ship) => {
    for (let mast of ship) {
      const [x, y] = getXY(mast);
      this.setMishits(x, y);
    }
  };
  
  setMishits = (i, j) => {
    if(i-1>=0 && j-1>=0) 
      this.boxes[i-1][j-1].shot = true;
    if(i-1>=0) 
      this.boxes[i-1][j].shot = true;
    if(i-1>=0 && j+1<10) 
      this.boxes[i-1][j+1].shot = true;
    if(j+1<10) 
      this.boxes[i][j+1].shot = true;
    if(j-1>=0) 
      this.boxes[i][j-1].shot = true;
    if(i+1<10 && j+1<10) 
      this.boxes[i+1][j+1].shot = true;
    if(i+1<10 && j-1>=0) 
      this.boxes[i+1][j-1].shot = true;
    if(i+1<10) 
      this.boxes[i+1][j].shot = true;
  };
  
  getBox = (x, y) => {
    return this.boxes[x][y];
  };
  
  setShips = (generate = true) => {
    if(generate) this.ships = generateShips();
    for (const ship of this.ships) {
      for (const mast of ship) {
        const [x, y] = getXY(mast);
        this.boxes[x][y].ship = true;
      }
    }
    printBoardInConsole(this.boxes, this.color);
  };
}
