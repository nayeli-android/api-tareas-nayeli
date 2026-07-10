require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Ruta de prueba
app.get('/api/salud', (req, res) => {
    res.status(200).json({
        status: 'ok',
        mensaje: 'Servidor funcionando correctamente'
    });
});

// Rutas de tareas
const tareasRouter = require('./routes/tareas');
app.use('/api/tareas', tareasRouter);


const climaRoutes = require("./routes/clima");
app.use("/api/clima", climaRoutes);

module.exports = app;