const path = require("path");
const config = require("dotenv").config({
  path: path.resolve(__dirname, `env/${process.env.NODE_ENV}.env`),
});
module.exports = config;
