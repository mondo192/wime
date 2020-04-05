pragma solidity >=0.4.21 <0.7.0;

import "./WiMeToken.sol";

contract EthExchange {
  string public name;
  WiMeToken public token;
  uint public rate;

  constructor(WiMeToken _token, uint _rate) public {
    name = "WiMe Ethereum Exchange";
    token = _token;
    rate = _rate;
  }

  function buyTokens() public payable {
    uint tokenAmount = msg.value * rate;
    require(token.balanceOf(address(this)) >= tokenAmount, "Exchange has no tokens");
    token.transfer(msg.sender, tokenAmount);
  }

  function sellTokens(uint _amount) public {
    require(token.balanceOf(msg.sender) >= _amount, "User has no more tokens to sell");
    uint etherAmount = _amount / rate;
    require(address(this).balance >= etherAmount, "Exchange has no more ether");
    token.transferFrom(msg.sender, address(this), _amount);
    msg.sender.transfer(etherAmount);
  }
}