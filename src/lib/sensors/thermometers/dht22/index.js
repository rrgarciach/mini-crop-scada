const sensor = require('node-dht-sensor');

sensor.read(22, 4, (err, temp, hum) => {
  if (err) throw err;
  const data = {
    temperature: temp.toFixed(1),
    humidity: hum.toFixed(1),
  };
  console.log(data.temperature, data.humidity);

});
