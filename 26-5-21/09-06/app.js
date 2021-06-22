const express = require("express");
const app = express();
const axios = require("axios")
//const bodyparser = require("body-parser");

//app.use(bodyparser.urlencoded({ extended: false }));
//app.use(bodyparser.json());

app.get("/", (req, res) => {
    res.status(200).send("Hello World");
});

app.get("/about-us", (req, res) => {
    res.status(200).send("This is about us page");
});

app.post("/login", (req, res) => {
    //console.log(req.body);
    //res.status(200).send("post successful");
    const email = req.body.email;
    const password = req.body.password;
    if(password === "123456789"){
        return res.status(200).send("password is correct!");
    }
    return res.status(401).send("incorrect password");
    //res.status(200).send({ email, password });
});

app.get("/pokemon", (req, res) => {
    axios
    .get("https://pokeapi.co/api/v2/ability/7/")
    .then((response) => {
      console.log(response.data);
      return res.status(200).send(response.data);
    })
    .catch((error) => {
        return res.status(500).send("error");
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`my server is a running on port ${PORT}`);
});