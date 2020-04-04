const getWeb3 = require("../getWeb3");
const Marketplace = require("../contracts/Marketplace.json");

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

exports.createItem = async (req, res, next) => {
  const itemName = req.body.itemName;
  const itemPrice = req.body.itemPrice;
  
  try {
    const app = await getContractInstance();
    const accounts = await getAccounts();
    const data = app.methods.createItem(itemName, itemPrice).send({ from: accounts[0] });
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
    const marketplace = await new web3.eth.Contract(
      Marketplace.abi,
      Marketplace.networks[networkId] && Marketplace.networks[networkId].address,
    );
    return marketplace;
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