<h1 align = "center">Origin Of Name</h1>
<h1 align="center">
    <a href="https://reactjs.org/">🔗 React</a>
</h1>

### Requisitos do projeto
Criar aplicação React onde o usuário ao digitar um nome pessoal qualquer em um input de texto, consiga o retorno
formatado no frontend do resultado de maior probabilidade da origem do nome, com o nome por extenso do país
de origem.

### Fontes
<ul>
  <li>https://api.nationalize.io</li>
  <li>https://gist.github.com/almost/7748738#filecountries-json</li>
</ul>

### Finalidade da aplicação
O projeto tem como finalidade buscar o país de origem de um nome retornando aquele com a maior probabilidade. Para o resultado foi utilizado a api [nationalize](https://api.nationalize.io) e um arquivo JSON com a lista dos nomes e código ISO dos países que pode ser acessado neste [link](https://gist.github.com/almost/7748738#filecountries-json). A aplicação também retorna como funcionaidade extra os três países com as maiores probabilidades.

### Requisitos Funcionais
Entrada: Campo de Input onde será digitado o nome.<br>
Processamento: requisição na api utilizando o end point  https://api.nationalize.io/?name={nomeUsuario} e requisição na api utilizando o end point https://countryflagsapi.com/png/${nameOfCountry.toLowerCase()}. A primeira retorna o nome do país e a probabilidade e a segunda retorna a bandeira do país de acordo com o nome obtido na resposta da api nationalize.<br>
Saída: Tratamento no front end com a exibiçao de cards com o resultado do país com a maior probabilidade e sua bandeira. E um card extra com a lista dos três países com a maior probabilidade.

### Lógica e Conceitos
<ul>
    <li>No arquivo App.js: linha 8 até 16 foi usado o encapsulamento de variáveis criando estados</li>
    <li>No arquivo App.js: linha 31 foi criado a função handleSearch responsável pela busca dos dados na api</li>
    <li>No arquivo App.js: linha 36 foi utilizado o try catch, por se tratar de uma requisição poderá haver erros, sendo assim, o catch especifica uma resposta     caso uma exceção seja lançada</li>
    <li>No arquivo App.js: linhas 91 e 109 foi utilizado o operador de comparação && para verificar se há dados a serem retornados, caso seja verdadeiro (true)     é renderizado o card que mostra as informações solicitadas na api, caso falso, o card é oculto.</li>
</ul>


### Dependencias de desenvolvimento
<img src="https://img.shields.io/badge/npm-axios-orange"/> <img src="https://img.shields.io/badge/B-Bootstrap-yellowgreen"/> <img src="https://img.shields.io/badge/bs-react--icons-blue"/>

### Versionamento
Plataforma: Github

### 🎲 Clonando a aplicação

```bash
# Clone este repositório
$ git clone <https://github.com/cleosilva/OrigemDoNome-react>

# Acesse a pasta do projeto no terminal/cmd
$ cd OrigemDoNome-react

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm start

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
