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
  let pokemon = req.body;
  const id = pokemons.length + 1 
  pokemon = { ...pokemon, id: id};
  pokemons.push(pokemon);
  const message = `Le pokémon ${pokemon.name} a bien été crée.`
  res.json(success(message, pokemon))
})

app.put('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id }
  const index = pokemons.findIndex(pokemon => id === pokemon.id)
  pokemons[index] = pokemonUpdated
  const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
  res.json(success(message, pokemonUpdated))
});

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))