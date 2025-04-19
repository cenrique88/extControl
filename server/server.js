const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./database');
const Extintor = require('./models/Extintor');
const multer = require('multer');
const fs = require('fs');
const path = require('path');




const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.json());

// Conexión a la base de datos
connectDB();



// Estas son las rutas de la API
app.get('/extintores', async (req, res) => {
  try {
    const extintores = await Extintor.find();
    res.json(extintores);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo extintores' });
  }
});


//MANEJO DEL GET DE UN EXTINTOR DE LA BASE DE DATOS
app.get('/extintores/:id_extintores', async (req, res) => {
  try {
    const { id_extintor } = req.params;
    const extintor = await Extintor.findOne(id_extintor);
    if (!extintor) {
      return res.status(404).json({ message: 'Extintor no encontrado' });
    }
    res.json(extintor);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo extintores' });
  }
});



//Añadir nuevo elemento a la Database
app.post('/extintores', async (req, res) => {
  try {
    const nuevoExtintor = new Extintor(req.body);
    const guardado = await nuevoExtintor.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ message: 'Error guardando extintor' });
  }
});


// Edicion de Database
app.put('/extintores/:id_extintor', async (req, res) => {
  try {
    const { id_extintor } = req.params;
    const extintorActualizado = await Extintor.findOneAndUpdate(id_extintor, req.body, { new: true });
    if (!extintorActualizado) {
      return res.status(404).json({ message: 'Extintor no encontrado' });
    }
    res.json(extintorActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando extintor' });
  }
});


//Eliminar Elemento de la Database
app.delete('/extintores/:id_extintor', async (req, res) => {
  try {
    const { id_extintor } = req.params;
    const extintorEliminado = await Extintor.findOneAndDelete({id_extintor});
    if (!extintorEliminado) {
      return res.status(404).json({ message: 'Extintor no encontrado' });
    }
    res.json({ message: 'Extintor eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando extintor' });
  }
});






app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});