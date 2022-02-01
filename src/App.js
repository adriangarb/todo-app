//dependencies
import React,{useState,useEffect} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
//style
import './scss/index.scss';
//components
import ActiveComponent from "./components/ActiveComponent";
import CompletedComponent from "./components/CompletedComponent";
import AllComponent from "./components/AllComponent";

function App() {
  const [notes,setNotes] = useState([])
  const [contentNote, setContentNote] = useState('')
  useEffect(()=>{
    const handleLocalTodos = () => {
        if (localStorage.getItem("notes") === null) {
          localStorage.setItem("notes", JSON.stringify([]));
        } else {
          let todoLocal = JSON.parse(localStorage.getItem("notes"));
          setNotes(prevState=>prevState.concat(todoLocal));
        }
      };
    handleLocalTodos()
    },[])
    useEffect(()=>{
      localStorage.setItem('notes', JSON.stringify(notes))
    },[notes])
    function handleAddNote(event){
      event.preventDefault()
      setNotes([...notes, {content: contentNote, done: false}])
      setContentNote('')
    }
    function handleTaskContent(event){
      setContentNote(event.target.value)
    }
    function handleIsDone(event){
      setNotes(notes.map(task=>(task.content === event.target.value ? {...task, done: !task.done} : task)))
    }
    function handleDeleteItem(noteContent){
      let newArr = [...notes]
      const index = newArr.findIndex(element=> element.content===noteContent)
      if(index !== -1){
        newArr.splice(index,1)
        setNotes(newArr)
      }
    }
    function handleDeleteAll(event){
      var newArr = [...notes];
      const index = []
      for(let element of notes){
        if(element.done===true){
          index.push(newArr.indexOf(element))
        }
      }
      setNotes(newArr.filter(item=>!index.includes(newArr.indexOf(item))))
    }

  return(
    <BrowserRouter>
      <div className="App">
          <h1>#todo</h1>
          <div className="App__nav-bar">
            <Link to="/">
              All
            </Link>
            <Link to="/active">
              Active
            </Link>
            <Link to="/completed">
              Completed
            </Link>
          </div>
          <div>
          </div>
        <Routes>
          <Route path="/" element={<AllComponent contentNote={contentNote} handleAddNote={handleAddNote} handleTaskContent={handleTaskContent} handleIsDone={handleIsDone} notes={notes}/>}/>
          <Route path="/active" element={<ActiveComponent contentNote={contentNote} handleAddNote={handleAddNote} handleTaskContent={handleTaskContent} handleIsDone={handleIsDone} notes={notes}/>}/>
          <Route path="/completed" element={<CompletedComponent handleDeleteAll={handleDeleteAll} handleDeleteItem={handleDeleteItem} notes={notes} />}/>
      </Routes>
      </div>
    </BrowserRouter>
  )
 
}

export default App;
