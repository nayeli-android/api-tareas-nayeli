const obtenerClima = require("../services/weatherService");

const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const tareasModel = require('../models/tareas');

function validar(req, res, next) {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            errores: errores.array()
        });
    }

    next();
}

// GET /api/tareas
router.get('/', (req, res) => {
    res.status(200).json(tareasModel.obtenerTodas());
});

// GET /api/tareas/:id
router.get(
    '/:id',
    param('id').isInt().withMessage('El id debe ser un número entero'),
    validar,
    (req, res) => {

        const tarea = tareasModel.obtenerPorId(Number(req.params.id));

        if (!tarea) {
            return res.status(404).json({
                error: 'Tarea no encontrada'
            });
        }

        res.status(200).json(tarea);

    }
);

// POST /api/tareas
router.post(
    '/',
    body('titulo')
        .isString()
        .withMessage('El título debe ser texto')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('El título debe contener entre 1 y 100 caracteres')
        .escape(),

    body("ciudad")
    .isString()
    .withMessage("La ciudad debe ser texto")
    .trim()
    .notEmpty()
    .withMessage("La ciudad es obligatoria")
    .escape(),

    validar,

    (req, res) => {

        const nueva = tareasModel.crear(req.body.titulo, req.body.ciudad);

        res.status(201).json(nueva);

    }
);

// PUT /api/tareas/:id
router.put(
    '/:id',

    param('id').isInt(),

    body('titulo')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 100 })
        .escape(),

    body('completada')
        .optional()
        .isBoolean(),

    body("ciudad")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .escape(),

    validar,

    (req, res) => {

        const actualizada = tareasModel.actualizar(
            Number(req.params.id),
            req.body
        );

        if (!actualizada) {
            return res.status(404).json({
                error: 'Tarea no encontrada'
            });
        }

        res.status(200).json(actualizada);

    }
);

// GET /api/tareas/:id/clima

router.get(
    "/:id/clima",

    param("id").isInt(),

    validar,

    async (req, res) => {

        const tarea = tareasModel.obtenerPorId(
            Number(req.params.id)
        );

        if (!tarea) {

            return res.status(404).json({
                mensaje: "Tarea no encontrada"
            });

        }

        try {

            const clima = await obtenerClima(
                tarea.ciudad
            );

            res.status(200).json({

                tarea,

                clima

            });

        } catch (error) {

            res.status(502).json({
                mensaje: error.message
            });

        }

    }

);

// DELETE /api/tareas/:id
router.delete(
    '/:id',

    param('id').isInt(),

    validar,

    (req, res) => {

        const eliminado = tareasModel.eliminar(
            Number(req.params.id)
        );

        if (!eliminado) {

            return res.status(404).json({
                error: 'Tarea no encontrada'
            });

        }

        return res.sendStatus(204);

    }
);

module.exports = router;