const express = require("express");
const { param, validationResult } = require("express-validator");

const obtenerClima = require("../services/weatherService");

const router = express.Router();

router.get(
    "/:ciudad",

    param("ciudad")
        .trim()
        .notEmpty()
        .withMessage("La ciudad es obligatoria")
        .isAlpha("es-ES", { ignore: " " })
        .withMessage("La ciudad contiene caracteres inválidos"),

    async (req, res) => {

        const errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({
                errores: errores.array()
            });
        }

        try {

            const clima = await obtenerClima(req.params.ciudad);

            res.json(clima);

        } catch (error) {

            res.status(502).json({
        mensaje: error.message
    });

        }

    }

);

module.exports = router;