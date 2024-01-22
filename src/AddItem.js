import React from 'react'
import {FaPlus} from 'react-icons/fa'
const AddItem =({newdata,setNewdata,handlesubmit})=>{
    return(
        <form className = 'addForm'>
            {/* <lable forhtml='addItem'>Add Item</lable> */}
            <input
            id='addItem'
            autoFocus
            required
            placeholder='Add Item'
            type='text'
            value={newdata}
            onChange={(e)=>setNewdata(e.target.value)}
            />
            <button
            type="submit"
            onClick = {(e)=>handlesubmit(e)}
            >
                <FaPlus/>
            </button>
        </form>
    )
}
export default AddItem