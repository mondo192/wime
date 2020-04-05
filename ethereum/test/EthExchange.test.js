const WiMeToken = artifacts.require("WiMeToken");
const EthExchange = artifacts.require("EthExchange");

function tokens(x) {
  return web3.utils.toWei(x, "ether");
}

contract("WiMe Ethereum Exchange", async (accounts) => {
  
  let token, ethExchange;

  before(async () => {
    token = await WiMeToken.new("WiMe Token", "YME", "100000000000000000000", 18);
    exchange = await EthExchange.new(token.address, 100);
    await token.transfer(exchange.address, tokens("100"));
  });

  describe("Token", async () => {
    it("token has a valid name", async () => {
      const name = await token.name();
      assert.equal(name, "WiMe Token");
    });
  });
  
  describe("Exchange", async () => {
    it("contract has a name", async () => {
      const name = await exchange.name();
      assert.equal(name, "WiMe Ethereum Exchange");
    });
  
    it("contract has the exchanged tokens", async () => {
      const balance = await token.balanceOf(exchange.address);
      assert.equal(balance.toString(), tokens("100"));
    });
  });

  describe("Purchase tokens", async() => {
    let result;

    before(async() => {
      result = await exchange.buyTokens({ from: accounts[1], value: web3.utils.toWei("0.7", "ether") });
    });

    it("exchanges tokens with the investor successfully", async () => {
      const balance = await token.balanceOf(accounts[1]);
      assert.equal(balance.toString(), tokens("70"));
    });

    it("updates the total supply of the exchange after investing", async() => {
      let balance = await token.balanceOf(exchange.address);
      assert.equal(balance.toString(), tokens("30"));
      balance = await web3.eth.getBalance(exchange.address);
      assert.equal(balance.toString(), web3.utils.toWei("0.7", "ether"));
    });
  });

  describe("Sell tokens", async () => {
    let result;
    before(async () => {
      await token.approve(exchange.address, tokens("70"), { from: accounts[1] });
      result = await exchange.sellTokens(tokens("70"), { from: accounts[1] });
    });

    it("investor successfully sold tokens on the ethereum exchange", async () => {
      const balance = await token.balanceOf(accounts[1]);
      assert.equal(balance.toString(), tokens("0"));
    });
  });
});
