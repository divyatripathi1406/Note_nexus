require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/error");

if (!process.env.MONGO_URI) throw new Error("MONGO_URI not set");

const app = express();
connectDB();

app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (_req, res) => res.send("NoteNexus API is running"));

app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/classes", require("./src/routes/class.routes"));
app.use("/api/notes", require("./src/routes/notes.routes"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 API running on port ${PORT}`));
