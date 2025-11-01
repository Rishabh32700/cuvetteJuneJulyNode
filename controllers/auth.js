const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Users = require("../Models/user");


async function signUp(req, res){
    const {first_name, last_name, email, gender, password} = req.body
    if(!first_name || !email || !password || !gender){
        return res.status(400).json({status: 400, message:"Some fields are missing !!!"})
    }

    const hashedPass = await bcrypt.hash(password, 10)
    const user = await Users.create({
    first_name: first_name,
    last_name: last_name,
    email: email,
    gender: gender,
    password : hashedPass
  });

  res.status(200).json({
    status: 201,
    message: "user craeted successfully !!!",
    userEntry: user,
  })
}

async function login(req,res){
    const {email, password} = req.body;
    const user = await Users.findOne({email})

    if(!user){
        return req.status(200).json({status: 404, message:"User not found !!!"})
    }

    const isValidPass = await bcrypt.compare(password, user.password)
    if(!isValidPass){
        return res.status(200).json({status:401, message:"invalid credentials !!!"})
    }

    const token = jwt.sign(
        {id: user._id, roles:"USER"},
        "SECRET_KEY",
        {expiresIn: '1h'}
    )
    return res.json({message:"Login success !!!", token})
}

module.exports={signUp, login}