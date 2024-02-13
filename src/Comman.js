import React from "react"
import ItemList from "./ItemList"

const Comman = ({items,Handlecheck,Handlecheck2}) => {
  return (
    <>
        {(items.length)?(
        <ItemList
          items={items}
          Handlecheck={Handlecheck}
          Handlecheck2={Handlecheck2}
        />
        ):
        <p>Your list is empty</p>
    }
    </>
  )
}

export default Comman