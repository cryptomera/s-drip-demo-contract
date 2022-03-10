// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
  uint8 private decimal = 18;
  constructor(string memory _name, string memory _symbol, uint256 _totalSupply) ERC20(_name, _symbol) {
    _mint(msg.sender, _totalSupply);
  }

  function decimals() public view override returns (uint8) {
    return decimal;
  }
}