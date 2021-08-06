const fs = require("fs");
const fileName = __dirname + "_randomFile.txt";
const intRegex = /^[0-9]*$/;
const numRegex = /^-?\d+\.?\d*$/;
const alphaRegex = /^[a-zA-Z]*$/;
const alphaNumRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
const report = () => {
  let report = {};
  if (isFileExists()) {
    const file = readFile();
    const content = file.split(",");
    let intCount = 0,
      numCount = 0,
      alphaCount = 0,
      alphaNumericCount = 0;
    content.forEach((element) => {
      if (intRegex.test(element)) intCount += 1;
      else if (numRegex.test(element) && parseFloat(element) % 1 != 0)
        numCount += 1;
      else if (alphaRegex.test(element)) alphaCount += 1;
      else if (alphaNumRegex.test(element)) alphaNumericCount += 1;
    });
    report = {
      intCount,
      numCount,
      alphaCount,
      alphaNumericCount,
    };
  }
  return report;
};

const isFileExists = () => {
  if (fs.existsSync(fileName)) {
    return true;
  }
  return false;
};

const readFile = () => {
  return fs.readFileSync(fileName, "utf8");
};

module.exports = report;
