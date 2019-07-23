const fs = require('fs');

function save(data, fileName) {
  try {
    if (!fs.existsSync(fileName)) fs.writeFileSync(fileName, JSON.stringify({}));
    const strData = JSON.stringify(data);
    fs.writeFileSync(fileName, strData);

  } catch (e) {
    throw e;
  }
}

function load(fileName) {
  try {
    if (!fs.existsSync(fileName)) fs.writeFileSync(fileName, JSON.stringify({}));
    const rawData = fs.readFileSync(fileName);
    return JSON.parse(rawData);

  } catch (e) {
    throw e;
  }
}

module.exports = {
  load,
  save,
};
