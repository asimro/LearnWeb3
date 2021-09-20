const Web3 = require("web3");
const rpcURL = "https://ropsten.infura.io/v3/80c615a196014e1ca02ebafef471988d";
const Tx = require("ethereumjs-tx").Transaction;


const web3 = new Web3(rpcURL);


const accountS = "0x53Acdd0B5C83B9BA58849f07B8B88301C37f9619";
const Private_Key = 'c85927cd1d3aedcfc615155149aaa8c13ca26f9d77704ed71abfc9e15a9949ef';
const Private_KeyS = Buffer.from(Private_Key, 'hex');

const accountR = "0x653A48939074AD27afBd28560642bBeCf9d8E1d7";


web3.eth.getTransactionCount(accountS, (err, txCount) => {
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
    const txHex = '0x' + serialize.toString('hex');

    web3.eth.sendSignedTransaction(txHex, (err, txHash) => {
        if (!err) {
            console.log('Transaction Seccessful:', txHash);
        } else {
            console.log('Transaction Error:', error);
        }
    });
})
