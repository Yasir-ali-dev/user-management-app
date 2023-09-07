const User = require("../models/userModel");
// all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email created");
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

// add user
const addUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(200).json({ message: "user is created successfully" });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

const getUser = async (req, res) => {
  let { userId } = req.params;
  userId = userId.slice(1);
  try {
    const user = await User.findOne({ _id: userId });
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

const deleteUser = async (req, res) => {
  let { userId } = req.params;
  userId = userId.slice(1);
  try {
    const user = await User.findOneAndDelete({ _id: userId });
    res
      .status(200)
      .json({ msg: `user with id ${userId} has successfully deleted` });
  } catch (error) {
    res.status(404).json({ err: error });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.userId.slice(1);
  try {
    const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
    });
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
};
