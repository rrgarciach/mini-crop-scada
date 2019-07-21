const gpio = require('rpi-gpio');
const gpiop = gpio.promise;

gpiop.setup(11, gpio.DIR_IN)
  .then(() => {
    return gpiop.read(11);
  })
  .then((value) => {
    console.log('Read :', value);
  })
  .catch(console.error);
