import React from 'react'

function Editor({item, changeText, changeTitle}) {
  return (
    <div className='editor'>
      <input className='title' value={item.title} onChange={changeTitle}>

      </input>

      <div className='editor-textarea'>
        <textarea className='content' value={item.text} onChange={changeText}></textarea>
      </div>
    </div>
  )
}

export default Editor