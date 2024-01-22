import { FaTrashAlt } from 'react-icons/fa';
import React from 'react'
const LineItem =({item,handlechange,handledelete})=>{
    return(
       <li className="item" >
            <input
              type="checkbox"
              onChange={() => handlechange(item.id)}
              checked={item.checked}
            />
            <label>{item.item}</label>
            <FaTrashAlt role="button" onClick={()=>handledelete(item.id)} tabIndex="0" />
          </li>
    )
}
export default LineItem;