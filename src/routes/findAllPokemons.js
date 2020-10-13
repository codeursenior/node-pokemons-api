const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')

module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if(req.query.name) {
      const name = req.query.name
      return Pokemon.findAll({ 
        where: { 
          name: {
            [Op.eq]: name
          }
        } 
      })
      .then(pokemons => {
        const message = `Il y a ${pokemons.length} qui correspondent au terme de recherche ${name}.`
        return res.json({ message, data: pokemons })
      })
    } 
    else {
      Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupéré.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = `La liste des pokémons n'a pas pu être récupéré. 
                         Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
    }
  })
}