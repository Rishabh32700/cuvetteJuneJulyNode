const jwt = require("jsonwebtoken");

const malfunction = false;

function checkMalfunction() {
  return (req, res, next) => {
    console.log("middleware 1 called !!!");
    if (malfunction) {
      res.send("malfuncioned request !!!");
    } else {
      next();
    }
  };
}

function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startswith("Bearer ")) {
    return res
      .status(200)
      .json({ status: 401, message: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, "SECRET_KEY", (err, decoded) => {
    if (err)
      return res.status(200).json({ status: 403, message: "invalid request" });
    req.user = decoded;
    next();
  });
}

module.exports = {
  checkMalfunction,
  authenticateUser,
};
