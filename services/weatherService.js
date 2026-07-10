const axios = require("axios");

const obtenerClima = async (ciudad) => {

    const apiKey = process.env.WEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    const respuesta = await axios.get(url, {
        timeout: 5000
    });

    return {
        ciudad: respuesta.data.name,
        temperatura: respuesta.data.main.temp,
        descripcion: respuesta.data.weather[0].description
    };

};

module.exports = obtenerClima;