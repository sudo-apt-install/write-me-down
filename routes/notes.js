const notes = require('express').Router();
const app = require('./index');
const { readFromFile, readAndAppend } = require('../helpers/fsHelpers');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all stored notes
notes.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
})

notes.post('/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (title && text) {
    console.log(req.body);

    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, '../db/db.json');

    res.json('Success');
  } else {
    res.error('Did not post successfully');
  }
});



module.exports = notes;
