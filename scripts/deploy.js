
  // scripts/deployProxy.js

const { ethers, upgrades } = require("hardhat");

async function main() {
    // Deploy the implementation contracts first
    const Transfer = await ethers.getContractFactory("Transfer");

    const Vote = await ethers.getContractFactory("Vote");

    const transfer = await Transfer.deploy();
    await transfer.waitForDeployment();



    const vote = await Vote.deploy();

    await vote.waitForDeployment();

    console.log("Implementation contracts deployed:");

    console.log("Transfer:", transfer.target);

    console.log("Vote:", vote.target);

    // Deploy the proxy contract
    const Proxy = await ethers.getContractFactory("Proxy");
    const proxy = await upgrades.deployProxy(
        Proxy,
        [transfer.target, vote.target],
        {
          initializer: "starting",
       }
    );

    console.log("Proxy contract deployed:", proxy.target);
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});

//Real
// Implementation contracts deployed:
// Transfer: 0x27f80D9006732d7b4a5d1d179354f7E675a3d8d1
// Vote: 0x31Ef95B957689Ab328B2072650074110f3b1b9D4
// Proxy contract deployed: 0x23E053e31EA6c2dd3CCAE1c3B5a009146fCFA50C





// Implementation contracts deployed:
// Transfer: 0x516344F0059a3043e32416053eD89b0101E5555a
// Vote: 0x0404eD3Cf5A2436DDF882E39055EB5f523D73085
// Proxy contract deployed: 0x8E49024cAc8741f8FF1c6F6e257DF5D4F308ac43

