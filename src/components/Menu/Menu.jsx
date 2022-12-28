import React, { useContext } from 'react'
import ItemsContext from '../ItemsContext/ItemsContext'

export default function Menu() {

  const itemsContext = useContext(ItemsContext);

  return (
    <div className='menu'>
      <input type='text' className='search' placeholder='search' onChange={itemsContext.handleSearch}/>
      <button className='btn' onClick={itemsContext.handleClick}>Nueva Nota</button>
    </div>
  )
}
