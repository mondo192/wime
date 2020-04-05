const WiMeToken = artifacts.require("WiMeToken");
const EthExchange = artifacts.require("EthExchange");

module.exports = async (deployer) => {
  // Deploy token and set it props
  await deployer.deploy(WiMeToken, "WiMe Token", "YME", "100000000000000000000", 18);
  const token = await WiMeToken.deployed();

  await deployer.deploy(EthExchange, token.address, 100);
  const ethExchange = await EthExchange.deployed();
  
  // transfer all tokens to exchange contract
  await token.transfer(ethExchange.address, await token.totalSupply());
};