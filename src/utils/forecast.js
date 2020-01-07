const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/88fff6ffbab2df14237194dce6aea5a6/${latitude},${longitude}?units=si&lang=pl`;

    request({
        json: true,
        url
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!')
            return;
        }
        if (body.error) {
            callback(body.error);
            return;
        }
        const currently = body.currently;
        const today = body.daily.data[0];
        callback(undefined, `${today.summary} Mamy obecnie ${currently.temperature} stopni celcjusza. Szansa na deszcz wynosi ${currently.precipProbability}%.`);
    });
};

module.exports = forecast;
