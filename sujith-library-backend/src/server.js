const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Create a SQLite database (in-memory)
const db = new sqlite3.Database(':memory:');

// Create a 'books' table
db.run(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    name TEXT,
    author TEXT,
    borrowed BOOLEAN
  )
`);

app.get('/books', (req, res) => {
  const { sortBy } = req.query;
  let sql = 'SELECT * FROM books';

  if (sortBy === 'name') {
    sql += ' ORDER BY name';
  }

  db.all(sql, (err, books) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(books);
    }
  });
})

app.post('/books', (req, res) => {
  const { name, author, borrowed } = req.body;
  db.run('INSERT INTO books (name, author, borrowed) VALUES (?, ?, ?)', [name, author, borrowed], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const newBookId = this.lastID;
      res.json({ id: newBookId, name, author, borrowed });
    }
  });
});

app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'UPDATE books SET borrowed = NOT borrowed WHERE id = ?';
  db.run(sql, [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Book updated successfully' });
    }
  });
});

app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM books WHERE id = ?';
  db.run(sql, [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Book deleted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
