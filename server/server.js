"use strict";
// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

express()
    .use(morgan("tiny"))
    .use(express.json())
    .get("/hello", (req, res) => {
        res.status(200).json({
            status: 200,
            message: "Good stuff",
        });
    })
    .get("*", (req, res) => {
        res.status(404).json({
            status: 404,
            message: "This is obviously not what you are looking for.",
        });
    })
    .listen(8000, () => console.log(`Listening on port 8000`));