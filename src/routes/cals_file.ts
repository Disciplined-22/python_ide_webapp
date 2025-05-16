// src/routes/dataRoutes.ts
import express from "express";
import { sendToFastAPI } from "../controllers/dataController";

const router = express.Router();

router.post("/cal", sendToFastAPI);

export default router;
