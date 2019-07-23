const fs = require('fs');
const _ = require('lodash');

function save(data, fileName) {
  try {
    const strData = JSON.stringify(data);
    fs.writeFileSync(fileName, strData);

  } catch (e) {
    throw e;
  }
}

function load(fileName, initialState = {}) {
  console.log('_____', !fs.existsSync(fileName), !Object.keys(fs.readFileSync(fileName)).length)
  try {
    if (!fs.existsSync(fileName) || !Object.keys(fs.readFileSync(fileName)).length) fs.writeFileSync(fileName, JSON.stringify(initialState));
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
