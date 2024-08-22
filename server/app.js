const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const startupRoutes = require("./routes/startupRoutes");
const governmentRoutes = require("./routes/governmentRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

// Connect to Database
connectDB();

// Init Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/startups", startupRoutes);
app.use("/api/government", governmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
