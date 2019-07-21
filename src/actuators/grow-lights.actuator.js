const gpio = require('rpi-gpio').promise;

class Actuator {

  constructor(pin) {
    this.pin = pin;
  }

  turnOn() {

    return gpio.setup(this.pin, gpio.DIR_OUT)
      .then(() => {
        return gpio.write(this.pin, true);
      })
      .catch(err => {
        console.error(err);
        return Promise.reject(err);
      });

  }

  turnOff() {

    return gpio.setup(this.pin, gpio.DIR_OUT)
      .then(() => {
        return gpio.write(this.pin, false);
      })
      .catch(err => {
        console.error(err);
        return Promise.reject(err);
      });

  }

}

module.exports = pin => new Actuator(pin);
