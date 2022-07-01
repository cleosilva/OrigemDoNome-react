import React from "react";
import {BsSearch, BsHeart, BsHandIndex} from 'react-icons/bs'
import api from './services/api';
import "./style.css";

export default function App() {
  const [input, setInput] = React.useState('');
  const [data, setData] = React.useState({});
  const [nameCountry, setNameCountry] = React.useState('');
  const [probabilityCountry, setProbabilityCountry] = React.useState('');
  const [flagCountry, setFlagCountry] = React.useState('');
  const [percentCountry, setPercentCountry] = React.useState('');
  const [countries, setCountries] = React.useState([]);
  const [valid, setValid] = React.useState({});
  const [nameCountries, setNameCountries] = React.useState([]);
  const inputElement = React.useRef();

  React.useEffect(() => {
    fetch('./countries.json', {
      headers: {
        Accept: 'application/json'
      }
    }).then((res) => res.json())
      .then(res => setCountries(res))
      
  });

  // Função para buscar os nomes
  async function handleClick() {
    if (input === '') {
      alert('Informe um nome');
      return;
    }
    try {
      const responseApi = await api.get(`?name=${input}`);
      setData(responseApi.data)
      // variáveis dos países com maior probabilidade
      const nameOfCountry = responseApi.data.country[0].country_id;
      const probability = responseApi.data.country[0].probability;
      const flag = `https://countryflagsapi.com/png/${nameOfCountry.toLowerCase()}`;
      const percent = probability.toFixed(2) * 100;

      setPercentCountry(percent);
      setFlagCountry(flag);
      setProbabilityCountry(probability)

      for (let country of countries.countries) {
        if (nameOfCountry === country.code) {
          setNameCountry(country.name);
        }
      }
      setInput(''); // limpa o input
      
    }catch(err) {
      console.log('err',err)
      setInput('');
    }
    setValid(0);
  }
  
  async function openCountries() {
    setValid(data);
    const vetorCountries = [];
    for (let country of data.country) {
      let nameOfCountry = country.country_id
      for (let country of countries.countries) {
        if (nameOfCountry === country.code) {
          vetorCountries.push(country.name);
          setNameCountries(vetorCountries);
        }
      }
    }
    inputElement.current.focus();
  } 
  
  return (
    <div className="area-search">
      <h1 className="title mt-4">Origin of Name</h1>
      <div className="input-group mb-3 containerInput">
        <input ref={inputElement} type="text" className="form-control" placeholder="Digite seu nome" value={input} onChange={(event) => setInput(event.target.value)}   />
        <button type="button" className="buttonSearch btn btn-light bg-color" data-bs-toggle="tooltip" data-bs-placement="top" title="Pesquisar" onClick={handleClick}>
            <BsSearch size={25} color="FFF" />
        </button>
      </div>
        <p className="footer text-muted">Created with <BsHeart/> by Cléo Silva</p>
      
      <div class="card-group">
      {Object.keys(data).length > 0 && (
      <main className='main m-4'>
          <div className="card shadow-lg">
            <h5 className="card-header text-center bg-header">Nome: {data.name}</h5>
            <div className="card-body p-4">
              <h5 className="card-title">País com maior probablidade de origem: <p className='text-center mt-2 mb-0 text-uppercase text-success'>{nameCountry}</p></h5>
              <div className='mb-4 d-flex justify-content-center'>
                <img src={`${flagCountry}`} width="35" alt="description of image" />
              </div>
              <p className="card-text text-center ">A probabilidade é: <span className='fw-bold'>{probabilityCountry.toFixed(4)}</span> ou <span className='fw-bold'>{percentCountry.toFixed(0)}% </span></p>
              <div className=' d-flex justify-content-center'>
                <button className="btn bg-color px-4 py-2 text-uppercase text-light" data-bs-toggle="tooltip" data-bs-placement="top" title="3 países mais prováveis"
                  onClick={openCountries}><BsHandIndex size={20} color="FFF"/> Outros países</button>
              </div>
            </div>
          </div>
        </main>
    )}
    {Object.keys(valid).length > 0 && ( //verifica se há conteúdo no objeto para ser mostrado
        <div className="card shadow-lg m-4">
          <h5 className="card-header text-uppercase bg-header">Principais Países:</h5>
          <div className="card-body countries gap-5 d-flex">
            <span className='text-center d-block'>
              {nameCountries.map(country => (
                <p className='d-flex text-uppercase' key={country}>{country}</p>
              ))}
            </span>
            <span className='text-center d-block'>
              {data.country.map(e => (
                <p className="card-text mx-auto">{e.probability.toFixed(4)} | {(e.probability.toFixed(2) * 100).toFixed(0)}% </p>
              ))}
            </span>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
