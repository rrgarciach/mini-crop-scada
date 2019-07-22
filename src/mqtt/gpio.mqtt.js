const mqtt = require('mqtt');

const MQTT_HOST = process.env.THINGSBOARD_HOST || 'demo.thingsboard.io';
const MQTT_PORT = process.env.THINGSBOARD_PORT || 1883;
const ACCESS_TOKEN = process.env.GPIO_ACCESS_TOKEN;

let gpioState = {
  '7': false,
  '11': false,
  '12': false,
  '13': false,
  '15': false,
  '16': false,
  '18': false,
  '22': false,
  '29': false,
  '31': false,
  '32': false,
  '33': false,
  '35': false,
  '36': false,
  '37': false,
  '38': false,
  '40': false,
};

console.log(`Connecting to: ${MQTT_HOST}:${MQTT_PORT} using access token: ${ACCESS_TOKEN}...`);

const client = mqtt.connect('mqtt://' + MQTT_HOST, {
  username: ACCESS_TOKEN,
  port: MQTT_PORT,
});

client.on('connect', async function () {
  console.log(`GPIO ${ACCESS_TOKEN} connected to ${MQTT_HOST}!`);

  client.subscribe('v1/devices/me/rpc/request/+', err => {
    if (err) throw err;
  });
  client.publish('v1/devices/me/attributes', getGpioStatus());

});

client.on('message', async function (topic, payload) {

  console.log(`Topic ${topic}`);
  console.log(`Message: ${payload.toString()}`);

  const message = JSON.parse(payload.toString());

  if (message.method === 'setGpioStatus') {
    const {pin, enabled} = message.params;
    console.log('setGpioStatus received!', pin, enabled)

    const actuator = require('@actuators/gpio.actuator.js')(pin);
    try {
      if (enabled)
        await actuator.turnOn();
      else
        await actuator.turnOff();

    } catch (e) {
      console.error(e);
      throw e;
    }
    setGpioStatus(pin, enabled);
  }
  client.publish(topic.replace('request', 'response'), getGpioStatus());
  client.publish('v1/devices/me/attributes', getGpioStatus());
});

function getGpioStatus() {
  return JSON.stringify(gpioState);
}

function setGpioStatus(pin, status) {
  gpioState[pin] = status;
}