const express = require('express');
const auth = require('../middleware/auth');
const Exercise = require('../models/exercise');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Configuration déjà dans index.js, mais réutilisable ici

// Déposer un exercice avec PDF
router.post('/exercises', auth('professor'), upload.single('file'), async (req, res) => {
  console.log('Fichier uploadé:', req.file); // Ajoutez ceci
  const { title } = req.body;
  const professor_id = req.user.id;
  const filePath = req.file ? req.file.path : null;

  if (!filePath) return res.status(400).json({ error: 'Fichier PDF requis' });

  try {
    const exercise = await Exercise.create(professor_id, title, filePath);
    res.status(201).json({ message: 'Exercice créé', exercise });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
});

router.get('/exercises', auth('professor'), async (req, res) => {
  try {
    const exercises = await Exercise.findAll();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});

module.exports = router;