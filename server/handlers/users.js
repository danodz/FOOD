const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const {db} = require("../db")

require("dotenv").config();
const {secret} = process.env;

//users
const signup = async (req, res) => {
    try {
        const exists = await db.collection("users").findOne({username: req.body.username})
        console.log(exists)
        if(exists){
            return res.status(409).json({ message: "username already used" });
        }

        user = {
            _id: uuidv4(),
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        };
        await db.collection("users").insertOne(user);

        req.session.token = jwt.sign({ user: user._id }, secret, {
            expiresIn: 86400, // 24 hours
        });

        delete user.password;
        res.status(200).json({status: 200,data:user, message: "signup success" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const signin = async (req, res) => {
    try {
        const user = await db.collection("users").findOne({username: req.body.username});
    
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
    
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
    
        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!",
            });
        }
        delete user.password;
    
        req.session.token = jwt.sign({ user: user._id }, secret, {
            expiresIn: 86400, // 24 hours
        });
    
        return res.status(200).send({ status: 200, data: user,message: "signin success"});
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({
            status: 200,
            message: "signout success"
        });
    } catch (err) {
        return res.status(500).send({ message: error.message });
    }
}

const currentUser = async (req, res) => {
    const token = req.session.token;
    if (!token) {
        return res.status(200).json({status: 200, message: "no user currently signed in"})
    }

    const _id = jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return null;
        }
        return decoded.user;
    });
    const user = await db.collection("users").findOne({_id})
    delete user.password;
    if(user)
        res.status(200).json({status: 200, data: user, message: "user retrieved"})
    else
        res.status(500).json({status: 500, message: "User is logged in but not found"})
}

const getUserProfile = async (req, res)=>{
    const _id = req.params.user
    
    const user = await callDb(async(db)=>{
        return await db.collection("users").findOne({_id})
    });

    if(user) {
        res.status(200).json({
        status: 200,
        message: "Data retrieved successfully",
        data: user
        });
    } else {
        res.status(400).json({
        status: 400,
        message: "Data not found",
        });
    }
}



module.exports = {
    signup,
    signin,
    signout,
    currentUser,
    getUserProfile
}