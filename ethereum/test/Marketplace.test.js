const Marketplace = artifacts.require("Marketplace");

contract("Marketplace", accounts => {
  let instance;
  
  before(async () => {
    instance = await Marketplace.deployed();
  });

  it("has been deployed to the network", async () => {
    const address = await instance.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it("has been given a valid name", async () => {
    const name = await instance.name();
    assert.equal(name, "WiMe Marketplace");
  });

  it("created a new item", async () => {
    const name = "My Item";
    const price = web3.utils.toWei("100", "ether");
    const item = await instance.createItem(name, price);
    const index = await instance.index();
    assert.equal(index, 1);     
  });
});