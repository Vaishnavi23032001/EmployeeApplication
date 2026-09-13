require("dns").setServers(["1.1.1.1"]);
require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./config/parse");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Parse Server middleware
// app.use("/parse", parseServer.app);

// API routes
app.use("/api/employees", employeeRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Employee Manager Backend is running",
    parseServerUrl: process.env.PARSE_SERVER_URL,
    status: "ok"
  });
});

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
  console.log(`Parse Server running on http://localhost:${PORT}/parse`);
});