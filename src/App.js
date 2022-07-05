import React from "react";
import { BsSearch, BsHeart } from 'react-icons/bs'
import api from './services/api';
import Card from './components/Card';
import "./style.css";


export default function App() {

  // encapsulamento de variáveis
  const [input, setInput] = React.useState('');
  const inputElement = React.useRef();

  const [data, setData] = React.useState({});
  const [countryData, setCountryData] = React.useState({})

  const [countries, setCountries] = React.useState([]);
  const [nameCountries, setNameCountries] = React.useState([]);
  const [valid, setValid] = React.useState({});

  React.useEffect(() => {
    fetch('./countries.json', {
      headers: {
        Accept: 'application/json'
      }
    }).then((res) => res.json())
      .then(res => setCountries(res))
  }, []);
  
  // função para buscar o nome
  async function handleSearch() {
    if (input === '') {
      alert('Informe um nome');
      return;
    }
    try {
      const responseApi = await api.get(`?name=${input}`);
      setData(responseApi.data)
      // variáveis dos países com maior probabilidade
      const nameCountryApi = responseApi.data.country[0].country_id;

      for (let country of countries.countries) {
        if (nameCountryApi === country.code) {
          setCountryData({
            nameOfCountry: country.name,
            probability: responseApi.data.country[0].probability.toFixed(2) * 100,
            flag: `https://countryflagsapi.com/png/${nameCountryApi.toLowerCase()}`
          })
        }
      }
      setInput('');
    } catch (err) {
      console.log('err', err)
      setInput('');
    }
    setValid(0);
  }

  // função que lista os três países com maior probabilidade
  async function listCountries() {
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
    inputElement.current.focus(); // mantém o foco no input
  }

  return (
    <div className="area-search">
      <h1 className="title mt-5 mb-3">Origin of Name</h1>
      <div className="input-group containerInput">
        <input ref={inputElement} type="text" className="form-control" placeholder="Digite seu nome" value={input} onChange={({ target }) => setInput(target.value)} />
        <button type="button" className="bg-color buttonSearch" data-bs-toggle="tooltip" data-bs-placement="top" title="Pesquisar" onClick={handleSearch}>
          <BsSearch size={25} color="FFF" />
        </button>
      </div>
      <p className="footer text-muted small">Created with <BsHeart /> by Cléo Silva</p>

      <div className="card-group">
        {Object.keys(data).length > 0 && ( // Verifica se há dados para serem mostrados
          <Card
            title={`Nome: ${data.name}`}
            nameCountry={countryData.nameOfCountry}
            probability={countryData.probability.toFixed(0)}
            flagCountry={countryData.flag}
            PressButon={listCountries}
          />
        )}
        {Object.keys(valid).length > 0 && (
          <Card
            typeCard='listCountriesCard'
            title='PAÍSES DE ORIGEM:'
            listNameContries={nameCountries}
            dataCountry={data.country}
          />
        )}
      </div>
    </div>
  );
}

