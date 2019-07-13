import React, {useState} from 'react'
import cx from 'classnames'
import { numberToChar } from './utils'

function Board() {
  const board = []
  const firstRow = []
  for (let j = 0; j < 11; j++) firstRow.push(<Box key={'-1'+j} value={j} />)
  board.push(<div key={-1} className='row'>{firstRow}</div>)

  for (let i = 0; i < 10; i++) {
    const row = [<Box key={i} value={numberToChar(i+1)} />]
    for (let j = 0; j < 10; j++) row.push(<Box key={''+i+j} x={i} j={j} />)
    board.push(<div key={i} className='row'>{row}</div>)
  }
  
  return <div className='board'>
    {board}
  </div>
}

function Box({value}) {
  const [state, setState] = useState(0)

  return <input 
    type='button'
    disabled={value !== undefined || state%4 === 3}
    className={cx('box', {red: state%4 === 1, green: state%4 === 2 })}
    onClick={() => setState(state+1)}
    value={value ? value : ''}
  />
}

function App() {
  return <div className="App">
    <Board/>
  </div>
}

export default App
