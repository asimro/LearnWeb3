
const Web3 = require('web3');
const rpcURL = "https://ropsten.infura.io/v3/80c615a196014e1ca02ebafef471988d";
const Tx = require("ethereumjs-tx").Transaction;
const web3 = new Web3(rpcURL);
require('dotenv').config()

const accountS = "0x53Acdd0B5C83B9BA58849f07B8B88301C37f9619";

const private_key = process.env.pvtkey;
const Private_KeyS = Buffer.from(private_key, 'hex');

const account1 = "0x653A48939074AD27afBd28560642bBeCf9d8E1d7";
// const account2 = "0x4AD5187C111A2b06F5fC93afaDB81Fd9100A0c13";

const tokens = web3.utils.toWei('3', 'ether');

let ABI = require("./4-web3readcontractabi.js");
const contractAddress = "0x44a80163171b442591c0864da1b134b12201a496";


const contractWrite = async () => {
    try {
        // creating transaction object
        const contract = new web3.eth.Contract(ABI, contractAddress);

        let txCount = await web3.eth.getTransactionCount(accountS);
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: contractAddress,
            data: contract.methods.transfer(account1, tokens).encodeABI(),
            gasLimit: web3.utils.toHex(6000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
        }

        // signing transaction with private key
        const tx = new Tx(txObject, { chain: 'ropsten', hardfork: 'petersburg' });
        tx.sign(Private_KeyS);
        const serialized = tx.serialize();
        const raw = '0x' + serialized.toString('hex');

        // sending transaction on blockchain
        const singedTransaction = await web3.eth.sendSignedTransaction(raw);
        console.log("singedTransaction", singedTransaction);

        const balance = await contract.methods.balanceOf(account1).call();
        console.log("Balance After Transfer in Account 2", balance);

        //     contract.methods.balanceOf(account).call( (_err, balance) => {
        //     console.log("Balance After Transfer in Account 2", balance)
        // })

    }

    catch (error) {
        console.log('error', error)
    }
}

contractWrite()