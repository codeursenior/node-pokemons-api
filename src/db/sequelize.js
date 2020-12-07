const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')

let sequelize

if(process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize('kk8u5y871hfoaw9y', 't09tvm6qofrtvc7h', 'ryujse9ftf40wpqn', {
    host: 'klbcedmmqp7w17ik.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: true
  })
} else {
  sequelize = new Sequelize('pokedex', 'username', 'password', {
    host: '192.168.64.2',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: true
  })
  
}

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync().then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      })
      .then(pokemon => console.log(pokemon.toJSON()))
    })

    bcrypt.hash('pikachu', 10)
    .then(hash => User.create({ username: 'pikachu', password: hash }))
    .then(user => console.log(user.toJSON()))

    console.log('La base de donnée a bien été initialisée !')
  })
}

module.exports = { 
  initDb, Pokemon, User
}