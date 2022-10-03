const jwt = require("jsonwebtoken");
require("dotenv").config();
const {secret} = process.env;

const fallback = (val, def) =>{
    return val?val:def;
}

module.exports = {
    fallback
}