const db = require("../models");
const { put } = require("@vercel/blob");
const {upload} = require("@vercel/blob/client")
const Figure = db.figure;
const Op = db.Sequelize.Op;

// Création et enregistrement d'une nouvelle figure
module.exports.create = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    // Validation de la requête
    if (!req.body.title) {
        res.status(400).json({ message: "Le contenu ne peut pas être vide !" });
        return;
    }

// Supposons que req.files contient les données des fichiers
if (!req.files) {
    res.status(400).json({ message: "Une image ou une vidéo est requise !" });
    return;
}

let blobImage, blobVideo;

if (req.files['image']) {
    const imageFile = req.files['image'][0];
    blobImage = await put(imageFile.originalname, imageFile.buffer, { access: 'public' });
    console.log(`Blob stored with id: ${blobImage.url}`);
}

if (req.files['video']) {
    const videoFile = req.files['video'][0];
    blobVideo = await put(videoFile.originalname, videoFile.buffer, { access: 'public', multipart: true});
    console.log(`Blob stored with id: ${blobVideo.url}`);
}

// Création d'une figure
const figure = {
    title: req.body.title,
    description: req.body.description,
    image: blobImage ? blobImage.url : null, // stockez l'ID du blob ici
    video: blobVideo ? blobVideo.url : null // stockez l'ID du blob ici
};

    // Sauvegarde de la figure dans la base de données
    try {
        const data = await Figure.create(figure);
        res.send(data);
    } catch (err) {
        res.status(500).json({ message: err.message || "Une erreur s'est produite lors de la création de la figure." });
    }
};