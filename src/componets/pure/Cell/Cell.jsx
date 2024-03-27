import './Cell.css'

const Cell = ( { value, index, updateTable } ) => {
  
  const handleOnClick = () => {
    updateTable( index )
  }

  return (
    <div className='cell-container' onClick={ handleOnClick }>{ value }</div>
  )
}

export default Cell