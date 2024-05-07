require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },

    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/liRjjrRhM85if04BYb8eGpagn7m7vTJl",
      accounts: ["35e2427f11068147ed2ed91d4556c6f516f26f2f1769b09c41923a8a29bd58a3"]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
