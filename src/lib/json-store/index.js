const fs = require('fs');

function save(data, fileName) {
  const strData = JSON.stringify(data);
  fs.writeFileSync(fileName, strData);
}

function load(fileName) {
  const rawData = fs.readFileSync(fileName);
  return JSON.parse(rawData);
}

module.exports = {
  load,
  save,
};
