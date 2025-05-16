"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/dataRoutes.ts
const express_1 = __importDefault(require("express"));
const dataController_1 = require("../controllers/dataController");
const router = express_1.default.Router();
router.post("/check-fraud", (req, res, next) => {
    console.log("Received request at /check-fraud");
    next();
}, dataController_1.sendToFastAPI);
exports.default = router;
