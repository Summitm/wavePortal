const main = async () => {
    const [owner, randomVisitors] = await hre.ethers.getSigners();
    // compile the contract
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy();
    // wait until contract is deployed
    await waveContract.deployed();

    console.log("Contract deployed to: ", waveContract.address);
    // console.log("Contract deployed by: ", owner.address);

    // check the wavecount to see its 0
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());

    // wave
    let waveTxn = await waveContract.wave('Always a coding machine!');
    await waveTxn.wait();

    // allow random users to wave
    waveTxn = await waveContract.connect(randomVisitors).wave('I like Solidity!');
    await waveTxn.wait();

    // read total waves
    let totalWaves = await waveContract.getAllWaves();
    console.log(totalWaves);
}

// run main
const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

// call runMain
runMain();