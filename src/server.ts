// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dataRoutes from "./routes/dataRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


// Root route to display a message in the browser
app.get("/", (req, res) => {
    res.send("Server is running! 🚀");
});

console.log("Registering routes...");
app.use("/api/data", dataRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Express API running on http://localhost:${PORT}`);
});
