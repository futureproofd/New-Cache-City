/* eslint-disable global-require */
// Auto-complete search results
exports.autocomplete = (req, res) => {
  // get query object (q)
  const googleMapsClient = require('@google/maps').createClient({
    key: process.env.MAP_KEY,
    Promise: global.Promise,
  });

  googleMapsClient
    .placesAutoComplete({ input: req.query.q })
    .asPromise()
    .then((response) => {
      console.log(response.json.predictions);
      res.status(200).send(response.json.predictions);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.geocodeAddress = (req, res) => {
  // get query object (q)
  const googleMapsClient = require('@google/maps').createClient({
    key: process.env.MAP_KEY,
    Promise: global.Promise,
  });

  googleMapsClient
    .geocode({ address: req.query.q })
    .asPromise()
    .then((response) => {
      console.log('geocodes:', response);
      res.status(200).send(response.json.results[0].geometry.location);
    })
    .catch((err) => {
      console.log(err);
    });
};
