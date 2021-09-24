
const Web3 = require('web3');
const rpcURL = "https://ropsten.infura.io/v3/80c615a196014e1ca02ebafef471988d";
const web3 = new Web3(rpcURL);


let ABI = require("./4-web3readcontractabi.js") ;
const contractAddress = "0x44a80163171b442591c0864da1b134b12201a496";


const contractEventCall = async() => {
    try{  
        
        const contract = new web3.eth.Contract(ABI, contractAddress);

        let getEvents = await contract.getPastEvents('Transfer',{
        });
        console.log("Transfer", getEvents);
    }
    catch (error) {
        console.log('error', error)
    }   
}

contractEventCall()