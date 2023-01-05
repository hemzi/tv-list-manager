require("./config");

const express = require("express");
const morgan = require("morgan");
const { getDevices } = require("./tv");

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
    let orc = await getDevices();
    if (orc.hasOwnProperty("error")) {
      throw Error("There was an error, kek.");
    }
    res.status(200).send("Lok'tar ogar!");
  } catch (err) {
    //TODO: function for parsing errors from TV?
    res.status(200).send(err.message);
  }
});

app.put("/api/devices/:id", (req, res) => {
  // update device
});

app.delete("/api/devices/:id", (req, res) => {
  // delete device
});

//* intialize
app.listen(PORT, () => {
  console.log(`Listening @ ${HOST}:${PORT}`);
});
