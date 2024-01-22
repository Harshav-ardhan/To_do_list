import React from 'react'
import ItemList from './ItemsList'
const Content =({items,handlechange,handledelete})=>{
  return (
    <>
      {(items.length)?(
      <ItemList
      items = {items}
      handlechange={handlechange}
      handledelete={handledelete}
      />):<p>empty</p>
}
    </>
      
  );
};

export default Content;
