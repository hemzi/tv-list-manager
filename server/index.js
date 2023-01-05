const express = require("express");
const morgan = require("morgan");

const app = express();

//* middleware
app.use(morgan("tiny"));

//* health check
app.get("/alive", (req, res) => {
  res.send({ message: "great success" });
});

//* api proxy endpoints
app.get("/api/devices", (req, res) => {
  // get devices
});

app.put("/api/devices/:id", (req, res) => {
  // update device
});

app.delete("/api/devices/:id", (req, res) => {
  // delete device
});

//* intialize
app.listen(3000, () => {
  console.log("listening");
});
