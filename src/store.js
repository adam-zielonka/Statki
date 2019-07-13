import { createContext, useContext } from 'react'
import { decorate, observable, action } from 'mobx'

export class Board {
  constructor() {
    this.boxes = []
    for (let i = 0; i < 10; i++) {
      this.boxes[i] = []
      for (let j = 0; j < 10; j++)
        this.boxes[i][j] = {
          ship: false,
          shot: false
        }
    }
  }

  getBox(x, y) {
    return this.boxes[x][y]
  }
}

decorate(Board, {
  boxes: observable,
  getBox: action.bound,
})


export class Store {
  constructor() {
    this.playerRed = new Board()
    this.playerGreen = new Board()
  }
}

decorate(Store, {
})

const store = createContext(new Store())

export function useStore() {
  return useContext(store)
}
