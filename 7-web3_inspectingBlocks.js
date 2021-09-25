
const Web3 = require('web3');
const rpcURL = "https://ropsten.infura.io/v3/80c615a196014e1ca02ebafef471988d";
const web3 = new Web3(rpcURL);


// let ABI = require("./4-web3readcontractabi.js") ;
// const contractAddress = "0x44a80163171b442591c0864da1b134b12201a496";




// getting latest block with THEN 
web3.eth.getBlockNumber().then(console.log);



// getting latest block with callback
web3.eth.getBlockNumber((_err, blockN) => {
    console.log('Block Number', blockN);
});



// getting latest block with async & await
const getLatestBlockNumber = async () => {
    try {
        const blockNumber = await web3.eth.getBlockNumber();
        console.log('Latest Block Number:', blockNumber);
    } catch (error) {
        console.log('Error: ', error);
    }
}
getLatestBlockNumber()










// ****************************************************************************************


web3.eth.getBlock('latest').then(console.log);


web3.eth.getBlock('latest', (_err, blockDetails) => {
    console.log("Latest Block Details", blockDetails)
});


const getBlockDetails = async () => {
    try {
        const blockDetails = await web3.eth.getBlock('latest');
        console.log("Block Details", blockDetails);
    }
    catch (error) {
        console.log("Error", error);
    }
}
getBlockDetails();









// ****************************************************************************************

web3.eth.getBlockNumber().then((latest) => {
    for (let i = 0; i < 2; i++) {
        web3.eth.getBlock(latest - i).then(console.log)
    }
})


const getBlockData = async () => {
    try {
        let blockNoLoop = await web3.eth.getBlockNumber();
        for (let i = 0; i < 2; i++) {
            let blockNo = await web3.eth.getBlock(blockNoLoop - i);
            console.log("Block Wise Details " + (blockNoLoop - i), blockNo);
        }
    }
    catch (error) {
        console.log("Error", error)
    }
}
getBlockData();