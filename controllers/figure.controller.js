const db = require("../models");
const { put } = require("@vercel/blob");
const Figure = db.figure;
const Op = db.Sequelize.Op;

// Création et enregistrement d'une nouvelle figure
module.exports.create = async (req, res) => {
    console.log(req.body);
    // Validation de la requête
    if (!req.body.title) {
        res.status(400).json({ message: "Le contenu ne peut pas être vide !" });
        return;
    }

    // Supposons que req.file contient les données de l'image
    if (!req.file) {
        res.status(400).json({ message: "L'image est requise !" });
        return;
    }
    const blob = await put(req.file.originalname, req.file.buffer, { access: 'public' });
    console.log(`Blob stored with id: ${blob}`);
    // Création d'une figure
    const figure = {
        title: req.body.title,
        description: req.body.description,
        image: blob.id, // stockez l'ID du blob ici
        video: req.body.video
    };

    // Sauvegarde de la figure dans la base de données
    try {
        const data = await Figure.create(figure);
        res.send(data);
    } catch (err) {
        res.status(500).json({ message: err.message || "Une erreur s'est produite lors de la création de la figure." });
    }
};