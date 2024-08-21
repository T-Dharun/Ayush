const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const startupRoutes = require("./routes/startupRoutes");
const governmentRoutes = require("./routes/governmentRoutes");
const app = express();
require("dotenv").config();
const cors = require("cors");
// Connect to Database
connectDB();
// Init Middleware
app.use(cors());
app.use(express.json());
// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/startups", startupRoutes);
app.use("/api/government", governmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
