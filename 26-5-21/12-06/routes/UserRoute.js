const express = require("express");
const User = require("../models/User");
const router = express();
const mongoose = require("mongoose");

router.post("/signup", (req, res) => {
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

router.post("/login", (req, res) => {
    let { email, password } = req.body;
    User.findOne({ email: email })
     .then((user) => {
       console.log(user);  
       console.info(`User with email: ${email} was successfully found`);
       if (password === user.password) {
          console.info("Login successful");
          return res.status(200).send(user);
      }
      console.warn("Password incorrect");
      return res.status(401).send("Password was incorrect");
    })
    .catch((error) => {
        console.error(`User with email: ${email} does not exist!`);
        return res.status(404).send(`User with email: ${email} doesn't exist!`);
    });
  });
//id to find code(43 to 55 and line-4)
   router.get("/:id", (req, res) => {
       let id = req.params.id;
       id = mongoose.Types.ObjectId(id);
       User.findOne({ _id: id })
       .then((user) => {
           console.info("User found");
           return res.status(200).send(user);
       })
       .catch((error) => {
           console.error(error);
           return res.status(500).send("ERROR");
        });
   });

 /*  router.put("/update/:email", (req, res) => {
      let { email, password, firstName, lastName, dob } = req.body;
      let emailParam = req.params.email;
      User.updateOne(
          { email: emailParam},
          { $set: { email, password, firstName, lastName } }
      )
      .then(() => {
          console.info("Update.successful");
          return res.status(200).send({ email, password, firstName, lastName, dob });
      })
      .catch((error) => {
          console.error("There was an error while updating!");
          return res.status(500).send("There was an error while updating the user");
      });
  }); */

  // id to update(75 to 91)
  router.put("/update/:id", (req, res) => {
    let { email, password, firstName, lastName, dob } = req.body;
    let id = req.params.id;
    id = mongoose.Types.ObjectId(id);
    User.updateOne(
        { id: id },
        { $set: { email, password, firstName, lastName } }
    )
    .then(() => {
        console.info("Update.successful");
        return res.status(200).send({ email, password, firstName, lastName, dob });
    })
    .catch((error) => {
        console.error("There was an error while updating!");
        return res.status(500).send("There was an error while updating the user");
    });
});
module.exports = router;