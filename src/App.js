import { useState, useEffect} from "react";
import { getNotes, newNoteAdd,deleteNote } from "./services/notes";
import './App.css';

function App() {
  const [note, setNote] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [reload, setReload] = useState(true)

  useEffect(() => {
    getNotes().then((note) => {
      setReload(false)
      setNote(note);
    });
  }, [reload]);

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const addNote = {
      content: newNote,
      date: new Date()
    };
    newNoteAdd(addNote)
    .then((response) => {
      setNote((prevNote) => prevNote.concat(response));
    });
    setNewNote('')
  };
  
  const handleClick = (id) =>{
    setReload(true)
    deleteNote(id)
    .then(response=>{
      console.log(response)
    })
  }

  return (
    <div>
      <h2>NOTES</h2>
      <ul>
        {note.map((note) => {
          return (
            <div key={note.id}>
              <li>
                <h4>{note.content}</h4>
                <p>{note.date}</p>
                <button onClick={()=>handleClick(note.id)}>delete</button>
              </li>
            </div>
          );
        })}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote}/>
        <button>add</button>
      </form>
    </div>
  );
      };
export default App;
