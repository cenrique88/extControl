
const mongoose = require('mongoose');

const clientesSchema = new mongoose.Schema({
  nombre_cliente: { type: String, required: true },
  email: { type: String, required: true },  
});

module.exports = mongoose.model('clientes', clientesSchema);