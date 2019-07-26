const mqtt = require('mqtt');
require('dotenv').config();
require('module-alias/register');

const jsonStore = require('@src/lib/json-store');

const MQTT_HOST = process.env.THINGSBOARD_HOST || 'demo.thingsboard.io';
const MQTT_PORT = process.env.THINGSBOARD_PORT || 1883;
const ACCESS_TOKEN = process.env.GPIO_ACCESS_TOKEN;
const STATE_STORE_FILENAME = './state_store.json';
const GPIO_INITIAL_STATE = {
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

restoreGpioState();

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
    console.log('method received:', message.method, pin, enabled);

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

function restoreGpioState() {
  console.log('Restoring GPIO states...');
  const gpioState = loadStoredState();
  Object.keys(gpioState).map(async pin => {
    const actuator = require('@actuators/gpio.actuator.js')(pin);
    try {
      console.log(`GPIO ${pin} to ${(gpioState[pin])}`);
      if (gpioState[pin])
        return await actuator.turnOn();
      else
        return await actuator.turnOff();

    } catch (e) {
      console.error(e);
      throw e;
    }
  });
}

function getGpioStatus() {
  const gpioState = loadStoredState();
  return JSON.stringify(gpioState);
}

function setGpioStatus(pin, status) {
  const gpioState = loadStoredState();
  gpioState[pin] = status;
  saveStoredState(gpioState);
}

function loadStoredState() {
  return jsonStore.load(STATE_STORE_FILENAME, GPIO_INITIAL_STATE);
}

function saveStoredState(data = gpioState) {
  jsonStore.save(data, STATE_STORE_FILENAME);
}

const CronJob = require('cron').CronJob;
new CronJob('0 0 6 * * *', function () {
  return setGpioStatus(29, true);
}, null, true, 'America/Mexico_City');
new CronJob('0 1 6 * * *', function () {
  return setGpioStatus(29, true);
}, null, true, 'America/Mexico_City');

new CronJob('0 0 2 * * *', function () {
  return setGpioStatus(29, false);
}, null, true, 'America/Mexico_City');
new CronJob('0 1 2 * * *', function () {
  return setGpioStatus(29, false);
}, null, true, 'America/Mexico_City');
