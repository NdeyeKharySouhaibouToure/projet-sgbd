const express = require('express');
const auth = require('../middleware/auth');
const Submission = require('../models/submission');
const Exercise = require('../models/exercise');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Soumettre une réponse avec PDF
router.post('/submissions', auth('student'), upload.single('file'), async (req, res) => {
  const { exercise_id } = req.body;
  const student_id = req.user.id;
  const filePath = req.file ? req.file.path : null;

  if (!filePath) return res.status(400).json({ error: 'Fichier PDF requis' });

  try {
    const submission = await Submission.create(student_id, exercise_id, filePath);
    res.status(201).json({ message: 'Soumission enregistrée', submission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la soumission' });
  }
});

router.get('/submissions', auth('student'), async (req, res) => {
  const student_id = req.user.id;
  try {
    const submissions = await Submission.findByStudent(student_id);
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});

router.get('/exercises', auth('student'), async (req, res) => {
  try {
    const exercises = await Exercise.findAll();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});

module.exports = router;