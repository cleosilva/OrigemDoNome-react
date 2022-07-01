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
      .then((response) => setContries(json))
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
  
  return (
    <div className="area-search">
      <h1 className="title mt-4">Origin of Name</h1>
      <div className="input-group mb-3 containerInput">
        <input type="text" className="form-control" placeholder="Digite seu nome" value={input} onChange={(event) => setInput(event.target.value)}   />
        <button type="button" className="buttonSearch btn btn-light bg-color" data-bs-toggle="tooltip" data-bs-placement="top" title="Pesquisar" onClick={handleClick}>
            <BsSearch size={25} color="FFF" />
          </button>
      </div>
    </div>
  );
}
