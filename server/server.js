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

app.post('/extintores', async (req, res) => {
  try {
    const nuevoExtintor = new Extintor(req.body);
    const guardado = await nuevoExtintor.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ message: 'Error guardando extintor' });
  }
});






app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});