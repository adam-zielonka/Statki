import { createContext, useContext } from 'react'
import { decorate, observable, action } from 'mobx'
import { generateShips, getXY } from './utils'

export class Board {
  constructor(color) {
    this.color = color
    this.ships = []
    this.boxes = []
    for (let i = 0; i < 10; i++) {
      this.boxes[i] = []
      for (let j = 0; j < 10; j++)
        this.boxes[i][j] = {
          ship: false,
          shot: false,
          color: color,
          shoot: () => this.shoot(i, j)
        }
    }
    this.setShips()
  }

  shoot(x, y) {
    this.boxes[x][y].shot = true
    for (let ship of this.ships) {
      let isShipDown = true
      for (let mast of ship) {
        const [x, y] = getXY(mast)
        if(!this.boxes[x][y].shot) isShipDown = false
      }
      if(isShipDown) {
        this.shipDown(ship)
      }
    }
  }

  shipDown(ship) {
    for (let mast of ship) {
      const [x, y] = getXY(mast)
      this.setMishits(x, y)
    }
  }

  setMishits(i, j){
    if(i-1>=0 && j-1>=0) this.boxes[i-1][j-1].shot = true
    if(i-1>=0) this.boxes[i-1][j].shot = true
    if(i-1>=0 && j+1<10) this.boxes[i-1][j+1].shot = true
    if(j+1<10) this.boxes[i][j+1].shot = true
    if(j-1>=0) this.boxes[i][j-1].shot = true
    if(i+1<10 && j+1<10) this.boxes[i+1][j+1].shot = true
    if(i+1<10 && j-1>=0) this.boxes[i+1][j-1].shot = true
    if(i+1<10) this.boxes[i+1][j].shot = true
  }

  getBox(x, y) {
    return this.boxes[x][y]
  }

  setShips() {
    this.ships = generateShips()
    for (var ship of this.ships) {
      for (var mast of ship) {
        const [x, y] = getXY(mast)
        this.boxes[x][y].ship = true
      }
    }
  }
}

decorate(Board, {
  boxes: observable,
  getBox: action.bound,
  setShips: action.bound,
  shoot: action.bound,
  setMishits: action.bound,
})

export class Store {
  constructor() {
    this.playerRed = new Board('red')
    this.playerGreen = new Board('green')
  }
}

decorate(Store, {
})

const store = createContext(new Store())

export function useStore() {
  return useContext(store)
}
