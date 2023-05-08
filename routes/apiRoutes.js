const router = require("express").Router();
const { notDeepEqual } = require("assert");
// const app = require("./htmlRoutes");
// const { readFromFile, readAndAppend } = require("../helpers/fsHelpers");
const fs = require("fs");
const path = require("path");
const uuidv1 = require("uuidv1");
const notesPath = path.join(__dirname, "../db/db.json");

// GET Route for retrieving all stored notes
router.get("/notes", (req, res) => {
  fs.readFile(notesPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
  // console.info(`${req.method} request received for notes`);
  // readFromFile("../db/db.json").then((data) => res.json(JSON.parse(data)));
});

router.post("/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (!title || !text) {
    console.log(req.body);
    return res.status(400).json({ error: "title or text is blank" });
  }

  const newNote = {
    title,
    text,
    id: uuidv1(),
  };

  fs.readFile(notesPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    const notes = JSON.parse(data);
    notes.push(newNote);
    
    fs.writeFile(notesPath, JSON.stringify(notes), (err) => {
      if(err) {
        return res.status(500).json({ error: err });
      }
      res.json(newNote);
    });

  });
  // res.json("Success");
});

router.delete("/notes/:id", (req, res) => {
  const id = req.params.id;

  fs.readFile(notesPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.id !== id);

    fs.writeFile(notesPath, JSON.stringify(notes), (err) => {
      if(err) {
        return res.status(500).json({ error: err });
      }
      res.json({ ok: true });
    });

  });
})

module.exports = router;
