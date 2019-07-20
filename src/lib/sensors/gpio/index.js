const gpio = require('rpi-gpio');
const gpiop = gpio.promise;

gpiop.setup(7, gpio.DIR_IN)
  .then(() => {
    return gpiop.read(7);
  })
  .then((value) => {
    console.log('Read :', value);
  })
  .catch(console.error);
