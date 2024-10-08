//Business logic
const User = require("../models/userModel.js");

const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    const { email } = userData;
    const userExit = await User.findOne({ email });
    if (userExit) {
      return res.status(400).json({ message: "User already exist" });
    }
    const saveUser = await userData.save();
    res.status(200).json(saveUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
  }
};

const fetch = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updateUser)
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
  }
};

const deleteUser = async (req, res) =>{
  try {
    const id = req.params.id;
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User Not Found" });
    }
    await User.findByIdAndDelete(id);
    res.status(201).json({message: "User deleted successfully"})
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
  }
}

module.exports = {
  create,
  fetch,
  update,
  deleteUser
}