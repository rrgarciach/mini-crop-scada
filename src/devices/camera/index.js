const NodeWebcam = require('node-webcam');
const stream = require('stream');
const moment = require('moment');
const upload = require('dropbox-streaming-upload').default;

require('dotenv').config();
require('module-alias/register');

const DROPBOX_ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN;

function capturePicture(device) {

    const opts = {
      width: 1280,
      height: 720,
      quality: 100,
      delay: 0,
      saveShots: true, // Save shots in memory
      output: 'jpeg', // [jpeg, png] support varies
      device: 'USB2.0 PC CAMERA',
      callbackReturn: 'buffer',
      verbose: true,
    };

    const Webcam = NodeWebcam.create(opts);

    Webcam.list(function (list) {
      console.log('list', list);
    });

    const path = `./${moment().format('YYYY-MM-DD-HH-mm')}.jpg`;
    console.log('____',path)

    // NodeWebcam.capture(path, opts, function (err, buffer) {
    //   if (err) console.error(err);
    //   else {
    //     const bufferStream = new stream.PassThrough();
    //     bufferStream.end(buffer);
    //     const options = {
    //       access_token: DROPBOX_ACCESS_TOKEN,
    //       readable_stream: bufferStream,
    //       file_size: buffer.length,
    //       destination: '/prototype_02/01.jpg',
    //     };
    //     return upload(options).then(function (successMetadata) {
    //     }, function (error) {
    //       console.error(error);
    //     })
    //   }
    // });

}

module.exports = {
  capturePicture,
};
