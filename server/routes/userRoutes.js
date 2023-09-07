const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/").get(getAllUsers).post(addUser);

router.route("/:userId").get(getUser).delete(deleteUser).put(updateUser);

module.exports = router;
