const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Sign up process
exports.createUser = async (req, res) => {
  const { name, email, role, password, image } = req.body;
  console.log(role);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
      imagePath: image,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login process
exports.getUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.userId = user._id;
      const userId = user._id;
      console.log("SessionID: ", req.session.userId);
      res
        .status(200)
        .json({ message: "Logged in successfully", userId: userId });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Dashboard process
exports.getActiveUser = async (req, res) => {
  const userId = req.params.id;
  console.log("Session userId: ", userId);

  if (userId) {
    try {
      const user = await User.findById(userId);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(401).json({
      message: "Please log in first to access the dashboard",
    });
  }
};
