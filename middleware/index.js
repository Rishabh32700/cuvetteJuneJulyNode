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

function authenticateUser() {
  return (req, res, next) => {
    console.log("middleware 2 called !!!");
    if (
      req.headers.authorization &&
      req.headers.authorization ===
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc1Nzk1ODMxODU5Miwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzU3OTU4MzI3LCJleHAiOjE3NTc5NjE5Mjd9.EIdQK_aOCGY9aPgC6O5YhiveLpp-sFsLkzVkBM-VVvs"
    ) {
      req.headers.hello = "hieee";
      next();
    } else {
      res.send("user not logged in !!!");
    }
  };
}

module.exports = {
  checkMalfunction,
  authenticateUser,
};
