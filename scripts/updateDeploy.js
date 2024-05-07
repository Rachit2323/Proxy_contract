const { ethers, upgrades } = require("hardhat");

async function updateProxy(contractAddress, proxyAbi, functionSelector, newImplementationContract) {
    // Retrieve the signer from the Hardhat environment
    const [signer] = await ethers.getSigners();

    // Create an instance of the proxy contract
    const proxyContract = await ethers.getContractAt(proxyAbi, contractAddress, signer);
     
    try {
  
        const tx = await proxyContract.updateProxy(functionSelector, newImplementationContract.target);
        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log("Proxy updated successfully done:", receipt);
    } catch (error) {
        console.error("Error updating proxy:", error);
    }
}

// Example usage:
async function main() {
    const contractAddress = "0x8E49024cAc8741f8FF1c6F6e257DF5D4F308ac43";
    const proxyAbi =  [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "bytes4",
            "name": "sig",
            "type": "bytes4"
          }
        ],
        "name": "FallbackCalled",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "candidateId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "party",
            "type": "string"
          }
        ],
        "name": "addCandidates",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address payable",
            "name": "_to",
            "type": "address"
          }
        ],
        "name": "callTransfer",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getListCandidates",
        "outputs": [
          {
            "internalType": "string[]",
            "name": "candidateNames",
            "type": "string[]"
          },
          {
            "internalType": "uint256[]",
            "name": "ids",
            "type": "uint256[]"
          },
          {
            "internalType": "string[]",
            "name": "party",
            "type": "string[]"
          },
          {
            "internalType": "uint256[]",
            "name": "voteCounts",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "voter",
            "type": "address"
          }
        ],
        "name": "getVote",
        "outputs": [
          {
            "internalType": "bool",
            "name": "hasVote",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getWinner",
        "outputs": [
          {
            "internalType": "string",
            "name": "winnerName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "winnerVoteCount",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_transferAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_voteAddress",
            "type": "address"
          }
        ],
        "name": "starting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_selector",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "_newImplementation",
            "type": "address"
          }
        ],
        "name": "updateProxy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "candidateId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "voter",
            "type": "address"
          }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }
    ]

    const functionSelector = "_transfer(address)";
      // Calculate function selector

    // Deploy the new implementation contract
    const NewImplementationContract = await ethers.getContractFactory("Transfer2");
    const newImplementationContract = await NewImplementationContract.deploy();

    // Update the proxy contract with the new implementation
    await updateProxy(contractAddress, proxyAbi, functionSelector, newImplementationContract);
}

main();
