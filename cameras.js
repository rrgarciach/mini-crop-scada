require('dotenv').config();
require('module-alias/register');

const camera = require('@devices/camera');

camera.capturePicture();
