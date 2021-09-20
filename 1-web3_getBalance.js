const Web3 = require('web3');
const rpcURL = "https://ropsten.infura.io/v3/80c615a196014e1ca02ebafef471988d";
const account = "0x53Acdd0B5C83B9BA58849f07B8B88301C37f9619";


const web3 = new Web3(rpcURL);


web3.eth.getBalance(account, (err, wei) => {
    console.log("balance in wei", wei);

    balance = web3.utils.fromWei(wei, 'ether');
    console.log("balance in ether", balance);
})

