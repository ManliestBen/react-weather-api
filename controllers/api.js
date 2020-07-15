const axios = require('axios');

module.exports = {
    getWeather
}

function getWeather(req, res){
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.body.city},${req.body.country}&units=imperial&appid=${process.env.API_KEY}`)
    .then(response => {res.json(response.data)})
}