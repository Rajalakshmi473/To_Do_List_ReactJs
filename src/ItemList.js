import React from "react"
import LineItem from "./LineItem";


const ItemList = ({items,Handlecheck,Handlecheck2}) => {
  return (
    <ul>
        {items.map((item)=>(
          <LineItem
          item={item}
          key={item.id}
          Handlecheck={Handlecheck}
          Handlecheck2={Handlecheck2}
          />
        ))}
    </ul>
  )
}

export default ItemList