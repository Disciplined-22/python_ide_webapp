"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToFastAPI = void 0;
const axios_1 = __importDefault(require("axios"));
const sendToFastAPI = async (req, res) => {
    try {
        const text = "HELLO WORLD"; // Expecting "text" instead of "nftData"
        const fastApiUrl = process.env.FASTAPI_URL || "http://localhost:8000/api/analyze";
        const response = await axios_1.default.post(fastApiUrl, { text }); // Match Postman request format
        res.json(response.data);
    }
    catch (error) {
        console.error("Error processing fraud check:", error);
        res.status(500).json({ error: "Error processing fraud check" });
    }
};
exports.sendToFastAPI = sendToFastAPI;
