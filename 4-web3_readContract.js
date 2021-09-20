
const Web3 = require('web3');
const rpcURL = "https://ropsten.infura.io/v3/80c615a196014e1ca02ebafef471988d";
const account = "0x53Acdd0B5C83B9BA58849f07B8B88301C37f9619";

const web3 = new Web3(rpcURL);


let ABI = require("./4-web3readcontractabi.js") ;
const contractAddress = "0x44a80163171b442591c0864da1b134b12201a496";


const contractRead = async() => {
    try{
        const contract = new web3.eth.Contract(ABI, contractAddress);
        let readingTrax = await contract.methods.getTokenDetails().call();
        console.log('Call_Out_Put', readingTrax)
    }
    catch (error) {
        console.log('error', error)
    }
}

contractRead()