const mqtt = require('mqtt');
require('dotenv').config();
require('module-alias/register');

const MQTT_HOST = process.env.THINGSBOARD_HOST || 'demo.thingsboard.io';
const MQTT_PORT = process.env.THINGSBOARD_PORT || 1883;
const ACCESS_TOKEN = process.env.HYGROMETER_ACCESS_TOKEN;

const sensor = require('@sensors/hygrometer.sensor.js');

console.log(`Connecting to: ${MQTT_HOST}:${MQTT_PORT} using access token: ${ACCESS_TOKEN}...`);

const client = mqtt.connect('mqtt://' + MQTT_HOST, {
  username: ACCESS_TOKEN,
  port: MQTT_PORT,
});

client.on('connect', async function () {
  console.log(`Client Hygrometer ${ACCESS_TOKEN} connected to ${MQTT_HOST}!`);
  try {
    await readSensor();
  } catch (err) {
    console.log(err);
    throw err;
  }
});

client.on('error', err => {
  console.error(err);
  throw err;
});

async function readSensor(count = 0) {
  try {
    const {temperature, humidity} = await sensor.read(4);
    const data = {
      temperature: temperature.toFixed(2),
      humidity: humidity.toFixed(2),
    };
    console.log(`${data.temperature}°C`, `${data.humidity}%`, `count: ${count}`);

    client.publish('v1/devices/me/telemetry', JSON.stringify(data));
    console.log(`Hygrometer ${ACCESS_TOKEN} telemetry published!`);

    setTimeout(async () => {
      if (count >= 10) return Promise.resolve();
      try {
        await readSensor(++count);
      } catch (err) {
        throw err;
      }
    }, 10000);

  } catch (err) {
    console.error('Failed to read sensor data:', err);
    throw err;
  }
}
