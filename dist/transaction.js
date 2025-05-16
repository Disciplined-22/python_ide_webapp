"use strict";
// under testing
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
async function fetchTransaction(txSignature) {
    // Initialize RPC client
    const rpcUrl = "https://api.devnet.solana.com";
    const commitment = "confirmed";
    const connection = new web3_js_1.Connection(rpcUrl, commitment);
    try {
        // Convert string to TransactionSignature (base58-encoded string)
        const signature = txSignature;
        // Fetch transaction details
        const tx = await connection.getTransaction(signature, {
            commitment: "confirmed",
            // encoding: "json",
        });
        if (!tx) {
            console.error("Transaction not found");
            return;
        }
        // Extract sender and receiver (first and second accounts)
        const accountKeys = tx.transaction.message.accountKeys;
        const sender = new web3_js_1.PublicKey(accountKeys[0]);
        const receiver = new web3_js_1.PublicKey(accountKeys[1]);
        console.log("Transaction Details:");
        console.log("- Blocktime:", tx.blockTime);
        console.log("- Transaction:", tx.transaction);
        // Please add it later, data type and access knowledge problem
        console.log("- Sender:", sender.toBase58());
        console.log("- Receiver:", receiver.toBase58());
    }
    catch (error) {
        console.error("Error fetching transaction:", error);
    }
}
// Example usage
// Input: Transaction Signature (e.g., 5VERv8...kQUW)
// → Output: Sender, Receiver, Blocktime
