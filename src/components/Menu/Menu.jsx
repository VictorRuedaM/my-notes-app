import React from 'react'

export default function Menu({handleClick}) {



  return (
    <div className='menu'>
      <input type='text' className='search' placeholder='search'/>
      <button className='btn' onClick={handleClick}>Nueva Nota</button>
    </div>
  )
}
