import React from "react";
import {BsSearch} from 'react-icons/bs'
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

  React.useEffect(() => {
    fetch('./contries.json', {
      headers: {
        Accept: 'application/json'
      }
    }).then((response) => response.json())
      .then((response) => setCountries(json))
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
      const name = responseApi.data.country[0].country_id;
      const probability = responseApi.data.country[0].probabilityCountry;
      const flag = `https://countryflagsapi.com/png/${nameCountry.toLowerCase()}`;
      const percent = probability.toFixed(2) * 100;

      setPercentCountry(percent);
      setFlagCountry(flag);
      setProbabilityCountry(probability)

      for (let country of countries.countries) {
        if (name === country.code) {
          setNameCountry(country.name);
        }
      }
      setInput(''); // limpa o input
      
    }catch(err) {
      console.log(err)
      setInput('');
    }
    setValid(0);
  }

  async function openCountries() {
    setValid(data);
    const vetorCountries = [];
    for (let country of data.country) {
      let nameCountry = country.country_id
      for (let country of countries.countries) {
        if (nameCountry === country.code) {
          vetorCountries.push(country.name);
          setNameCountries(vetorCountries);
        }
      }
    }
  } 
  
  return (
    <div className="area-search">
      <h1 className="title mt-4">Origin of Name</h1>
      <div className="input-group mb-3 containerInput">
        <input type="text" className="form-control" placeholder="Digite seu nome" value={input} onChange={(event) => setInput(event.target.value)}   />
        <button type="button" className="buttonSearch btn btn-light bg-color" data-bs-toggle="tooltip" data-bs-placement="top" title="Pesquisar" onClick={handleClick}>
            <BsSearch size={25} color="FFF" />
          </button>
      </div>
      {Object.keys(data) > 0 && (
      <main className='main m-4'>
          <div className="card shadow-lg">
            <h5 className="card-header text-center">{data.name}</h5>
            <div className="card-body p-4">
              <h5 className="card-title">País com maior probablidade de origem: <p className='text-center mt-2 mb-0 text-uppercase text-success'>{nameCountry}</p></h5>
              <div className='mb-4 d-flex justify-content-center'>
                <img src={`${flagCountry}`} width="35" alt="description of image" />
              </div>
              <p className="card-text text-center ">A probabilidade é: <span className='fw-bold'>{probabilityCountry.toFixed(4)}</span> ou <span className='fw-bold'>{percentCountry.toFixed(0)}% </span></p>
              <div className=' d-flex justify-content-center'>
                <button className="btn btn-success px-4 py-2 text-uppercase" data-bs-toggle="tooltip" data-bs-placement="top" title="3 países mais prováveis"
                  onClick={openCountries}>Principais países <BsArrowDown size={20} color="FFF"/></button>
              </div>
            </div>
          </div>
        </main>
    )}
    {Object.keys(valid).length > 0 && ( //verifica se há conteúdo no objeto para ser mostrado
        <div className="card shadow-lg mb-5">
          <h5 className="card-header text-uppercase">Principais Países:</h5>
          <div className="card-body countries gap-5 d-flex">
            <span className='text-center d-block'>
              {nameCountries.map(country => (
                <p className='d-flex text-uppercase '>{country}</p>
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
  );
}
