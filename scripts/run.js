const main = async () => {
    const [owner, randomVisitors] = await hre.ethers.getSigners()
    // compile the contract
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy();
    // wait until contract is deployed
    await waveContract.deployed();

    console.log("Contract deployed to: ", waveContract.address);
    console.log("Contract deployed by: ", owner.address);

    // check the wavecount to see its 0
    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    // wave
    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    // view the totalwaves to see that it changed
    waveCount = await waveContract.getTotalWaves();

    // allow random users to wave
    waveTxn = await waveContract.connect(randomVisitors).wave();
    await waveTxn.wait();

    // read total waves
    waveCount = await waveContract.getTotalWaves();

    // allow random users to wave
    waveTxn = await waveContract.connect(randomVisitors).wave();
    await waveTxn.wait();

    // read total waves
    waveCount = await waveContract.connect(randomVisitors).getTotalWaves();
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