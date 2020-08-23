const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const pokemons = require('./mock-pokemon.js');
const { success } = require('./helper.js');

const app = express()
const port = 3000

app
.use(favicon(__dirname + '/favicon.ico'))
.use(morgan('dev'))
.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello, Express! 👋'))

app.get('/api/pokemons', (req, res) => {
  const message = 'La liste des pokémons a bien été récupérée.'
  res.json(success(message, pokemons))
})

app.get('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(pokemon => pokemon.id === id)
  const message = 'Un pokémon a bien été trouvé.'
  res.json(success(message, pokemon))
})

app.post('/api/pokemons', (req, res) => {
  // Récupérer les données du pokémons de la requête HTTP
  let pokemon = req.body;
  // Attribution identifiant unique
  const id = pokemons.length + 1 
  pokemon = { ...pokemon, id: id};
  // Ajout à la liste des pokémons
  pokemons.push(pokemon);
  
  const message = `Le pokémon ${pokemon.name} a bien été crée.`
  res.json(success(message, pokemon))
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))