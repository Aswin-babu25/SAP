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
  console.log('Incoming data:', req.body, req.file);  // <-- Add this line
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

//get an event by ID
router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM events WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Event not found' });
    res.json(row);
  });
});

//get all events
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM events';
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// New: Endpoint to send the event image
router.get('/:id/image', (req, res) => {
  db.get('SELECT image_path FROM events WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row || !row.image_path) return res.status(404).json({ error: 'No image found' });

    // Send the static file using express.static
    res.sendFile(path.resolve(row.image_path));
  });
});

module.exports = router;
