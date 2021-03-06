const mqtt = require('mqtt');
const sensor = require('node-dht-sensor');

require('dotenv').config();

const THINGSBOARD_HOST = process.env.THINGSBOARD_HOST || 'demo.thingsboard.io';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

console.log('Connecting to: %s using access token: %s', THINGSBOARD_HOST, ACCESS_TOKEN);

const client = mqtt.connect('mqtt://' + THINGSBOARD_HOST, {
  username: ACCESS_TOKEN,
  port: 1882,
});

client.on('connect', function () {

  let count = 0;

  setInterval(() => {
    sensor.read(22, 4, (err, temp, hum) => {
      if (err) throw err;
      const data = {
        temperature: temp.toFixed(1),
        humidity: hum.toFixed(1),
        username: ACCESS_TOKEN,
      };
      console.log(data.temperature, data.humidity);
      console.log('Client connected!');
      // client.publish('v1/devices/me/attributes', 'temperature');
      // console.log('Attributes published!');
      client.publish('v1/devices/me/telemetry', JSON.stringify(data));
      console.log('Telemetry published!');
      // client.end();

    });

    if (++count >= 2160) process.exit(0);
  }, 1000);

});
