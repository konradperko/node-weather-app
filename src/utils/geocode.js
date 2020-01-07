const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia29ucmFkcGVya28iLCJhIjoiY2p6aWJ2bGVmMGxiczNmbXpjbTlwaG1idiJ9.lA_meXsh8VYPZQnZFlyAGw&limit=1`;

    request({
        json: true,
        url
    }, (error, { body: { features } }) => {
        if (error) {
            callback('Unable to connect to mapbox service!');
            return;
        }
        if (!features.length) {
            callback('No matches found.');
            return;
        }
        callback(undefined, {
            location: features[0].place_name,
            latitude: features[0].center[1],
            longitude: features[0].center[0]
        })
    })
};

module.exports = geocode;