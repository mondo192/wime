pragma solidity >=0.4.21 <0.7.0;

import "./ERC20.sol";

contract WiMeToken is ERC20 {
  string public name;
  string public symbol;
  uint256 public total;
  uint8 public decimalPlaces;

  mapping(address => uint256) public balances;
  mapping(address => mapping(address => uint256)) public allowed;

  constructor(
    string memory _name,
    string memory _symbol,
    uint256 _total,
    uint8 _decimalPlaces
  ) public {
    balances[msg.sender] = _total;
    name = _name;
    symbol = _symbol;
    total = _total;
    decimalPlaces = _decimalPlaces;
  }

  function totalSupply() public override view returns (uint256) {
      return total;
  }

  function balanceOf(address _owner) public override view returns (uint256 balance) {
    return balances[_owner];
  }

  function transfer(address _to, uint256 _value) public override returns (bool success) {
    require(balances[msg.sender] >= _value, "Insufficent funds for transfer");
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public override returns (bool success) {
    require(_value <= balances[_from], "Not enough balance");
    require(_value <= allowed[_from][msg.sender], "Not allowed");
    balances[_from] -= _value;
    balances[_to] += _value;
    allowed[_from][msg.sender] -= _value;
    emit Transfer(_from, _to, _value);
    return true;
  }

  function approve(address _spender, uint256 _value) public override returns (bool success) {
    allowed[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  function allowance(address _owner, address _spender) public override view returns (uint256 remaining) {
    return allowed[_owner][_spender];
  }

}
