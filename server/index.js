require("./config");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { getDevices, parseResponse } = require("./tv");

const app = express();

//* config
const HOST = process.env.HOST;
const PORT = process.env.PORT;

//* middleware
app.use(morgan("tiny"));
app.use(cors());

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
    res.status(200).send({ success: true, data: tvResponse.devices });
  } catch (err) {
    //* err thown by parseResponse()
    res.status(200).send({ success: false, data: err });
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
