import React from 'react'
import cx from 'classnames'
import { numberToChar } from './utils'
import { useStore } from './store'
import { observer } from 'mobx-react-lite'

const Board = observer(({ player }) => {
  const { getBox } = player
  const board = []
  const firstRow = [0,1,2,3,4,5,6,7,8,9,10].map(i => <Box key={'-0'+i} value={i} />)
  board.push(<div key={-1} className='row'>{firstRow}</div>)

  for (let i = 0; i < 10; i++) {
    const row = [0,1,2,3,4,5,6,7,8,9].map(j => <Box key={''+i+j} box={getBox(i,j)} />)
    board.push(<div key={i} className='row'>{[<Box key={i} value={numberToChar(i+1)} />, ...row]}</div>)
  }
  
  return <div className='board'>
    {board}
  </div>
})

const Box = observer(({value, box={ship: false, shot: true}}) => {
  function onClickHandler(){
    if(box) box.shoot()
  }
  
  const classes = {
    black: !box.shot && box.ship, 
  }
  classes[box.color] = box.shot && box.ship

  return <input 
    type='button'
    disabled={box.shot}
    className={cx('box', classes)}
    onClick={onClickHandler}
    value={value ? value : ''}
  />
})

function App() {
  const { playerGreen, playerRed } = useStore()

  return <div className="app">
    <Board player={playerRed} />
    <Board player={playerGreen} />
  </div>
}

export default observer(App)
