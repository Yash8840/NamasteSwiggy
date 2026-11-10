import React, { useEffect, useState } from "react";
import AccItem from './AccItem'

const ResCategory = (props) => {
  // const [showItems, setShowItems] = useState(false)
  console.log("ResCategory props:", props);

  const handleClick = ()=>{
    // setShowItems(!showItems);
    props.setShowIndex();
  }
  
  return (
    <li className="border-b-8 border-gray-200">
          {/* Accordion Header */}
          <div
            className="flex justify-between items-center py-5 cursor-pointer" onClick = {handleClick}
          >
            <h3 className="font-bold text-lg">
              {props.data.card.card.title}({props.data.card.card.itemCards.length})
            </h3>

            <span className="text-xl">
              {props.showItem ? "^" : "v"}
            </span>
          </div>
           {/* Accordion Body */}
           {props.showItem && <AccItem data={props.data.card.card.itemCards} />}
        </li>
  )
}

export default ResCategory