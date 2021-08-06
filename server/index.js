const express = require("express");
const app = express();
const randomGenerator = require("./randomGenerator");
const report = require("./report");
const cors = require("cors");
const fs = require("fs");
const fileName = __dirname + "_randomFile.txt";
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

const PORT = 4000;

const generateRandom = async (req, res, next) => {
  try {
    const random = randomGenerator();
    console.log("random", random);
    if (random) {
      res.send(random);
    } else {
      res.send(false);
    }
  } catch (err) {
    next(err);
  }
};
const getReport = async (req, res, next) => {
  try {
    result = report();
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
};

const downloadReport = async (req, res, next) => {
  var stream = fs.createReadStream(fileName);
  stream.on("error", function (error) {
    res.writeHead(404, "Not Found");
    res.end();
  });

  stream.pipe(res);
};

app.get("/generate", generateRandom);
app.get("/getReport", getReport);
app.get("/downloadReport", downloadReport);


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

module.exports = app;
