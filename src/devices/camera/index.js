const NodeWebcam = require('node-webcam');
const stream = require('stream');
const moment = require('moment');
const upload = require('dropbox-streaming-upload').default;

require('dotenv').config();
require('module-alias/register');

const DROPBOX_ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN;
const CAMERA_CAPTURE_DELAY = process.env.CAMERA_CAPTURE_DELAY;

function capturePicture(device, labelName) {

  const fileName = `${labelName}-${moment().format('YYYY-MM-DD-HH-mm')}.jpg`;

  const captureParams = {
    width: 1280,
    height: 720,
    quality: 100,
    delay: CAMERA_CAPTURE_DELAY || 60,
    saveShots: true, // Save shots in memory
    output: 'jpeg', // [jpeg, png] support varies
    device: device,
    callbackReturn: 'buffer',
    verbose: true,
  };

  NodeWebcam.capture(`./picture_${labelName}.jpg`, captureParams, function (err, buffer) {
    if (err) console.error(err);
    else {
      const bufferStream = new stream.PassThrough();
      bufferStream.end(buffer);

      const uploadParams = {
        access_token: DROPBOX_ACCESS_TOKEN,
        readable_stream: bufferStream,
        file_size: buffer.length,
        destination: `/${fileName}`,
      };

      return upload(uploadParams).then(function (successMetadata) {
      }, function (error) {
        console.error(error);
      })
    }
  });

}

module.exports = {
  capturePicture,
};
