// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp", function (req, res) {
  const date = dateJSON();
  return res.json(date);
});

app.get("/api/timestamp/:date", function (req, res) {
  const dateParams = req.params.date;
  const date = dateJSON(dateParams);
  return res.json(date);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

function dateJSON(dateDate) {
  let _date;

  if (!!Number(dateDate)) {
    dateDate = Number(dateDate);
  }

  if (!dateDate) {
    _date = new Date();
  } else {
    _date = new Date(dateDate);
  }

  if (_date + "" === "Invalid Date") {
    return { error: "Invalid Date" };
  }

  const unix = _date.getTime() * 1000; // unix date
  const utc = _date.toUTCString(); // utc date

  return { unix, utc };
}
