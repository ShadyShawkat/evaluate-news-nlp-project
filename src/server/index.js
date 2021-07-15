const dotenv = require("dotenv");
dotenv.config();

var path = require("path");
const express = require("express");
var request = require("request");
const mockAPIResponse = require("./mockAPI.js");
const cors = require("cors");
let endPointData = {};

const application_key = process.env.API_KEY;

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

app.get("/", function (res) {
  res.sendFile(path.resolve("dist/index.js"));
});

app.post("/getData", (req, res) => {
  request(
    `https://api.meaningcloud.com/sentiment-2.1?key=${application_key}&url=${req.body.url}&lang=en`,
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        endPointData.score_tag = JSON.parse(body).score_tag;
        endPointData.subjectivity = JSON.parse(body).subjectivity;
        endPointData.agreement = JSON.parse(body).agreement;
        endPointData.model = JSON.parse(body).model;
        endPointData.irony = JSON.parse(body).irony;
        endPointData.confidence = JSON.parse(body).confidence;
        res.send(body);
      } else {
      res.send('Not permitted')
    }
    }
  );
});


app.get("/sendData", (req, res) => {
    res.send(endPointData);
});

app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});


module.exports = app;