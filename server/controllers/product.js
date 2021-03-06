const getWeb3 = require("../getWeb3");
const EthExchange = require("../contracts/EthExchange.json");

exports.createProduct = async (req, res, next) => {
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;

  try {
    const app = await getContractInstance();
    const accounts = await getAccounts();
    const data = app.methods.createProduct(productName, productPrice).send({ from: accounts[0] });
    res.status(201).json({
      response: data
    });
  } catch (error) {
    res.status(404).json({
      response: error.message
    });
  }
};



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