const jwt = require("jsonwebtoken");
require("dotenv").config();
const {secret} = process.env;
const { v4: uuidv4 } = require("uuid");
const { db } = require("./db");

const fallback = (val, def) =>{
    return val?val:def;
}

const newFood = async (food, userId)=>{
    food._id = uuidv4();
    food.userId = userId
    const dbRes = {}
    dbRes.new = await db.collection("foods").insertOne(food);
    dbRes.history = await db.collection("foodsHistory").insertOne({_id:food._id, versions:[]});
    dbRes.user = await db.collection("users").updateOne({_id:userId}, {$push: {foods: food._id}})
    return {dbRes, _id:food._id}
}

module.exports = {
    fallback,
    newFood
}