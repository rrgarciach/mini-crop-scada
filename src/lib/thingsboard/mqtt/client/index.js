const mqtt = require('mqtt');

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
    // const data = {
    //   temperature: 99.99,
    //   humidity: 99.99,
    // };
    const data = {"serialNumber":"SN-001", "model":"T1000", "temperature":36.6};
    console.log(data.temperature, data.humidity);
    console.log('Client connected!');
    // client.publish('v1/devices/me/attributes', 'temperature');
    // console.log('Attributes published!');
    client.publish('sensors', JSON.stringify(data));
    console.log('Telemetry published!');
    // client.end();

    if (++count >= 3) process.exit(0);
  }, 1000);

});
