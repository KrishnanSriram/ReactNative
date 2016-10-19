var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=e94b872c9aeb2561acda97be75253999';

var KelvinToF = function (kelvin) {
    return Math.round((kelvin - 273.15) * 1.8 + 32) + ' F';
}

module.exports = function (latitude, longitude) {
    var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;
    console.log('Request URL: ' + url);
    return fetch(url).then((response) => {
        return response.json()
    }).then((json) => {
        return {
            city: json.name,
            temperature: KelvinToF(json.main.temp),
            description: json.weather[0].description
        };
    }).catch(function (err) {
        console.log("ERROR in service: " + err);
    });
}