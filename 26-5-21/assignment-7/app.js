const express = require("express");
const mongoose = require("mongoose");
const app = express();
//const axios = required("axios");

const User = require("./models/User");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/jiet", {
    useunifiedTopology: true,
    useNewUrlparser: true,
  })
  .then(() => {
    console.info("MongoDB connected successfully");
  })
  .catch(() => {
    console.error("MongoDB connection failed.");
});

app.post("/signup", (req, res) => {
    let { firstName, lastName, email, password, dob } = req.body;
    let user = new User ({
        firstName,
        lastName,
        email,
        password,
        dob,
    });
    user
      .save()
      .then(() => res.status(200).send(user))
      .catch((error) => {
          console.error(error);
          return res.status(500).send("ERROR");
      });
});

const PORT = 7000;

app.listen(PORT, () => {
  console.log(`my server is running on port: ${PORT}`);
});
