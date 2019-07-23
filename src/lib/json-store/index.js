const fs = require('fs');

function save(data, fileName) {
  if (!fs.existsSync(fileName)) fs.writeFileSync(fileName, {}, {flag: 'w'});
  const strData = JSON.stringify(data);
  fs.writeFileSync(fileName, strData);
}

function load(fileName) {
  if (!fs.existsSync(fileName)) fs.writeFileSync(fileName, {}, {flag: 'w'});
  const rawData = fs.readFileSync(fileName);
  return JSON.parse(rawData);
}

module.exports = {
  load,
  save,
};
