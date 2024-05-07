const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Transfer", function () {
  let Transfer;
  let transfer;

  beforeEach(async function () {
    Transfer = await ethers.getContractFactory("Transfer");
    transfer = await Transfer.deploy();
    await transfer.waitForDeployment();
  });

  it("Should transfer Ether to the specified address", async function () {
    const receiverAddress = "0x58187FA71aa989EF1ebe268196463f37FBaAEAfc"; // Replace with a real address
    const amount = ethers.parseEther("0.001");

    await transfer._transfer(receiverAddress, { value: amount });

    const receiverBalance = await ethers.provider.getBalance(receiverAddress);
    expect(receiverBalance).to.equal(amount, "Receiver did not receive the correct amount of Ether");

   
  });
});




// const { ethers } = require("hardhat");
// const { expect } = require("chai");

describe("Vote", function () {
  let Vote;
  let vote;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    Vote = await ethers.getContractFactory("Vote");
    vote = await Vote.deploy();
    await vote.waitForDeployment();
  });

  it("Should add a candidate", async function () {
    await vote.addCandidate("Candidate1", 1, "PartyA");
    const candidates = await vote.getListCandidates();

    expect(candidates[0][0]).to.eql("Candidate1");
    expect(candidates[1][0]).to.eql(1n);
    expect(candidates[2][0]).to.eql("PartyA");
    expect(candidates[3][0]).to.eql(0n);
  });

  it("Should vote for a candidate", async function () {
    await vote.addCandidate("Candidate1", 1, "PartyA");
    await vote.vote(1, addr1.address);
    const hasVoted = await vote.getVote(addr1.address);
    expect(hasVoted).to.equal(true);
  });

  it("Should get the winner", async function () {
    await vote.addCandidate("Candidate1", 1, "PartyA");
    await vote.vote(1, addr1.address);
    await vote.vote(1, addr2.address);
    const [winnerName, winnerVoteCount] = await vote.getWinner();
    expect(winnerName).to.equal("Candidate1");
    expect(winnerVoteCount).to.equal(2);
  });
});
