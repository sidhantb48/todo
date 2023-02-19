/* eslint-disable @typescript-eslint/no-unused-vars */
import React,{useState,useEffect} from "react";
import './App.css';
//importing componenets
import Form from "./components/Form";
import todo from "./components/Todo";
import Todolist from "./components/Todolist";

function App() {

//state stuff
  const [inputText,setinputText]=useState("");
  const [todos,setTodos]=useState([]);
  const [status,setStatus]=useState('all');
  const [filteredTodos, setFilteredTodos]=useState([]);

//run once when the app starts
useEffect(()=>{
  getLocalTodo();
},[]);


  //use effect 
useEffect(()=>{
  filterHandler();
  saveLocalTodos();
},[todos,status]);

//functions
const filterHandler=()=>{
  switch(status)
  {
    case "completed":
      setFilteredTodos(todos.filter(todo => todo.completed === true));
      break;
    case "uncompleted":
      console.log(todos)
      setFilteredTodos(todos.filter(todo => todo.completed === false));
      break;
    default: 
      setFilteredTodos(todos); 
      break;
  }
};

//save to local
const saveLocalTodos=()=>{
    localStorage.setItem('todos',JSON.stringify(todos));
  
};

const getLocalTodo=()=>{
  if(localStorage.getItem('todos')===null){
    localStorage.setItem('todos',JSON.stringify([]));
  }else{
   let todoLocal= JSON.parse(localStorage.getItem('todos'));
   setTodos(todoLocal);
  }
}
  return (
    <div className="App">
      <header>
        <h1>Sid's todo list</h1>
        </header>
        <Form
        inputText={inputText}
        todos={todos} 
        setTodos={setTodos} 
        setinputText={setinputText}
        setStatus={setStatus}
        
        />
        <Todolist 
        setTodos={setTodos} 
        todos={todos}
        filteredTodos={filteredTodos}
        />
        
    </div>
  );
};

export default App;
