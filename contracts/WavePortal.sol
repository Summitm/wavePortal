// SPDX-License-Identifier:UNLICENCED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal{
    uint256 totalWaves;

    constructor() {
        console.log("Hey y'all. It's time to write some fancy contracts");
    }

    function wave() public {
        totalWaves += 1;
        console.log("%s has waved at you ", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("%d person(s) waved at you!", totalWaves);
        return totalWaves;
    }
}