
const mongoose = require('mongoose');

const extintorSchema = new mongoose.Schema({
  id_extintor: { type: String, required: true },
  image: { type: Buffer, required: true },  
});

module.exports = mongoose.model('Image', imageSchema);