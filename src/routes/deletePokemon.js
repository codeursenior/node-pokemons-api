const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.delete('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon === null) {
          const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.`
          res.status(404).json({ message })
        }
        return pokemon
      })
      .then(pokemon => {
        Pokemon.destroy({
          where: { id: pokemon.id }
        })
        return pokemon
      })
      .then(pokemon => {
        const message = `Le pokémon avec l'identifiant n°${pokemon.id} a bien été supprimé.`
        res.json({message, data: pokemon })
      })
      .catch(error => {
        const message = `Le pokémon n'a pas pu être modifié. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
    })
}