import { numberToChar } from './utils'
import { useStore } from './store'
import { cx } from './utils'

function Box({ value, opponent, box={ship: false, shot: true} }) {
  const { fire, register } = useStore()
  const input = document.createElement('input')
  function onClickHandler(){
    if(box) fire(box)
  }
  input.addEventListener('click', onClickHandler)

  const update = () => {
    const { activePlayer, gameOver } = useStore()
    const isActive = opponent === !activePlayer
    const classes = {
      black: (opponent || gameOver) && !box.shot && box.ship, 
      orange: value && isActive,
      lightblue: box.shot && !box.ship,
    }
    classes[box.color] = box.shot && box.ship
  
    input.setAttribute('type', 'button')
    input.setAttribute('class', cx('box', classes))
    input.setAttribute('value', value || '')
    if(box.shot || !isActive || gameOver || opponent) input.setAttribute('disabled', 'true')
    else input.removeAttribute('disabled')
  }
  register.push(update)
  update()
  return input
}

function Row(boxes) {
  const row = document.createElement('div')
  row.setAttribute('class','row')
  row.append(...boxes)
  return row
}

function Board(player) {
  const { getBox, opponent } = player

  const board = document.createElement('div')
  board.setAttribute('class', 'board')

  const firstRow = [0,1,2,3,4,5,6,7,8,9,10]
    .map(value => Box({ value, opponent }))
  board.append(Row(firstRow))

  for (let i = 0; i < 10; i++) {
    const row = [0,1,2,3,4,5,6,7,8,9]
      .map(j => Box({ box: getBox(i,j), opponent }))
    board.append(Row([Box({ value: numberToChar(i+1), opponent }), ...row]))
  }

  return board
}

const { playerGreen, playerRed, newGame, register } = useStore()

document.getElementById('boards').append(Board(playerRed))
document.getElementById('boards').append(Board(playerGreen))

document.getElementById('newGame').addEventListener('click', newGame)

function update() {
  document.getElementById('ai').setAttribute('class', cx({active: !useStore().activePlayer}))
  document.getElementById('pl').setAttribute('class', cx({active: useStore().activePlayer}))
}
update()
register.push(update)
