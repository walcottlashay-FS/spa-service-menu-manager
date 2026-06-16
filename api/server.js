const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const serviceRoutes = require("./routes/services");

const app = express();

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors());
app.use(express.json());

app.use("/api/services", serviceRoutes);

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });