require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const authRouter = require('./routes/auth');
const verificarToken = require('./middleware/auth');

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

// Rutas
const tareasRouter = require('./routes/tareas');
const climaRoutes = require('./routes/clima');

app.use('/api/auth', authRouter);

app.use('/api/tareas', verificarToken, tareasRouter);
app.use('/api/clima', verificarToken, climaRoutes);

module.exports = app;