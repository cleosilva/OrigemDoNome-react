import React from "react";
import {BsSearch} from 'react-icons/bs'
import "./style.css";

export default function App() {
  const [input, setInput] = React.useState('');

  return (
    <div className="area-search">
      <h1 className="title mt-4">Origin of Name</h1>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Digite seu nome" value={input} onChange={(event) => setInput(event.target.value)}   />
        <button type="button" className="buttonSearch btn btn-light bg-color" data-bs-toggle="tooltip" data-bs-placement="top" title="Pesquisar">
            <BsSearch size={25} color="FFF" />
          </button>
      </div>
    </div>
  );
}
