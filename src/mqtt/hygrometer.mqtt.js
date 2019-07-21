const mqtt = require('mqtt');

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
  console.log(`Client ${MQTT_HOST} connected!`);
  await readSensor();
});

async function readSensor() {
  const data = await sensor.read(4);
  console.log(data.temperature, data.humidity);

  client.publish('v1/devices/me/telemetry', JSON.stringify(data));
  console.log('Telemetry published!');

  setTimeout(readSensor, 10000);
}
