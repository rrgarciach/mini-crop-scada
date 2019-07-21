const gpio = require('rpi-gpio');
const gpiop = gpio.promise;

gpiop.setup(29, gpio.DIR_OUT)
  .then(() => {
    return gpiop.write(29, true);
  })
  .then(() => setTimeout(() => gpiop.write(29, true), 1000))
  .catch(err => {
    console.log(err.toString());
  });