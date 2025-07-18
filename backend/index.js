const express = require('express');
const cors = require('cors');
const path = require('path');
const eventsRouter = require('./routes/events');
const db = require('./db/db');

const app = express();
const port = 2345;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/events', eventsRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
