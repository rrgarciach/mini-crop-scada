require('dotenv').config();
require('module-alias/register');

const hygrometer = require('@mqtt/hygrometer.mqtt.js');
const growLights = require('@mqtt/grow-lights.mqtt.js');
const gpio = require('@mqtt/gpio.mqtt.js');
