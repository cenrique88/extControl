
const mongoose = require('mongoose');

const extintorSchema = new mongoose.Schema({
    fecha_revision: { type: Date, required: true },
    id_extintor: { type: String, required: true },
    estado_anterior:{type: Object, required: true},

});

module.exports = mongoose.model('Revisiones', revisionesSchema);