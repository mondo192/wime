const getWeb3 = require("../getWeb3");
const EthExchange = require("../contracts/EthExchange.json");

exports.retreive = async (req, res, next) => {
  try {
    const app = await getContractInstance();
    const data = await app.methods.retreive().call();
    res.status(200).json({
      response: data
    });
  } catch (error) {
    res.status(400).json({
      response: error.message
    });
  }
};

exports.createProduct = async (req, res, next) => {
  const name = req.body.name
  const price = req.body.price;
  
  try {
    const app = await getContractInstance();
    const accounts = await getAccounts();
    const data = app.methods.createProduct(itemName, itemPrice).send({ from: accounts[0] });
    res.status(200).json({
      response: data
    });
  } catch (error) {
    res.status(400).json({
      response: error.message
    });
  }
}



async function getContractInstance() {
  try {
    const web3 = await getWeb3();
    const networkId = await web3.eth.net.getId();
    const exchange = await new web3.eth.Contract(
      EthExchange.abi,
      EthExchange.networks[networkId] && EthExchange.networks[networkId].address,
    );
    return exchange;
  } catch (error) {
    console.log(error.message);
  }
}

async function getAccounts() {
  try {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    return accounts;
  } catch (error) {
    console.log(error.message);
  }
}