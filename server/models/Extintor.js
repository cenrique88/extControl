
const mongoose = require('mongoose');

const extintorSchema = new mongoose.Schema({
  id_extintor: { type: String, required: true },
  cliente: {type: String, required: true},
  ubicacion: { type: String, required: true },
  tipo_extintor: { type: String, required: true },
  capacidad: { type: String, required: true },
  recarga_cada: { type: Number, required: true },
  ultima_recarga: { type: Date, required: true },
  observaciones: { type: String },
});

module.exports = mongoose.model('Extintor', extintorSchema);