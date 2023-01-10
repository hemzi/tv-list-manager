require("./config");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { getDevices, deleteDevice, parseResponse } = require("./tv");

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
    const tvResponse = await getDevices();
    // console.log(tvResponse);
    parseResponse(tvResponse); //! this may be too abstracted?
    res.status(200).send({ success: true, data: tvResponse.devices });
  } catch (err) {
    //* err thown by parseResponse()
    res.status(200).send({ success: false, data: err });
  }
});

app.put("/api/devices/:device_id", async (req, res) => {
  // update device
});

app.delete("/api/devices/:device_id", async (req, res) => {
  // delete device
  //! DELETE does not return content (tvRespons = json = content),
  //! so if there is content, it's an error that needs to be parsed
  // try {
  const tvResponse = await deleteDevice(req.params.device_id);
  if (tvResponse.body) {
    parseResponse(tvResponse.json()); //! this may be too abstracted?
  }
  //   res.status(200).send({ success: true });
  // } catch (err) {
  //   //* err thown by parseResponse()
  //   res.status(200).send({ success: false, data: err });
  // }
  res.status(200).send({ success: true });
});

//* intialize
app.listen(PORT, () => {
  console.log(`Listening @ ${HOST}:${PORT}`);
});
