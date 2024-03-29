/**
 * This script can be used to interact with the Add contract, after deploying it.
 *
 * We call the update() method on the contract, create a proof and send it to the chain.
 * The endpoint that we interact with is read from your config.json.
 *
 * This simulates a user interacting with the zkApp from a browser, except that here, sending the transaction happens
 * from the script and we're using your pre-funded zkApp account to pay the transaction fee. In a real web app, the user's wallet
 * would send the transaction and pay the fee.
 *
 * To run locally:
 * Build the project: `$ npm run build`
 * Run with node:     `$ node build/src/interact.js <deployAlias>`.
 */
import fs from 'fs/promises';
import { Mina, PrivateKey, fetchAccount, PublicKey, UInt64 } from 'o1js';
import Token from './token.js';
import { Bridge } from "./Bridge.js";
import Hook from './Hooks.js';
// check command line arg
let deployAlias = process.argv[2];
let targetAlias = process.argv[3];
if (!deployAlias)
    throw Error(`Missing <deployAlias> argument.

Usage:
node build/src/interact.js <deployAlias>
`);
if (!targetAlias)
    throw Error(`Missing <targetAlias> argument.

Usage:
node build/src/interact.js <targetAlias>
`);
Error.stackTraceLimit = 1000;
let configJson = JSON.parse(await fs.readFile('config.json', 'utf8'));
let config = configJson.deployAliases[deployAlias];
let configBridge = configJson.deployAliases[targetAlias];
let feepayerKeysBase58 = JSON.parse(await fs.readFile(config.feepayerKeyPath, 'utf8'));
let zkAppKeysBase58 = JSON.parse(await fs.readFile(config.keyPath, 'utf8'));
let zkBridgeAppKeysBase58 = JSON.parse(await fs.readFile(configBridge.keyPath, 'utf8'));
let feepayerKey = PrivateKey.fromBase58(feepayerKeysBase58.privateKey);
let zkAppKey = PrivateKey.fromBase58(zkAppKeysBase58.privateKey);
let bridgeAppKey = PrivateKey.fromBase58(zkBridgeAppKeysBase58.privateKey);
let zkBridgeAddress = bridgeAppKey.toPublicKey();
let bridgeApp = new Bridge(zkBridgeAddress);
// set up Mina instance and contract we interact with
const MINAURL = 'https://proxy.berkeley.minaexplorer.com/graphql';
// const MINAURL = 'https://api.minascan.io/node/berkeley/v1/graphql';
const ARCHIVEURL = 'https://api.minascan.io/archive/berkeley/v1/graphql/';
const network = Mina.Network({
    mina: MINAURL,
    archive: ARCHIVEURL,
});
Mina.setActiveInstance(network);
const AMOUNT_DEPOSIT = UInt64.from(5000000000000000n);
const AMOUNT_TRANSFER = UInt64.from(5000000000);
const AMOUNT_TRANSFER_USER = UInt64.from(5000000000n);
const fee = Number(config.fee) * 1e9; // in nanomina (1 billion = 1.0 mina)
let feepayerAddress = feepayerKey.toPublicKey();
let zkAppAddress = zkAppKey.toPublicKey();
let zkApp = new Token(zkAppAddress);
let sentTx;
// compile the contract to create prover keys
console.log('compile the contract...');
await Token.compile();
await Hook.compile();
try {
    try {
        const accounts = await fetchAccount({ publicKey: PublicKey.fromBase58("B62qjw28HKUVsuk3fvzmK9dcPUvRwCCcGAjs77k9zdNDiF9sukTrYrF") });
    }
    catch (e) {
        console.log(e);
    }
    // call update() and send transaction
    console.log('build transaction and create proof...');
    let tx = await Mina.transaction({ sender: feepayerAddress, fee }, async () => {
        // AccountUpdate.fundNewAccount(feepayerAddress);
        // zkApp.lock(Field.from(100), zkBridgeAddress, AMOUNT_TRANSFER);
        // bridgeApp.lock(zkAppAddress, AMOUNT_TRANSFER)
    });
    await tx.prove();
    console.log('send transaction...');
    sentTx = await tx.sign([feepayerKey]).send();
}
catch (err) {
    console.log(err);
}
if (sentTx?.hash() !== undefined) {
    console.log(`
Success! Update transaction sent.

Your smart contract state will be updated
as soon as the transaction is included in a block:
${getTxnUrl(config.url, sentTx.hash())}
`);
}
function getTxnUrl(graphQlUrl, txnHash) {
    const txnBroadcastServiceName = new URL(graphQlUrl).hostname
        .split('.')
        .filter((item) => item === 'minascan' || item === 'minaexplorer')?.[0];
    const networkName = new URL(graphQlUrl).hostname
        .split('.')
        .filter((item) => item === 'berkeley' || item === 'testworld')?.[0];
    if (txnBroadcastServiceName && networkName) {
        return `https://berkeley.minaexplorer.com/transaction/${txnHash}`;
    }
    return `Transaction hash: ${txnHash}`;
}
//# sourceMappingURL=11_lock_mip.js.map