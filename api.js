const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const cors = require("cors");
const fs = require("fs");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/hellohello")
  .then(() => {
    console.log("mongoose connected !!!");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("byes", userSchema);

app.use(cors());
app.use(express.urlencoded({ extended: false })); // middleWare
const malfunction = false;

const findUser = (id) => {
  const user = users.find((ele, idx) => {
    return ele.id == id;
  });
  return user;
};

app.use((req, res, next) => {
  console.log("middleware 1 called !!!");
  if (malfunction) {
    res.send("malfuncioned request !!!");
  } else {
    next();
  }
});
app.use((req, res, next) => {
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
});

app.get("/users", async (req, res) => {
  const allUsers = await User.find();
  console.log(allUsers);
  
  const html = ` 
    <ul>
        ${allUsers.map((user) => {
          return `<li>${user.first_name}</li>`;
        })} 
    </ul>`;
  return res.send(html);
});

app.get("/api/users", (req, res) => {
  console.log("api/users called !!!", req.headers);
  return res.status(200).json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    return res.json(findUser(req.params.id));
  })
  .patch((req, res) => {
    const user = findUser(req.params.id);
    // some db queries to modify this user
    return res.json(user);
  })
  .delete((req, res) => {
    const updatedUsers = users.filter((user) => {
      console.log(user.id, req.params.id);
      return user.id != req.params.id;
    });
    console.log(updatedUsers);

    // some db queries to delete this user
    fs.writeFile(
      "./MOCK_DATA.json",
      JSON.stringify(updatedUsers),
      (err, data) => {
        if (err) {
          res.send("some Error => ", err);
        } else {
          res.send("user Deleted !!!");
        }
      }
    );
  });

app.post("/api/users", async (req, res) => {
  // create a entry in db
  const body = req.body;
  console.log("data => ", body);
  if (!body.first_name || !body.email || !body.gender) {
    return res
      .status(400)
      .json({ status: 400, message: "some required fields are missing !!!" });
  }
  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   if (err) {
  //     res.send("some Error => ", err);
  //   } else {
  //     res.status(201).send("user created !!!");
  //   }
  // });

  const userEntry = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
  });

  return res
    .status(200)
    .json({
      status: 200,
      message: "user craeted successfully !!!",
      userEntry: userEntry,
    });
});

app.listen(8000, () => {
  console.log("server started !!!");
});
