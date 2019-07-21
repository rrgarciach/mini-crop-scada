const sensor = require('node-dht-sensor').promises;

function read(pin, dhtType = 22) {

  return sensor.read(dhtType, pin)
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });

}

module.exports = {
  read,
};
