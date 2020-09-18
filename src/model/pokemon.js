module.exports = (sequelize, Sequelize) => {
  return sequelize.define('Pokemon', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    hp: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    cp: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    picture: {
      type: Sequelize.STRING,
      allowNull: false
    },
    types: {
      type: Sequelize.ENUM('Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Normal', 'Vol', 'Electrik', 'Fée'),
      allowNull: false
    }
  })
}