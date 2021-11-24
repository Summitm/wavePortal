const main = async () => {
    const [deployedBy] = await hre.ethers.getSigners();
    const accountBal = await deployedBy.getBalance();

    console.log("Contract deployed by wallet address %s", deployedBy.address);
    console.log("Your wallet balance is %s", accountBal.toString());

    const waveContract = await hre.ethers.getContractFactory('WavePortal');
    const portal = await waveContract.deploy();
    await portal.deployed();

    console.log("Our new wave portal address is %s", portal.address);
}


const runMain = async () => {
    try {
        await main();
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();