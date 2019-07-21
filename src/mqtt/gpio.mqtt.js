const mqtt = require('mqtt');

const MQTT_HOST = process.env.THINGSBOARD_HOST || 'demo.thingsboard.io';
const MQTT_PORT = process.env.THINGSBOARD_PORT || 1883;
const ACCESS_TOKEN = process.env.GPIO_ACCESS_TOKEN;

let gpioState = {
  p7: false,
  p11: false,
  p12: false,
  p13: false,
  p15: false,
  p16: false,
  p18: false,
  p22: false,
  p29: false,
  p31: false,
  p32: false,
  p33: false,
  p35: false,
  p36: false,
  p37: false,
  p38: false,
  p40: false,
};

console.log(`Connecting to: ${MQTT_HOST}:${MQTT_PORT} using access token: ${ACCESS_TOKEN}...`);

const client = mqtt.connect('mqtt://' + MQTT_HOST, {
  username: ACCESS_TOKEN,
  port: MQTT_PORT,
});

client.on('connect', async function () {
  console.log(`Client Grow Lights ${ACCESS_TOKEN} connected to ${MQTT_HOST}!`);

  client.subscribe('v1/devices/me/rpc/request/+', err => {
    if (err) throw err;
  });
  client.publish('v1/devices/me/attributes', getGpioStatus());

});

client.on('message', async function (topic, message) {

  console.log(`Topic ${topic} request.topic: ${topic}`);
  console.log(`Message: ${message.toString()}`);


  if (message.method === 'setGpioStatus') {
    const {pin, enabled} = message.params;

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
  if (gpioState['p' + pin] !== undefined) gpioState['p' + pin] = status;
}