const gpio = require('rpi-gpio');
const gpiop = gpio.promise;
const sensor = require('node-dht-sensor');

require('dotenv').config();
/*
gpiop.setup(7, gpio.DIR_OUT)
	.then(() => {
		return gpiop.write(7, true);
	})
	.then(() => setTimeout(() => gpiop.write(7, false),1000))
	.catch(err => {
		console.log(err.toString());
	});
*/
/*
setInterval(() => {
gpiop.setup(7, gpio.DIR_IN)
	.then(() => {
		return gpiop.read(7);
	})
	.then((v1, v2) => {
		console.log('Read :', v1, v2);
	})
	.catch(console.error);
}, 1000);
*/
setInterval(() => {
  sensor.read(22, 4, (err, temp, hum) => {
    if (err) throw err;
    console.log(temp.toFixed(1), hum.toFixed(1));
  });
}, 1000);