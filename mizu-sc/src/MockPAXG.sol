// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PAXG is ERC20 {
    uint8 private _decimals = 18; // PAXG uses 18 decimals

    constructor() ERC20("PAX Gold", "PAXG") {}

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
