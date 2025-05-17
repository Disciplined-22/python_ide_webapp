// import { NextApiRequest, NextApiResponse } from "next";
// import { exec } from "child_process";
// import path from "path";
// import fs from "fs";

// const TEMP_DIR = path.join(process.cwd(), "temp");

// // Ensure temp directory exists
// if (!fs.existsSync(TEMP_DIR)) {
//   fs.mkdirSync(TEMP_DIR);
// }

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { code } = req.body as { code: string };

//   if (!code) {
//     return res.status(400).json({ error: "No code provided" });
//   }

//   const filename = `temp_${Date.now()}.py`;
//   const filePath = path.join(TEMP_DIR, filename);

//   fs.writeFile(filePath, code, (err) => {
//     if (err) {
//       console.error("File write error:", err);
//       return res.status(500).json({ error: "File write error" });
//     }

//     exec(`python ${filePath}`, (error, stdout, stderr) => {
//       fs.unlink(filePath, () => {}); // Clean up temp file

//       if (error) {
//         return res.status(500).json({ error: stderr });
//       }

//       res.status(200).json({ output: stdout });
//     });
//   });
// }
