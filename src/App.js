import Header from './Header';
import AddItem from './AddItem';
import Footer from './Footer';
import { useState, useEffect} from 'react';
import Comman from './Comman';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

function App() {
   const API_URL="http://localhost:3500/items"
   const [items, setItems] = useState([])
   const [newItem, setNewItem] = useState('')
   const [search,setSearch]=useState('')
   const [fetchError,setFetchError]=useState(null)
   const [isLoading,setIsLoading]=useState(true)
   
   
   useEffect( () =>{
    const fetchItems= async ()=>{
      try{
      const response= await fetch(API_URL)
      if(!response.ok) throw Error("Data not recived")
      const ListItems= await response.json()
      console.log(ListItems)
      setItems(ListItems)
      setFetchError(null)
      }catch(err){
      setFetchError(err.message)
      }finally{
        setIsLoading(false)
      }
    }
    setTimeout(() => {
      (async () => await fetchItems())()
    }, 2000);
   },[])
   
   
  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems)

    const postOptions={
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(myNewItem)
    }

    const result=await apiRequest(API_URL,postOptions)
    if(result) setFetchError(result)

  }

  const Handlecheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);

    const myItem = items.filter((item )=> item.id === id)
    const UpdateOptions={
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({checked:myItem[0].checked})
    }
    const reqUrl=`${API_URL}/${id}`
    const result=await apiRequest(reqUrl,UpdateOptions)
    if(result) setFetchError(result)

  }

  const Handlecheck2= async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const DeleteOptions={method:"DELETE"}
    const reqUrl=`${API_URL}/${id}`
    const result=await apiRequest(reqUrl,DeleteOptions)
    if(result) setFetchError(result)
  }

  const Handlecheck3 = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  return (
    <div className="App">
      <Header title="My List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        Handlecheck3={Handlecheck3}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
       <main>
        {isLoading && <p>Loding items..</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {!isLoading && !fetchError &&<Comman
        items={items}
        Handlecheck={Handlecheck}
        Handlecheck2={Handlecheck2}
        />}
       </main>
      <Footer  length={items.length}/>
    </div>
  );
}

export default App;