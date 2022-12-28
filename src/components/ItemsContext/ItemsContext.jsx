import React from 'react'

const ItemsContext = React.createContext({
  handleClick: () => {},
  handleSearch: () => {}
})

export default ItemsContext