// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

import "./ERC20.sol";

contract TestERC20 is ERC20 {
    constructor()ERC20("TEST","TEST") {
        _mint(msg.sender, 100000000000000000000000000);
    }

    function mint() external {
        _mint(msg.sender, 100000000000000000000000000);
    }
}
