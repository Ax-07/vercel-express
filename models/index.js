// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialect: 'postgres',
    dialectModule: require('pg'),
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
});
const db = {}; // Création d'un objet vide pour stocker les modèles de la base de données

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.todos = require('./todo.model.js')(sequelize, Sequelize); // Importation du modèle Todo et l'initialisation avec l'instance de Sequelize et Sequelize

module.exports = db;