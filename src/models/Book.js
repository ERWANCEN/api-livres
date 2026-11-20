const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: Number,
    genre: String,
  },
  { timestamps: true } // ajoute createdAt et updatedAt automatiquement
);

module.exports = mongoose.model('Book', bookSchema);