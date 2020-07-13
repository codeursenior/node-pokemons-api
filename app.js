const express = require('express')
const pokemons = require('./mock-pokemons.js');

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello, Express! 👋'))

app.get('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(pokemon => pokemon.id === id)
  res.send(`Vous avez demandé le pokémon n°${pokemon.name}.`)
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))