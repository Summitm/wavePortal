const main = async () => {
    const [_, randomVisitors] = await hre.ethers.getSigners();
    // compile the contract
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.01'),
    });
    // wait until contract is deployed
    await waveContract.deployed();

    console.log("Contract deployed to: ", waveContract.address);
    // console.log("Contract deployed by: ", owner.address);

    // check to see if funded
    let contractBal = await hre.ethers.provider.getBalance(waveContract.address);
    console.log('Contract has %f ethers: ', hre.ethers.utils.formatEther(contractBal));

    // check the wavecount to see its 0
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());

    // wave
    let waveTxn = await waveContract.wave('Always a coding machine!');
    await waveTxn.wait();

    waveTxn = await waveContract.wave('Always a coding machine!');
    await waveTxn.wait();

    // allow random users to wave
    waveTxn = await waveContract.connect(randomVisitors).wave('I like Solidity!');
    await waveTxn.wait();

    waveTxn = await waveContract.connect(randomVisitors).wave('Good in web 3!');
    await waveTxn.wait();

    // check to see if ethers were withdrawn to send to wavers
    contractBal = await hre.ethers.provider.getBalance(waveContract.address);
    console.log('Contract now has %f ethers after prize won!: ', hre.ethers.utils.formatEther(contractBal));


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