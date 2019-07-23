const fs = require('fs');

function save(data, fileName) {
  const strData = JSON.stringify(data);
  fs.writeFileSync(fileName, strData, {flag: 'w'});
}

function load(fileName) {
  const rawData = fs.readFileSync(fileName, {flag: 'w'});
  return JSON.parse(rawData);
}

module.exports = {
  load,
  save,
};
