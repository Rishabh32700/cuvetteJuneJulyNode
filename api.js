const express = require("express");
const { connectToMongo } = require("./connections");

const app = express();
const cors = require("cors");

const userRouter = require("./routes/user");
const { checkMalfunction, authenticateUser } = require("./middleware/index");

// connection
connectToMongo("mongodb://127.0.0.1:27017/hellohello");

app.use(cors());

// middlewares
app.use(express.urlencoded({ extended: false })); // middleWare
app.use(checkMalfunction())
app.use(authenticateUser())

// routes
app.use("/api/users", userRouter);

app.listen(8000, () => {
  console.log("server started !!!");
});
