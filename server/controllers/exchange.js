const getWeb3 = require("../getWeb3");
const EthExchange = require("../contracts/EthExchange.json");

exports.buyTokens = async (req, res, next) => {
  const amount = req.body.amount;
  try {
    const app = await getExchangeInstance();
    const accounts = await getAccounts();
    const tokens = await app.methods.buyTokens().send({ from: accounts[0], value: amount });
    res.status(201).json({
      response: tokens
    });
  } catch (error) {
    res.status(404).json({
      response: error.message
    });
  }
};

async function getExchangeInstance() {
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