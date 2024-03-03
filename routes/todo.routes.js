const express = require('express'); // Importation du module express
const router = express.Router(); // Création d'un routeur express
const todos = require('../controllers/todo.controller.js'); // Importation du contrôleur todo

router.post('/', todos.create); // Création d'une nouvelle tâche
router.get('/', todos.findAll); // Récupération de toutes les tâches
router.get('/:id', todos.findById); // Récupération d'une tâche par son id
router.put('/:id', todos.update); // Mise à jour d'une tâche par son id
router.delete('/:id', todos.delete); // Suppression d'une tâche par son id

module.exports = router; // Exportation du routeur pour être utilisé dans d'autres modules