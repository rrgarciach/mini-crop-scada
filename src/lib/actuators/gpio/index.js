const gpio = require('rpi-gpio');
const gpiop = gpio.promise;

gpiop.setup(7, gpio.DIR_OUT)
  .then(() => {
    return gpiop.write(7, true);
  })
  .then(() => setTimeout(() => gpiop.write(7, false), 1000))
  .catch(err => {
    console.log(err.toString());
  });
