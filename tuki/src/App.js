import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState, useEffect } from "react";

function App() {

  const [newItem, setnewItem] = useState("");
  const [items, setItems] = useState([]);


  useEffect(()=> {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/pablotr', {
      method: "GET",
         /* body: JSON.stringify([]), */
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp, "respuesta"); 
        return resp.json();
    })
    .then(data => {
        console.log(data); 
    })
    .catch(error => {
        console.log(error);
    });
  }, [] )


  
  function addItem() {

    if (!newItem) {
      alert("Escribre tu actividad")
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem
    }
    setItems(oldList => [...oldList, item])
    setnewItem("");
  }

  function deleteItem(id) {

    const newArray = items.filter(item => item.id !== id);
    setItems(newArray)
  }


  return (

    <div className="container-fluid d-flex m-4 justify-content-center" id="muevete">
      <div className="row align-items-center">
        <div className='row'>

          <h2 className='mb-2'>Escribe tu actividad</h2>
          <form onSubmit={ev => {
            ev.preventDefault();
            setnewItem(ev.target.texteo.value)
          }}>

            <input
              type="text"
              placeholder="Escribe pls..."
              value={newItem}
              className="form-control mb-4"
              onChange={e => setnewItem(e.target.value)}
            />

            <button className='btn btn-primary' id='botonsito' onClick={() => addItem()}>Add</button>

            <ul>
              {items.map(item => { return <li key={item.id}> {item.value}  <button className='btn btn-primary' id='deletebtn' onClick={() => deleteItem(item.id)}> x</button> </li> })}
            </ul>

          </form>
        </div>
      </div>
    </div>

  );
}

export default App;