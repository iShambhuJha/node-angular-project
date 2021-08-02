//Lets require import the FS module
var fs = require("fs");

// Express can be used as a web framework for building a rest API
var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors()); // enable CORS to allow requests from frontend

var nodestatic = require("node-static");

// register handler to return driver data
app.get("/getDrivers", function (req, res) {
  fs.readFile("./index.get.json", "utf8", (err, data) => {
    res.send(data);
  });
});

var randopeep = require("randopeep");
/*
 * randopeep is for generating stuff that we can include in our fake data.
 * */

// Start the REST API server
const server = app.listen(3000, function () {
  console.log(`API Server is running`);
});
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`connection id: ${socket.id}`);
  sendData(socket);
});

//Emitting the new location every 5 second
function sendData(socket) {
  var read = [];
  read = JSON.parse(fs.readFileSync("./index.get.json", "utf8"));
  read.forEach((element) => {
    element["location"] = randopeep.address.geo();
  });
  socket.emit("update event", read);
  setTimeout(() => {
    sendData(socket);
  }, 5000);
}
