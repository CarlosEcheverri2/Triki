import { useState } from 'react'
import Cell from '../../pure/Cell/Cell'
import './Board.css'
import Modal from '../../pure/Modal/Modal'

const TURN = {
    x:'×',
    o:'o'
}

const WIN_DICTIONARY = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]

const Board = () => {

  const [ cellElements, setCellElements ] = useState( Array(9).fill( null ) )
  const [ turn, setTurn ] = useState( TURN.x )
  const [ winner, setWinner] = useState( null )

  const checkWinner = ( board ) => {
    for( const combo of WIN_DICTIONARY ){
        const [ a,b,c ] = combo
        if(
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]       
        ){
            return board[a]
        }
    }
    return null
  }

  const checkSame = ( board ) => {
    const response = board.filter( x => x === null).length
    if( response === 0){
        return true
    }
    return null
  }
  
  const resetGame = () => {
    setCellElements( Array(9).fill( null ))
    setTurn( TURN.x )
    setWinner( null )
  }

  const updateTable = ( index ) => {
    if( cellElements[ index ] || winner ) return
    
    let newBoard = [...cellElements]
    newBoard[ index ] = turn
    setCellElements( newBoard )
    const resultCheck = checkWinner( newBoard ) 
    if( resultCheck ){
        setWinner( true )
        return
    }

    const resultSame = checkSame( newBoard )
    if( resultSame ){
        setWinner( false )
        return
    }

    const newTurn = turn === TURN.x ? TURN.o : TURN.x
    setTurn( newTurn )
  }

  return (
    <>
        <main className='board-container'>
            <div className='table'>
                {
                    cellElements.map(( cell, index ) => {    
                        return <Cell 
                            key={ index }
                            value={ cell }
                            updateTable={ updateTable }
                            index={ index }
                        />            
                    })
                }
            </div>
            <p>
                Turn: <span>{ turn }</span>
            </p>
        </main>
        {   winner !== null &&
            <Modal
                message = { 
                    winner 
                    ? `Felicitaciones <br> el ganador es ${ winner }`
                    : "La partida culmino en empate" 
                }
                resetGame = { resetGame }
            />
        }
    </>
  )
}

export default Board