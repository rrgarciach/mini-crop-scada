const mqtt = require('mqtt');

const MQTT_HOST = process.env.THINGSBOARD_HOST || 'demo.thingsboard.io';
const MQTT_PORT = process.env.THINGSBOARD_PORT || 1883;
const PIN = process.env.GROW_LIGHTS_PIN;
const ACCESS_TOKEN = process.env.GROW_LIGHTS_ACCESS_TOKEN;

const actuator = require('@actuators/lights.sensor.js')(PIN);

console.log(`Connecting to: ${MQTT_HOST}:${MQTT_PORT} using access token: ${ACCESS_TOKEN}...`);

const client = mqtt.connect('mqtt://' + MQTT_HOST, {
  username: ACCESS_TOKEN,
  port: MQTT_PORT,
});

client.on('connect', async function () {
  console.log(`Client ${MQTT_HOST} connected!`);

  // client.publish('v1/devices/me/attributes', 'temperature');
  // console.log('Attributes published!');
  client.subscribe('v1/devices/me/rpc/request/+');

  client.on('message', async function (topic, message) {

    console.log('request.topic: ' + topic);
    console.log('request.body: ' + message.toString());

    const requestId = topic.slice('v1/devices/me/rpc/request/'.length);

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
    //client acts as an echo service
    client.publish('v1/devices/me/rpc/response/' + requestId, message);
  });

});

async function turnOn() {
  await actuator.turnOn();
  console.log('Turned ON grow lights.');
}

async function turnOff() {
  await actuator.turnOn();
  console.log('Turned OFF grow lights.');
}
