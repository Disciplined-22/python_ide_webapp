// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cals_file from "./routes/cals_file";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


// Root route to display a message in the browser
app.get("/", (req, res) => {
    res.send("Server is running! 🚀");
});

console.log("Registering routes...");
app.use("/api/cals_file", cals_file);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Express API running on http://localhost:${PORT}`);
});
