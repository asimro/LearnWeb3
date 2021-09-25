
const Web3 = require('web3');
const rpcURL = "https://ropsten.infura.io/v3/80c615a196014e1ca02ebafef471988d";
const web3 = new Web3(rpcURL);


// Get average gas price in wei from last few blocks median gas price

// getting in wie
web3.eth.getGasPrice().then(console.log);

// getting in ether
web3.eth.getGasPrice().then((result) => {
  console.log(web3.utils.fromWei(result, 'ether'))
});




// Use sha256 Hashing function

const doHash = web3.utils.sha3('Asim_Raza_PIAIC_BCC_Student');
console.log("SHA3 hashing", doHash);

console.log(web3.utils.sha3('Asim_Raza_PIAIC_BCC_Student'));




// Use keccak256 Hashing function (alias)

const doHashing = web3.utils.keccak256('Asim_Raza_PIAIC_BCC_Student');
console.log("keccak256 hashing", doHashing);

console.log(web3.utils.keccak256('Asim_Raza_PIAIC_BCC_Student'));





// Get a Random Hex
console.log(web3.utils.randomHex(32))
console.log(web3.utils.randomHex(64))
console.log(web3.utils.randomHex(16))
console.log(web3.utils.randomHex(8))






// Get access to the underscore JS library

const _ = web3.utils._();

_.each({ key1: 'value1', key2: 'value2' }, (value, key) => {
  console.log(key)
});




console.log(web3.utils._)