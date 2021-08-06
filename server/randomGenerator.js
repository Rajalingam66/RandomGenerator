const fs = require("fs");
const max = 30000000000;
const min = 2;
const fileName = __dirname + "_randomFile.txt";
const getNumber = (max = 4) => {
  return Math.floor(Math.random() * max);
};

const getRandomString = (length) => {
  const randomChars = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
};

const randomGenerator = () => {
  const number = getNumber();
  let random;
  switch (number) {
    case 0:
      random = getNumber(max);
      break;
    case 1:
      random = Math.random() * (max - min) + min;
      break;
    case 2:
      random = getRandomString(20);

      break;
    case 3:
      random = (Math.random() + 1).toString(36).substring(min);
      break;
  }
  if (random) {
    console.log(random);
    if (isFileExists()) {
      appendFile(random);
    } else {
      createFile(random);
    }
    return true;
  }
  return false;
};

const isFileExists = () => {
  if (fs.existsSync(fileName)) {
    return true;
  }
  return false;
};

const createFile = (random) => {
  fs.writeFile(fileName, random, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

const appendFile = (random) => {
  fs.appendFile(fileName, `,${random}`, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

module.exports = randomGenerator;
