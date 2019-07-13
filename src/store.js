import { createContext, useContext } from 'react'
import { decorate, observable, action } from 'mobx'
import { generateShips, getXY, getRandom, sleep } from './utils'

export class Board {
  constructor({color, opponent, ships}) {
    this.color = color
    this.opponent = opponent
    this.ships = ships
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
    this.setShips(false)
  }

  reset() {
    this.boxes.forEach(row => {
      row.forEach(box => {
        box.ship = false
        box.shot = false
      })
    })
    this.setShips()
  }

  isShipDown(ship) {
    for (let mast of ship) {
      const [x, y] = getXY(mast)
      if(!this.boxes[x][y].shot) return false
    }
    return true
  }

  shoot(x, y) {
    let won = true
    this.boxes[x][y].shot = true
    for (let ship of this.ships) {
      if(this.isShipDown(ship)) {
        this.shipDown(ship)
      } else {
        won = false
      }
    }
    return [this.boxes[x][y].ship, won]
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

  setShips(generate = true) {
    if(generate) this.ships = generateShips()
    // eslint-disable-next-line no-console
    console.log(`%c Board: ${this.color} `, `color: white; background-color: ${this.color}`)
    // eslint-disable-next-line no-console
    console.log(this.ships.map(m => m.join('-')).join('\n'))
    for (const ship of this.ships) {
      for (const mast of ship) {
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
  isShipDown: action.bound,
  opponent: observable,
})

export class AI {
  constructor(board, fire) {
    this.board = board
    this.fire = fire
    this.last = undefined
    this.masts = []
  }

  reset() {
    this.last = undefined
    this.masts = []
  }

  maxMin(xy) {
    var maxMin = {}
    maxMin.max = this.masts[0][xy]
    maxMin.min = this.masts[0][xy]
    for (var i = 1; i < this.masts.length; i++) {
      if (this.masts[i][xy] > maxMin.max) maxMin.max = this.masts[i][xy]
      if (this.masts[i][xy] < maxMin.min) maxMin.min = this.masts[i][xy]
    }
    return maxMin
  }

  around(i, j) {
    if(this.masts.length < 2) {
      const x = getRandom(1, 5)
      switch (x) {
      case 1: if(i-1>=0 && !this.board.boxes[i-1][j].shot) return [i-1,j] 
      // eslint-disable-next-line no-fallthrough
      case 2: if(i+1<10 && !this.board.boxes[i+1][j].shot) return [i+1,j] 
      // eslint-disable-next-line no-fallthrough
      case 3: if(j-1>=0 && !this.board.boxes[i][j-1].shot) return [i,j-1] 
      // eslint-disable-next-line no-fallthrough
      case 4: if(j+1<10 && !this.board.boxes[i][j+1].shot) return [i,j+1] 
      // eslint-disable-next-line no-fallthrough
      default: {
        if(i-1>=0 && !this.board.boxes[i-1][j].shot) return [i-1,j]
        if(i+1<10 && !this.board.boxes[i+1][j].shot) return [i+1,j]
        if(j-1>=0 && !this.board.boxes[i][j-1].shot) return [i,j-1]
        return this.selectRandom()
      }
      }
    } else {
      if (this.masts[0][0] === this.masts[1][0]) {
        let x = this.masts[0][0]
        let y = this.maxMin(1)
        if(y.min-1>=0 && !this.board.boxes[x][y.min-1].shot) return [x,y.min-1]
        if(y.max+1<10 && !this.board.boxes[x][y.max+1].shot) return [x,y.max+1]
        this.last = undefined
        this.masts = []
        return this.selectRandom()
      } else {
        let x = this.maxMin(0)
        let y = this.masts[0][1]
        if(x.min-1>=0 && !this.board.boxes[x.min-1][y].shot) return [x.min-1,y]
        if(x.max+1<10 && !this.board.boxes[x.max+1][y].shot) return [x.max+1,y]
        this.last = undefined
        this.masts = []
        return this.selectRandom()
      }
    }
  }

  selectRandom() {
    const [x, y] = [getRandom(0, 10), getRandom(0, 10)]
    if(this.board.getBox(x, y).shot) return this.selectRandom()
    return [x, y]
  }

  async play() {
    await sleep(500)
    let x, y
    if(!this.last)
      [x, y] = this.selectRandom()
    else
      [x, y] = this.around(this.last[0], this.last[1])
    const result = this.fire(this.board.getBox(x,y))

    if(result) {
      this.last = []
      this.last[0] = x
      this.last[1] = y
      this.masts.push(this.last)
      this.play()
    }
  }
}

export class Store {
  constructor() {
    this.activePlayer = true
    this.gameOver = true
    this.playerRed = new Board({ color: 'red', opponent: true, ships: [
      ['B2','B3','B4','C2','D2','E2','E3','E4','F4','G4','H4','I4','I3','I2'],
      ['B6','C6','D6','E6','F6','G6','H6','I6','E7','B8','C8','D8','E8','F8','G8','H8','I8'],
      ['B10','C10','D10','E10','F10','G10','H10','I10']
    ]})
    this.playerGreen = new Board({ color: 'green', opponent: false, ships: [
      ['B1','C1','D1','E1','F1','G1','H1','I1'],
      ['B3','C3','D3','E3','F3','G3','H3','I3','B4','B5','C5','D5','E5','E4'],
      ['B7','B8','B9','C7','D7','E7','E8','E9','F9','G9','H9','I9','I8','I7']
    ]})
    this.ai = new AI(this.playerRed, this.fire)
  }

  changePlayer() {
    this.activePlayer = !this.activePlayer
    if(!this.activePlayer) this.ai.play()
  }

  fire(box) {
    const [result, won] = box.shoot()
    if(won) {
      this.gameOver = true
      return false
    } else {
      if(!result) {this.changePlayer(); return false}
      else return true
    }
  }

  newGame() {
    // eslint-disable-next-line no-console
    console.clear()
    this.activePlayer = true
    this.gameOver = false
    this.playerRed.reset()
    this.playerGreen.reset()
    this.playerGreen.opponent = false
    this.ai.reset()
  }
}

decorate(Store, {
  fire: action.bound,
  changePlayer: action.bound,
  activePlayer: observable,
  gameOver: observable,
  newGame: action.bound,
})

const store = createContext(new Store())

export function useStore() {
  return useContext(store)
}
