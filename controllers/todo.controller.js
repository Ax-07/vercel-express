const db = require("../models");
const Todo = db.todos;
const Op = db.Sequelize.Op;


// Création et enregistrement d'une nouvelle tâche
exports.create = (req, res) => {
    // Validation de la requête
    if (!req.body.title) {
        res.status(400).json({ message: "Le contenu ne peut pas être vide !" });
        return;
    }

    // Création d'une tâche
    const todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status ? req.body.status : false
    };

    // Sauvegarde de la tâche dans la base de données
    Todo.create(todo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Une erreur s'est produite lors de la création de la tâche." });
        });
};

// Récupération de toutes les tâches de la base de données
exports.findAll = (req, res) => {

    Todo.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Une erreur s'est produite lors de la récupération des tâches." });
        });
};
