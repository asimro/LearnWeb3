
const Web3 = require('web3');
const rpcURL = "https://ropsten.infura.io/v3/80c615a196014e1ca02ebafef471988d";
const Tx = require("ethereumjs-tx").Transaction;
const web3 = new Web3(rpcURL);

const accountS = "0x53Acdd0B5C83B9BA58849f07B8B88301C37f9619";
const Private_Key = 'c85927cd1d3aedcfc615155149aaa8c13ca26f9d77704ed71abfc9e15a9949ef';
const Private_KeyS = Buffer.from(Private_Key, 'hex');

const accountR = "0x653A48939074AD27afBd28560642bBeCf9d8E1d7";
// const accountR = "0xC7fE570c20F87b93574c35DF6a2F99EA53a439AB";
const tokens = "555000000000000000000";

let ABI = require("./4-web3readcontractabi.js") ;
const contractAddress = "0x44a80163171b442591c0864da1b134b12201a496";



const contractWrite = async() => {
    try{  
        // creating transaction object
        const contract = new web3.eth.Contract(ABI, contractAddress);

        let txCount = await web3.eth.getTransactionCount(accountS);
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: contractAddress,
            data: contract.methods.transfer(accountR, tokens).encodeABI(),
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

contractWrite()