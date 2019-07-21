const mqtt = require('mqtt');

const MQTT_HOST = process.env.THINGSBOARD_HOST || 'demo.thingsboard.io';
const MQTT_PORT = process.env.THINGSBOARD_PORT || 1883;
const PIN = process.env.GROW_LIGHTS_PIN;
const ACCESS_TOKEN = process.env.GROW_LIGHTS_ACCESS_TOKEN;

const actuator = require('@actuators/grow-lights.actuator.js')(PIN);

console.log(`Connecting to: ${MQTT_HOST}:${MQTT_PORT} using access token: ${ACCESS_TOKEN}...`);

const client = mqtt.connect('mqtt://' + MQTT_HOST, {
  username: ACCESS_TOKEN,
  port: MQTT_PORT,
});

client.on('connect', async function () {
  console.log(`Client Grow Lights ${ACCESS_TOKEN} connected to ${MQTT_HOST}!`);

  // client.subscribe('v1/devices/me/attributes', err => {
  //   if (err) throw err;
  //   client.publish('v1/devices/me/attributes', 'temperature');
  //   console.log('Attributes published!');
  // });
  client.subscribe('v1/devices/me/rpc/request/+', err => {
    if (err) throw err;
  });

});

client.on('message', async function (topic, message) {

  console.log(`Grow Lights ${ACCESS_TOKEN} request.topic: ${topic}`);
  console.log(`Grow Lights ${ACCESS_TOKEN} request.body: ${message.toString()}`);

  const requestId = topic.slice('v1/devices/me/rpc/request/'.length);
  //client acts as an echo service
  client.publish('v1/devices/me/rpc/response/' + requestId, message);

  if (message.method === 'setGrowLights') {
    const {state} = message.params;
    switch (state) {
      case 'on':
        await turnOn();
        break;
      case 'off':
        await turnOff();
        break;
    }
  }
});

async function turnOn() {
  await actuator.turnOff(); // inverted to used normally closed relay on lights ON
  console.log(`Turned ON Grow Lights ${ACCESS_TOKEN}`);
}

async function turnOff() {
  await actuator.turnOn(); // inverted to used normally closed relay on lights ON
  console.log(`Turned OFF Grow Lights ${ACCESS_TOKEN}`);
}

const CronJob = require('cron').CronJob;
new CronJob('0 0 8 * * *', async function () {
  return await turnOn();
}, null, true, 'America/Mexico_City');

new CronJob('0 0 0 * * *', async function () {
  return await turnOff();
}, null, true, 'America/Mexico_City');
