const Web3 = require("web3");
const rpcURL = "https://ropsten.infura.io/v3/80c615a196014e1ca02ebafef471988d";
const Tx = require("ethereumjs-tx").Transaction;
require('dotenv').config()


const web3 = new Web3(rpcURL);


const accountS = "0x53Acdd0B5C83B9BA58849f07B8B88301C37f9619";
const private_key = process.env.pvtkey;
const Private_KeyS = Buffer.from(private_key, 'hex');

const accountR = "0x653A48939074AD27afBd28560642bBeCf9d8E1d7";

const sendEth = async () => {
    try {
        const txCount = await web3.eth.getTransactionCount(accountS);
        console.log("Nonce value:", txCount);

        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: accountR,
            value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
        }

        const tx = new Tx(txObject, { 'chain': 'ropsten' });
        tx.sign(Private_KeyS);
        const serialize = tx.serialize();
        const raw = '0x' + serialize.toString('hex');

        const txHash = await web3.eth.sendSignedTransaction(raw);
        console.log('Transaction Hash', txHash);
        // if (!err) {
        //     console.log('Transaction Seccessful:', txHash);
        // } else {
        //     console.log('Transaction Error:', error);
        // }
    }

    catch (e) {
        console.log('Error', e);
    }

}

sendEth();
