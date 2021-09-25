
const Web3 = require('web3');
const rpcURL = "https://ropsten.infura.io/v3/80c615a196014e1ca02ebafef471988d";
const web3 = new Web3(rpcURL);


let ABI = require("./4-web3readcontractabi.js") ;
const contractAddress = "0x44a80163171b442591c0864da1b134b12201a496";


const contractEventCall = async() => {
    try{  
        const contract = new web3.eth.Contract(ABI, contractAddress);

        // getting 3rd transfer event from the block number 11100000 onward 
        let getEvent = await contract.getPastEvents('Transfer',{
            fromBlock:  11100000,
            toBlock: "latest"
        });
        console.log("Transfer", getEvent[3]);

        // getting total number of event after block number 11100000
        let getAllEvents = await contract.getPastEvents('AllEvents',{
            fromBlock:  11100000,
            toBlock: "latest"
        });
        console.log("No of Total Events", getAllEvents.length);
    }
    catch (error) {
        console.log('error', error)
    }   
}
contractEventCall()