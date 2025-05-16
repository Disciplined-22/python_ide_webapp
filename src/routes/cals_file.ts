// src/routes/dataRoutes.ts
import express from "express";
import { sendToFastAPI } from "../controllers/dataController";

const router = express.Router();

router.post("/check-fraud", sendToFastAPI);

export default router;
