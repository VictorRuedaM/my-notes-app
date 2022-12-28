import React from 'react'

function Item({item, index, handlePinned, handleSelectNote, actualIndex}) {
  return (
    <div key={item.id} className={(index === actualIndex ? 'note activeNote' : 'note')} onClick={(e) => handleSelectNote(item, e)}>
      <div>
        {item.title === '' ? 'Sin titulo' : item.title.substring(0, 20)}
      </div>
      <div>
        <button className='pinButton' onClick={() => handlePinned(item, index)}>{item.pinned ? 'pinned' : 'pin'}</button>
      </div>
    </div>
  )
}

export default Item