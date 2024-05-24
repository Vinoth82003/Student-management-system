const express = require("express");
const {
  createUser,
  getUser,
  getActiveUser,
} = require("../controllers/userController");
const router = express.Router();

// Routes
router.post("/signup", createUser);
router.post("/login", getUser);
router.get("/dashboard/:id", getActiveUser);

module.exports = router;
