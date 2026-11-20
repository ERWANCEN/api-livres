const express = require('express');
const mongoose = require('mongoose');
const booksRouter = require('./routes/books');

const app = express();
app.use(express.json());
app.use('/books', booksRouter);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/books';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connecté à MongoDB');
    app.listen(PORT, () => console.log(`API démarrée sur le port ${PORT}`));
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB :', err.message);
    process.exit(1);
  });