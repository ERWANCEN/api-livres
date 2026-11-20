const express = require('express');
const booksRouter = require('./routes/books');

const app = express();
app.use(express.json()); // permet de lire le JSON envoyé par le client
app.use('/books', booksRouter); // toutes les URLs /books vont vers ce fichier

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Impossible de démarrer sur le port ${PORT} :`, err.message);
    process.exit(1);
  }
  console.log(`API démarrée sur le port ${PORT}`);
});