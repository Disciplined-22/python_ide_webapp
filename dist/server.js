"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const dataRoutes_1 = __importDefault(require("./routes/dataRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Root route to display a message in the browser
app.get("/", (req, res) => {
    res.send("Server is running! 🚀");
});
console.log("Registering routes...");
app.use("/api/data", dataRoutes_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Express API running on http://localhost:${PORT}`);
});
