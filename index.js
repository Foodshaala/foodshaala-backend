const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");

//init
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authRouter);

//db connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.db)
  .then(() => {
    console.log("connection to database successful");
  })
  .catch((e) => {
    console.log(e);
  });

//listening
app.listen(PORT, "localhost", (err) => {
  if (err) console.log(err);
  console.log(`listening at port ${PORT}`);
});
