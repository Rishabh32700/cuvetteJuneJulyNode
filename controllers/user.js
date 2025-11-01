const Users = require("../Models/user");

async function handleGetAllUsers(req, res) {
  const users = await Users.find();
  console.log("api/users called !!!", users);
  return res.status(200).json(users);
}

const findUser = async (id) => {
  const user = await Users.find((ele, idx) => {
    return ele.id == id;
  });
  return user;
};

async function handleGetUserById(req, res) {
  return res.json(findUser(req.params.id));
}

async function handleUpdateUserById(req, res) {
  const user = findUser(req.params.id);
  // some db queries to modify this user
  return res.json(user);
}

async function handleDeleteUserById(req, res) {
  const updatedUsers = Users.filter((user) => {
    console.log(user.id, req.params.id);
    return user.id != req.params.id;
  });
  console.log(updatedUsers);
}
async function handleCreateNewUser(req, res) {
  // create a entry in db
  const body = req.body;
  console.log("data => ", body);
  if (!body.first_name || !body.email || !body.gender) {
    return res
      .status(200)
      .json({ status: 400, message: "some required fields are missing !!!" });
  }
  const userEntry = await Users.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
  });

  return res.status(200).json({
    status: 201,
    message: "user craeted successfully !!!",
    userEntry: userEntry,
  });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
