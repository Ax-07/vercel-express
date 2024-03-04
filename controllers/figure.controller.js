const db = require("../models");
const { Blob } = require("@vercel/blob");
const Figure = db.figure;
const Op = db.Sequelize.Op;

// Création et enregistrement d'une nouvelle figure
exports.create = async (req, res) => {
    // Validation de la requête
    if (!req.body.title) {
        res.status(400).json({ message: "Le contenu ne peut pas être vide !" });
        return;
    }

    // Supposons que req.file contient les données de l'image
const blob = Blob.from(req.file.buffer);
const id = await blob.write();
console.log(`Blob stored with id: ${id}`);
    // Création d'une figure
    const figure = {
        title: req.body.title,
        description: req.body.description,
        image: id, // stockez l'ID du blob ici
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

// Récupération de toutes les figures de la base de données
exports.findAll = async (req, res) => {
    try {
        const figures = await Figure.findAll();
        for (let figure of figures) {
            if (figure.image) {
                const blob = await Blob.read(figure.image);
                const buffer = await blob.arrayBuffer();
                figure.image = `data:image/jpeg;base64,${Buffer.from(buffer).toString('base64')}`;
            }
        }
        res.send(figures);
    } catch (err) {
        res.status(500).json({ message: err.message || "Une erreur s'est produite lors de la récupération des figures." });
    }
};