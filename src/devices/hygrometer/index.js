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
    return process.exit();
  }
});

client.on('error', err => {
  console.error(err);
  return process.exit();
});

async function readSensor(temperature = 0, humidity = 0, count = 0, limit = 6) {
  try {
    const data = await sensor.read(4);
    console.log(`${data.temperature}°C`, `${data.humidity}%`, `count: ${count}`);
    temperature += data.temperature;
    humidity += data.humidity;

    setTimeout(async () => {
      if (count >= limit) {
        const data = {
          temperature: (temperature / limit).toFixed(2),
          humidity: (humidity / limit).toFixed(2),
        };
        client.publish('v1/devices/me/telemetry', JSON.stringify(data));
        console.log(`Hygrometer ${ACCESS_TOKEN} telemetry published!`);
        return process.exit();
      }
      try {
        await readSensor(temperature, humidity, ++count);
      } catch (err) {
        return process.exit();
      }
    }, 10000);

  } catch (err) {
    console.error('Failed to read sensor data:', err);
    return process.exit();
  }
}
