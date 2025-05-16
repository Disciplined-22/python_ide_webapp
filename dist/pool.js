"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePoolInfo = parsePoolInfo;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const raydium_sdk_1 = require("@raydium-io/raydium-sdk");
const serum_1 = require("@project-serum/serum");
const bn_js_1 = __importDefault(require("bn.js"));
async function getTokenAccounts(connection, owner) {
    const tokenResp = await connection.getTokenAccountsByOwner(owner, {
        programId: spl_token_1.TOKEN_PROGRAM_ID,
    });
    const accounts = [];
    for (const { pubkey, account } of tokenResp.value) {
        accounts.push({
            pubkey,
            accountInfo: raydium_sdk_1.SPL_ACCOUNT_LAYOUT.decode(account.data),
            programId: spl_token_1.TOKEN_PROGRAM_ID, // Add this line
        });
    }
    return accounts;
}
// raydium pool id can get from api: https://api.raydium.io/v2/sdk/liquidity/mainnet.json
const SOL_USDC_POOL_ID = "58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2";
const OPENBOOK_PROGRAM_ID = new web3_js_1.PublicKey("srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX");
async function parsePoolInfo() {
    //   const connection = new Connection({mainnet rpc node}, "confirmed");
    const connection = new web3_js_1.Connection("https://api.mainnet-beta.solana.com", "confirmed");
    const owner = new web3_js_1.PublicKey("VnxDzsZ7chE88e9rB6UKztCt2HUwrkgCTx8WieWf5mM");
    const tokenAccounts = await getTokenAccounts(connection, owner);
    // example to get pool info
    const info = await connection.getAccountInfo(new web3_js_1.PublicKey(SOL_USDC_POOL_ID));
    if (!info)
        return;
    const poolState = raydium_sdk_1.LIQUIDITY_STATE_LAYOUT_V4.decode(info.data);
    const openOrders = await serum_1.OpenOrders.load(connection, poolState.openOrders, OPENBOOK_PROGRAM_ID // OPENBOOK_PROGRAM_ID(marketProgramId) of each pool can get from api: https://api.raydium.io/v2/sdk/liquidity/mainnet.json
    );
    const baseDecimal = 10 ** poolState.baseDecimal.toNumber(); // e.g. 10 ^ 6
    const quoteDecimal = 10 ** poolState.quoteDecimal.toNumber();
    const baseTokenAmount = await connection.getTokenAccountBalance(poolState.baseVault);
    const quoteTokenAmount = await connection.getTokenAccountBalance(poolState.quoteVault);
    const basePnl = poolState.baseNeedTakePnl.toNumber() / baseDecimal;
    const quotePnl = poolState.quoteNeedTakePnl.toNumber() / quoteDecimal;
    const openOrdersBaseTokenTotal = openOrders.baseTokenTotal.toNumber() / baseDecimal;
    const openOrdersQuoteTokenTotal = openOrders.quoteTokenTotal.toNumber() / quoteDecimal;
    const base = (baseTokenAmount.value?.uiAmount || 0) + openOrdersBaseTokenTotal - basePnl;
    const quote = (quoteTokenAmount.value?.uiAmount || 0) +
        openOrdersQuoteTokenTotal -
        quotePnl;
    const denominator = new bn_js_1.default(10).pow(poolState.baseDecimal);
    const addedLpAccount = tokenAccounts.find((a) => a.accountInfo.mint.equals(poolState.lpMint));
    console.log("SOL_USDC pool info:", "pool total base " + base, "pool total quote " + quote, "base vault balance " + baseTokenAmount.value.uiAmount, "quote vault balance " + quoteTokenAmount.value.uiAmount, "base tokens in openorders " + openOrdersBaseTokenTotal, "quote tokens in openorders  " + openOrdersQuoteTokenTotal, "base token decimals " + poolState.baseDecimal.toNumber(), "quote token decimals " + poolState.quoteDecimal.toNumber(), "total lp " + poolState.lpReserve.div(denominator).toString(), "addedLpAmount " +
        (addedLpAccount?.accountInfo.amount.toNumber() || 0) / baseDecimal);
}
parsePoolInfo();
// → Input: Pool Address (e.g., 58oQChx...4hNy)
// → Output: Base/Quote Token Balances
