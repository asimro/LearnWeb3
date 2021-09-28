const Web3 = require("web3");
const rpcURL = "https://ropsten.infura.io/v3/80c615a196014e1ca02ebafef471988d";
const Tx = require("ethereumjs-tx").Transaction;
require('dotenv').config()

const web3 = new Web3(rpcURL);

const accountS = "0x53Acdd0B5C83B9BA58849f07B8B88301C37f9619";

const private_key = process.env.pvtkey;
const Private_KeyS = Buffer.from(private_key, 'hex');



const accountR = "0x653A48939074AD27afBd28560642bBeCf9d8E1d7";
let bytecode = require("./3-web3_bytecode.js") ;
const byteCodeBuffer = Buffer.from(bytecode, 'hex');


const contractDeploy = async() => {
    try {
        // creating transaction object 
        let txCount = await web3.eth.getTransactionCount(accountS);
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            data: byteCodeBuffer,
            gasLimit: web3.utils.toHex(6000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
        }    
       
        // signing transaction with private key
        const tx = new Tx(txObject, { chain: 'ropsten', hardfork: 'petersburg' });
        tx.sign(Private_KeyS);
        const serialized = tx.serialize();
        const raw = '0x' + serialized.toString('hex');
        

        // sending transaction on blockchain
        const singedTransaction =  await web3.eth.sendSignedTransaction(raw);
        console.log("singedTransaction", singedTransaction);
    }
    catch (error) {
        console.log('error', error)
    }
}

contractDeploy()