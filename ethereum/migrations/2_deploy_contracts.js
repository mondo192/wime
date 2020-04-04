const WiMeToken = artifacts.require("WiMeToken");
const EthExchange = artifacts.require("EthExchange");

module.exports = async (deployer) => {
  // Deploy token and set it props
  await deployer.deploy(WiMeToken, "WiMe Token", "YME", 100000000000000, 8);
  const token = await WiMeToken.deployed();

  deployer.deploy(EthExchange);
  const ethExchange = await EthExchange.deployed();
  
  const accounts = web3.eth.getAccounts();

  // transfer all tokens to exchange contract
  await token.transfer(ethExchange.address, await token.totalSupply());
};