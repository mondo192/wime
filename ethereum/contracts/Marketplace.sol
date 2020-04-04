pragma solidity >=0.4.21 <0.7.0;

contract Marketplace {
  string public name;

  struct Item {
    uint id;
    string name;
    uint price;
    address owner;
    bool purchased; // change this to enum state
  }

  event ItemCreated(
    uint id,
    string name,
    uint price,
    address owner,
    bool purchased
  );

  mapping(uint => Item) public items;
  uint public index = 0;

  constructor() public {
    name = "WiMe Marketplace";
  }

  function createItem(string memory _itemName, uint _itemPrice) public {
    index++;
    items[index] = Item(index, _itemName, _itemPrice, msg.sender, false);
    emit ItemCreated(index, _itemName, _itemPrice, msg.sender, false);
  }
}