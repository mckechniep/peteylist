import './App.modules.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import deleteIcon from './assets/trash-3.svg';

const BASE_URL = 'http://localhost:5000/api'; 

function App() {
  const [toDos, setToDos] = useState(null);
  const [toDo, setToDo] = useState('');

  useEffect(() => {
    getToDos();
  }, []);

  const getToDos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/todos`)
      setToDos(res.data);
    } catch (error) {
      console.log(error);
    };
  };

  const handleAddToDo = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/todo/new`, { title: toDo });
    
    if (res.status === 201) {
        setToDos([...toDos, res.data]);
        setToDo('');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  const handleDeleteToDo = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/todo/delete/${id}`);
      if (res.status === 200) {
        setToDos(toDos.filter((toDo) => toDo._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleToDoClick = async (id) => {
    try {
      const res = await axios.patch(`${BASE_URL}/todo/toggleStatus/${id}`);
      if (res.status === 200) {
        setToDos(toDos.map((toDo) => {
          if (toDo._id === id) {
            return { ...toDo, completed: !toDo.completed };
          }
          return toDo;
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="App">
      <div className="toDo-input-container">
        <input
        className="toDo-input-bar"
        value={toDo}
        onChange={(e) => setToDo(e.target.value)}
        placeholder="Add a new to-do"
        />
        <div className="add-button" onClick={handleAddToDo}>
          +
        </div>
        </div>
    <div ClassName="toDo-list-container">
      {!toDos || !toDos.length ? (
        <h3 style={{ textAlign: 'center' }}>No ToDo's!</h3>
      ) : (
        toDos.map((toDo) => (
          <div className="toDo-item" key={toDo._id}>
            <div
            onClick={() => handleToDoClick(toDo._id)}
            className={toDo.complete ? "complete" : ""}
            id="todo-title"
          >
            {toDo.title}
          </div>
          <div
          className="delete"
          onClick={() => handleDeleteToDo(toDo._id)}
          >
          <img src={deleteIcon} alt="delete" height="20px" width="20px"/>
          </div>
        </div>
        ))
      )}
    </div>
    </div>
  );
}

export default App;
