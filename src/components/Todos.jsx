import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react'


const Todos = () => {
const [newTodo , setNewTodo] = useState("");
const [todos,setTodos] = useState([]);
const [page,setPage] = useState(1);



const saveInfo = () => {

fetch("http://localhost:8080/todos", {
method:"POST",
headers: {
"content-type":"application/json",
},
body: JSON.stringify({
text : newTodo,
isCompleted:false,
}),
})
.then((r) => r.json())
.then((d) =>{
  setTodos([...todos,d]);
  setNewTodo("");
});

};

useEffect(() => {
  fetch(`http://localhost:8080/todos?_page=${page}&_limit=3`)
  .then((r) => r.json())
  .then((d) => {

    setTodos(d);
  });
},[page]);




  return (
    <div>
      Todos
    
      <div>
        <input 
        value={newTodo}
        onChange={({ target}) => setNewTodo(target.value)}
        />
        <button onClick={saveInfo}>Save</button>
      </div>  
      {todos.map((todo) =>(
        <div key={todo.id}>{todo.text}
        
        </div>
      ))}
     <button onClick={()=>{setPage(page-1)}}>Prev</button>
     <button onClick={()=>{setPage(page+1)}}>Next</button>
     
      </div>
      
  )
}

export default Todos