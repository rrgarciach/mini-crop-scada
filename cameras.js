require('dotenv').config();
require('module-alias/register');

const CAMERA_01 = process.env.CAMERA_01;
const CAMERA_02 = process.env.CAMERA_02;

const camera = require('@devices/camera');

camera.capturePicture(CAMERA_01, 'A');
camera.capturePicture(CAMERA_02, 'B');
