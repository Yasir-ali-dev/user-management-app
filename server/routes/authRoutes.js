const express = require("express");
const router = express.Router();

const { signIn, signOut } = require("../controllers/authController");

router.route("/signin").post(signIn);

router.route("/signout").get(signOut);

module.exports = router;
