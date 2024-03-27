import React from 'react'
import "./Modal.css"

const Modal = ({ resetGame, message}) => {
  return (
    <div className='modal-background'>
        <div className='modal-container'>
          <p>{ message }</p>
          <button onClick={ () => { resetGame() }}>
            Reiniciar
          </button> 
        </div>
    </div>
  )
}

export default Modal