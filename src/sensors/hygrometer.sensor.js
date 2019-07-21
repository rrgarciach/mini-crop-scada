const sensor = require('node-dht-sensor').promises;

function read(pin, dhtType = 22) {

  return sensor.read(dhtType, pin)
    .then(data => {
      return Promise.resolve({
        temperature: data.temperature.toFixed(2),
        humidity: data.humidity.toFixed(2),
      });
    })
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });

}

module.exports = {
  read,
};
