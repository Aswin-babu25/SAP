const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db/db');

// Ensure uploads directory exists and serve it statically in index.js:
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
  const {
    title, description,
    start_datetime, end_datetime,
    location, category, status
  } = req.body;
  const image_path = req.file ? req.file.path : null;

  const sql = `
    INSERT INTO events
      (title, description, start_datetime, end_datetime, location, category, status, image_path)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    title, description, start_datetime,
    end_datetime, location, category,
    status || 'upcoming', image_path
  ];

  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

module.exports = router;
