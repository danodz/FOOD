"use strict";
// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieSession = require("cookie-session")
require("dotenv").config();
const {cookieSecret} = process.env;

const {
    signup,
    signin,
    signout,
    currentUser
} = require("./handlers/users");

const {
    editFood,
    getFood,
    searchFoods
} = require("./handlers/Foods");

express()
    .use(morgan("tiny"))
    .use(helmet())
    .use(express.json())
    .use(cookieSession({
        name: "userAuth",
        secret: cookieSecret,
        httpOnly: true
    }))

    //users
    .get("/currentUser", currentUser)
    .post("/signin", signin)
    .post("/signout", signout)
    .post("/signup", signup)

    //foods
    .post("/editFood", editFood)
    .get("/searchFoods/:page", searchFoods)
    .get("/getFood/:_id", getFood)

    .get("*", (req, res) => {
        res.status(404).json({
            status: 404,
            message: "This is obviously not what you are looking for.",
        });
    })
    .listen(8000, () => console.log(`Listening on port 8000`));