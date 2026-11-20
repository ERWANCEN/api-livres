const express = require('express');
const router = express.Router();

let books = [];
let nextId = 1;

// Lister tous les livres
router.get('/', (req, res) => res.json(books));

// Lire un livre
router.get('/:id', (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));
  if (!book) return res.status(404).json({ message: 'Livre introuvable' });
  res.json(book);
});

// Créer un livre
router.post('/', (req, res) => {
  const book = { id: nextId++, ...req.body };
  books.push(book);
  res.status(201).json(book);
});

// Modifier un livre
router.put('/:id', (req, res) => {
  const index = books.findIndex(b => b.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Livre introuvable' });
  books[index] = { ...books[index], ...req.body, id: books[index].id };
  res.json(books[index]);
});

// Supprimer un livre
router.delete('/:id', (req, res) => {
  const index = books.findIndex(b => b.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Livre introuvable' });
  books.splice(index, 1);
  res.status(204).send();
});

module.exports = router;