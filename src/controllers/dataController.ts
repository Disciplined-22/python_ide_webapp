import axios from "axios";
import { Request, Response } from "express";


export const sendToFastAPI = async (req: Request, res: Response) => {
    try {

        
        console.log("hi")
        res.status(200).json({ success: "its successful" });
       
    } catch (error) {
        console.error("Error processing fraud check:", error);
        res.status(500).json({ error: "Error processing fraud check" });
    }
};

