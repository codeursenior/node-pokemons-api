const express = require('express')
const { Sequelize, DataTypes } = require('sequelize');
const morgan = require('morgan')
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
let pokemons = require('./mock-pokemon.js');
const { success, getUniqueId } = require('./helper.js');
const PokemonModel = require('./src/model/pokemon')

const app = express()
const port = 3000

const sequelize = new Sequelize('pokedex', 'username', 'password', {
  host: '192.168.64.2',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})

sequelize.authenticate()
  .then(_ => console.log('Connection has been established successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error))

const Pokemon = PokemonModel(sequelize, DataTypes)

sequelize.sync({force: true})
  .then(_ => {
    console.log('La base de données "Pokedex" a bien été synchronisée.')
    // Sequelize s'occupe pour nous de l'identifiant, et de la date d'ajout !
    Pokemon.create({
      name: 'Bulbizarre',
      hp: 25,
      cp: 5,
      picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png',
      types: ["Plante", "Poison"].join()
    }).then(bulbizarre => console.log(bulbizarre.toJSON()))
  })

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
  const id = getUniqueId(pokemons)
  const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}};
  pokemons.push(pokemonCreated);
  const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`
  res.json(success(message, pokemonCreated))
})

app.put('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id }
  pokemons = pokemons.map(pokemon => {
    return pokemon.id === id ? pokemonUpdated : pokemon
  })
  const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
  res.json(success(message, pokemonUpdated))
});

app.delete('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
  pokemons = pokemons.filter(pokemon => pokemon.id !== id)
  const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
  res.json(success(message, pokemonDeleted))
});

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))