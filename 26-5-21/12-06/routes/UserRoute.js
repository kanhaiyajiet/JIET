const express = require("express");
//const User = require("../models/User");
const router = express();
//const mongoose = require("mongoose");
const userController = require("../controller/UserController");//use in User Controller
//((1) go to UserController)
//const isEmailCorrect = require("../middileware/IsEmailCorrect");//use in is Emailcorrect

const tokenMiddleware = require("../middileware/IsTokenValid");

router.post("/signup", userController.signup);
//((1)go to UserController)
/* router.post("/signup", (req, res) => {
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
}); */

router.post("/login", userController.login);
//((1)go to usercontroller)
/* router.post("/login", (req, res) => {
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
  }); */
//id to find code(43 to 55 and line-4)((1)hide because)
 /*   router.get("/user/:id", (req, res) => {
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
   }); */


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
  //(because this logic is used in UserController.js)
 /*  router.put("/update/:id", (req, res) => {
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
}); */

router.get("/user/:id", userController.getUserById);
//router.put("/update/:id", userController.findUserByFirstNameAndLastName);//User controller use

router.put("/update/:id", tokenMiddleware.isTokenValid, userController.updateUser);

// find by name (http://localhost:7000/get-user?firstName=kanhaiya&lastName=kumar) go to Query then input firstName and Last name
//((1) go to usercontroller)
/* router.get("/get-user", (req, res) => {
    let { firstName, lastName } = req.query;
    User.find({ firstName: firstName, lastName: lastName })
    .then((userArray) => {
        if (userArray.length === 0) {
            console.error(
                `No user were found with first name: ${firstName} & last name:${lastName}`
                );
            return res.status(404).send("No user found");
        }
        return res.status(200).send(userArray);
    })
    .catch((error)  => {
        console.error("Error occured", error);
        return res.status(500).send("ERROR");
    });
}); */

//((1)hide because go to UserController)
//this condition to check email by isEmailcorrect.js
/* router.get("/test", isEmailCorrect.isEmailCorrect, (req, res) => {
    console.log(req.body);
    return res.status(200).send(req.body);
}); */

//this condition to check email
//this is hide because this code is use in isEmailcorrect.js
/* router.get("/test", (req, res) => {
    if (req.body.email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
        console.log(req.body);
        return res.status(200).send(req.body);
    }
    return res.status(400).send("Wrong email")
}); */
router.get("/token", tokenMiddleware.isTokenValid, userController.isValid);
module.exports = router;