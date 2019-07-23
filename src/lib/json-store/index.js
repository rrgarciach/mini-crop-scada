const fs = require('fs');

function save(data, fileName) {
  if (!fs.existsSync(fileName)) fs.writeFileSync(fileName, JSON.stringify({}));
  const strData = JSON.stringify(data);
  fs.writeFileSync(fileName, strData);
}

function load(fileName) {
  if (!fs.existsSync(fileName)) fs.writeFileSync(fileName, JSON.stringify({}));
  const rawData = fs.readFileSync(fileName);
  try {
    return JSON.parse(rawData);

  } catch (e) {
    throw e;
  }
}

module.exports = {
  load,
  save,
};
