const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const PORT = 3000;

mongoose
  .connect(process.env.db)
  .then(() => {
    console.log("connection to database successful");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "localhost", (err) => {
  if (err) console.log(err);
  console.log(`listening at port ${PORT}`);
});

app.get("/", (re, res) => {
  res.send("hello world");
});
