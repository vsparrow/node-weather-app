var request = require("request");

var getWeather = (lat,lon,callback) => {
    request({
        url : `https://api.darksky.net/forecast/c1c79c93374cb0e0b5e2439d84fd12f5/${lat},${lon}`,
        json : true
    },function(error,response,body) {
        if(!error && response.statusCode === 200) {
            callback(undefined,{temperature: body.currently.temperature, 
            apparentTemperature: body.currently.apparentTemperature})
        } //console.log(body.currently.temperature)
        else {callback("Error getting Weather")} //console.log("Error fetch weather")
    });
}


module.exports = {getWeather}