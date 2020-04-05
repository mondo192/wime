const getWeb3 = require("../getWeb3");
const EthExchange = require("../contracts/EthExchange.json");

exports.getAccounts = async (req, res, next) => {
  try {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    res.status(200).json({
      response: accounts
    });
  } catch (error) {
    console.log(error.message);
  }
};