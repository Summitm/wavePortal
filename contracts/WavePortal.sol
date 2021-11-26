// SPDX-License-Identifier:UNLICENCED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal{
    uint256 totalWaves;

    /* event an abstraction of the contract
        takes the (wallet address, timestamp of the event, a message )
    */
    event NewWave(address indexed from, uint256 timestamp, string message);

    // struct data to hold the data
    struct Wave {
        address senderAddress;
        uint256 timestamp;
        string message;
    }
    
    // declare array wave variable of type struct Wave; holds all waves and messages sent
    Wave[] waves;

    constructor() {
        console.log("...It's time to write some fancy contracts like the smart people we are...");
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s has waved at you ", msg.sender);

        // push data to array
        waves.push(Wave(msg.sender, block.timestamp, _message));

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns(Wave[] memory) {
        return waves;
    }


    function getTotalWaves() public view returns (uint256) {
        console.log("%d person(s) waved at you!", totalWaves);
        return totalWaves;
    }
}