require("./config");

const express = require("express");
const morgan = require("morgan");
const { getDevices, parseResponse } = require("./tv");

const app = express();

//* config
const HOST = process.env.HOST;
const PORT = process.env.PORT;

//* middleware
app.use(morgan("tiny"));

//* health check
app.get("/alive", (req, res) => {
  res.send({ message: "great success" });
});

//* api proxy endpoints
app.get("/api/devices", async (req, res) => {
  // get devices
  try {
    let tvResponse = await getDevices();
    parseResponse(tvResponse); //! this may be too abstracted?
    res.status(200).send(tvResponse.devices);
  } catch (err) {
    //TODO: function for parsing errors from TV?
    res.status(200).send({ error: err.message });
  }
});

app.put("/api/devices/:id", async (req, res) => {
  // update device
});

app.delete("/api/devices/:id", async (req, res) => {
  // delete device
});

//* intialize
app.listen(PORT, () => {
  console.log(`Listening @ ${HOST}:${PORT}`);
});
