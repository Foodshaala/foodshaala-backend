const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const sellerRouter = require("./routes/seller");
const foodRouter = require("./routes/food");
//init
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authRouter);
app.use(sellerRouter);
app.use(foodRouter);

//db connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.db)
  .then(() => {
    console.log("connection to database successful");
    //listening
    app.listen(PORT, "localhost", (err) => {
      if (err) console.log(err);
      console.log(`listening at port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
