const express = require('express');
const path = require('path');
const fs = require('fs');
// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for return all the notes
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (er, data) => {
    res.json(JSON.parse(data));
  })
  // fs.readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST request to add a review
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save

    fs.readFile('./db/db.json', 'utf-8', (er, data) => {
      // res.json(JSON.parse(data));
      const noteFromData = JSON.parse(data);

      const newNote = {
        title,
        text,
        id: uuid(),
      };

      noteFromData.push(newNote);

    // Convert the data to a string so we can save it
    const noteString = JSON.stringify(noteFromData);

    // Write the string to a file
    fs.writeFile(`./db/db.json`, noteString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Note for ${newNote.title} has been written to JSON file`
          )
    );

    console.log(noteFromData);
    res.status(201).json(newNote);
    });
    
  } else {
    res.status(500).json('Error in posting review');
  }
});

// DELETE Route for a specific note
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  fs.readFile('./db/db.json', 'utf-8', (er, data) => {
    // res.json(JSON.parse(data));
    const noteFromData = JSON.parse(data);

    // Make a new array of all notes except the one with the ID provided in the URL
    const result = noteFromData.filter((note) => note.id !== noteId);

    fs.writeFile(`./db/db.json`, JSON.stringify(result), (err) =>
      err
        ? console.error(err)
        : console.log(
            `Note for ${noteId} has been deleted from db.json file`
          )
    );

    res.json(result);
  });
});

// GET Route to return notes.html file
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route to return index.html file
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);