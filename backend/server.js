const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors"); // Import the cors package
const session = require("express-session");
const userRoutes = require("./routes/userRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use("/user-images", express.static(path.join(__dirname, "user-images")));

// Configure session middleware
app.use(
  session({
    secret: "qwertyuiopasdfghjklzxcvbnm", // replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set to true if using HTTPS
  })
);

// Configure CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust to your frontend URL
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/student-ms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
