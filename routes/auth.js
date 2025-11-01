const express = require("express");
const authRouter = express.Router();
const {signUp, login, signUp} = require('../controllers/auth')

authRouter.post("/signup", signUp)
authRouter.post("/login", login)

module.exports = authRouter