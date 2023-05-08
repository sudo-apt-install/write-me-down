// const express = require("express");
// const notes = require('./notes');
const router = require('express').Router();
const path = require('path');

// const app = express();

// app.use('/api/notes', notes);


// GET route for notes page
router.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '../public/notes.html'))
);

//GET route for homepage
router.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = router;