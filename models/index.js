// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialect: 'postgres',
    dialectModule: require('pg'),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
        connectTimeout: 60000,
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
db.figure = require('./figure.model.js')(sequelize, Sequelize); // Importation du modèle Figure et l'initialisation avec l'instance de Sequelize et Sequelize

module.exports = db;