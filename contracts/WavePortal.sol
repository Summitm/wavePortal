// SPDX-License-Identifier:UNLICENCED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal{
    uint256 totalWaves;

    uint256 private randomNumber;

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

    // associate an address with a number
    mapping(address => uint256) public lastSeenAt;

    constructor() payable {
        console.log("...It's time to write some fancy contracts like the smart people we are...");

        randomNumber = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {

        require(
            lastSeenAt[msg.sender] + 30 seconds < block.timestamp,
            "Wait for 0.5min to wave again!"
        );

        lastSeenAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s has waved at you ", msg.sender);

        // push data to array
        waves.push(Wave(msg.sender, block.timestamp, _message));

        // make the random # even more unpredictable
        randomNumber = (block.difficulty + block.timestamp +  randomNumber) % 100;

        console.log("Generated # =>",randomNumber);

        // if random number is in a given range then award the winner
        if(randomNumber <= 50) {
            console.log("This %s won the prize", msg.sender);

            // define prize amount a waver can win
            uint256 prizeAmount = 0.0000000001 ether;

            // check that the contract has funds enough to send prize
            require(
                prizeAmount <= address(this).balance,
                "Not enough ethers to send!"
            );

            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Insufficient ethers to withdraw");
        }

        emit NewWave(msg.sender, block.timestamp, _message);

    }

    function getAllWaves() public view returns(Wave[] memory) {
        return waves;
    }


    function getTotalWaves() public view returns (uint256) {
        // console.log("%d person(s) waved at you!", totalWaves);
        return totalWaves;
    }
}