import axios from "axios";
import { Request, Response } from "express";
const { runPythonCode } = require("./Executor.ts");

export const sendToFastAPI = async (req: Request, res: Response) => {
   try {

         const { code } = req.body;
        const output = await runPythonCode(code);
        res.status(500).json({ output });
    } catch (error) {
        console.error("Error processing fraud check:", error);
        res.status(500).json({ error: "Error processing fraud check" });
    }
};

