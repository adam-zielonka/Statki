import React from 'react'
import cx from 'classnames'
import { numberToChar } from './utils'
import { useStore } from './store'
import { observer } from 'mobx-react-lite'

const Board = observer(({ player }) => {
  const { getBox, opponent } = player
  const board = []
  const firstRow = [0,1,2,3,4,5,6,7,8,9,10].map(i => <Box key={'-0'+i} value={i} opponent={opponent} />)
  board.push(<div key={-1} className='row'>{firstRow}</div>)

  for (let i = 0; i < 10; i++) {
    const row = [0,1,2,3,4,5,6,7,8,9].map(j => <Box key={''+i+j} box={getBox(i,j)} opponent={opponent} />)
    board.push(<div key={i} className='row'>{[<Box key={i} value={numberToChar(i+1)} opponent={opponent} />, ...row]}</div>)
  }
  
  return <div className='board'>
    {board}
  </div>
})

const Box = observer(({value, opponent, box={ship: false, shot: true}}) => {
  const { fire, activePlayer, gameOver } = useStore()
  function onClickHandler(){
    if(box) fire(box)
  }

  const isActive = opponent === !activePlayer
    
  const classes = {
    black: (opponent || gameOver) && !box.shot && box.ship, 
    orange: value && isActive,
    lightblue: box.shot && !box.ship,
  }
  classes[box.color] = box.shot && box.ship

  return <input 
    type='button'
    disabled={box.shot || !isActive || gameOver || opponent}
    className={cx('box', classes)}
    onClick={onClickHandler}
    value={value ? value : ''}
  />
})

function App() {
  const { playerGreen, playerRed, newGame, activePlayer } = useStore()

  return <div className="app">
    <div className='label'>
      <span className={cx({active: !activePlayer})}>COMPUTER</span>
      <input type='button' onClick={newGame} value='New Game' />
      <span className={cx({active: activePlayer})}>PLAYER</span>
    </div>
    <div className="boards">
      <Board player={playerRed} />
      <Board player={playerGreen} />
    </div>
  </div>
}

export default observer(App)
