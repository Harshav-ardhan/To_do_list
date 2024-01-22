import React, { useState,useEffect } from 'react';
import Content from "./Content.js";
import Header from "./Header";
import Footer from "./Footer";
import AddItem from "./AddItem";
import SearchInput from './SearchInput.js';
import apiRequest from './apiResquest.js';


function App() {
  const API_URL ='http://localhost:3500/items';
  const [items, setItems] = useState([] );
  const [search,setSearch]=useState("");
  const [fetchError, setFetchError]=useState(null);
  const [newdata, setNewdata] = useState('');
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if(!response.ok) throw Error("data not received");
        //console.log(response)
        const data = await response.json();
        //console.log(data)
        setItems(data);
        setFetchError(null);
      } catch (error) {
        //console.error('Error fetching data:', error);
        setFetchError(error.message)
      }
      finally{
        setIsLoading(false);
      }
    };
    setTimeout(()=>{
      (async()=>{ await fetchData()})()
     },2000)
  }, []);
 
  
  const handlechange = async(id) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(newItems);
    const myitem = newItems.filter((item)=>
      id===item.id
    )
    const updateoptions ={
      method :"PATCH",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({checked:myitem[0].checked})
    }
    const requrl =`${API_URL}/${id}`
    const result = await apiRequest(requrl,updateoptions);
    if(result)setFetchError(result);
  };

const handledelete =async (id)=>{
  const newItems = items.filter((item)=>
  id!==item.id);
  setItems(newItems);
  const deleteoptions={method:'DELETE'}
  const requrl = `${API_URL}/${id}`
  const result =await apiRequest(requrl,deleteoptions);
  if(result) setFetchError(result);
}

const handlesubmit =async(e)=>{
  e.preventDefault()
  setNewdata('')
  if(newdata===''){
    return
  }
  const temp ={id:(items.length)?items[items.length-1].id +1:1,checked:false,item:newdata}
  const t = [...items,temp]
  setItems(t)
  const postoptions ={
    method :"POST",
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify(temp)
  }
  const result = await apiRequest(API_URL,postoptions);
  if(result) setFetchError(result);
  
}
const filteredItems = items.filter((item) =>
item.item.toLowerCase().includes(search.toLowerCase())
);
  return (
    <div className = "App">
    <Header/>
    <AddItem
    newdata = {newdata}
    setNewdata ={setNewdata}
    handlesubmit={handlesubmit}
    />
    <SearchInput
    seach ={search}
    setSearch={setSearch}
    />
    <main>
      {isLoading && <p>Data is loading..</p>}
      {fetchError && <p>{`error ${fetchError}`}</p>}
    {!isLoading && !fetchError &&<Content
    items ={filteredItems}
    handlechange={handlechange}
    handledelete ={handledelete} 
    />}
    </main>
    <Footer
    length={items.length}
    />
    </div>
  );
}

export default App
