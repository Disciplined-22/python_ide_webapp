const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

// Directory for temporary files
const TEMP_DIR = path.join(__dirname, "temp");

// Ensure temp directory exists
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
}

/**
 * Executes Python code by writing it to a temp file and running it.
 * @param {string} code - The Python code to execute.
 * @returns {Promise<string>} - The output or error message.
 */
function runPythonCode(code :string) {
    return new Promise((resolve, reject) => {
        const filename = `temp_${Date.now()}.py`;
        const filePath = path.join(TEMP_DIR, filename);

        // Write code to a temp file
        fs.writeFile(filePath, code, (err : string) => {
            if (err) return reject(err);

            // Execute the Python code
            exec(`python ${filePath}`, (error : string, stdout :string, stderr : string) => {
                // Delete the temp file after execution
                fs.unlink(filePath, () => {});

                if (error) {
                    reject(stderr.trim());
                } else {
                    resolve(stdout.trim());
                }
            });
        });
    });
}

module.exports = { runPythonCode };
