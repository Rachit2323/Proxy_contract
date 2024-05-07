// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Vote {
    // Struct to represent a candidate
    struct Candidate {
        string name;
        uint256 candidateId;
        string party;
        uint256 voteCount;
    }

    // Array to store the list of candidates
    Candidate[] private candidates;

    // Mapping to store whether an address has voted or not
    mapping(address => bool) private hasVoted;

    // Owner of the contract
    address public owner;

    // Constructor to set the owner and make deployment payable
    constructor() {
        owner = msg.sender;
    }

    // Function to add a candidate
    function addCandidate(
        string memory _name,
        uint256 _candidateId,
        string memory _party
    ) public {
        // Make the function payable

        // Validate that candidateId and party name are not already used
        for (uint256 i = 0; i < candidates.length; i++) {
            require(
                candidates[i].candidateId != _candidateId,
                "Candidate ID already exists"
            );
            require(
                keccak256(abi.encodePacked(candidates[i].party)) !=
                    keccak256(abi.encodePacked(_party)),
                "A party can have only 1 candidate"
            );
        }

        candidates.push(Candidate(_name, _candidateId, _party, 0));
    }

    // Function to vote for a candidate
    // Function to vote for a candidate
    function vote(uint256 _candidateId, address _voter) public {
        // Check if the sender has already voted

        require(!hasVoted[_voter], "You have already voted.");

        // Find the candidate and increment their vote count
        bool candidateFound = false;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].candidateId == _candidateId) {
                candidates[i].voteCount++;
                candidateFound = true;
                break;
            }
        }

        // Ensure that the candidate exists
        require(candidateFound, "Candidate not found");

        // Mark the sender as voted
        hasVoted[_voter] = true;
    }

    // Function to get the winner
    function getWinner()
        public
        view
        returns (string memory winnerName, uint256 winnerVoteCount)
    {
        uint256 maxVotes = 0;
        uint256 winnerIndex = 0;

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winnerIndex = i;
            }
        }

        return (
            candidates[winnerIndex].name,
            candidates[winnerIndex].voteCount
        );
    }


     // Function to get the voted or not
      function getVote(address _voter) public view returns (bool) {
        return hasVoted[_voter];
    }

    // Function to get the list of candidates with their vote counts
 function getListCandidates() public view returns (string[] memory, uint256[] memory, string[] memory, uint256[] memory) {
        uint256 candidateCount = candidates.length;
        string[] memory names = new string[](candidateCount);
        uint256[] memory ids = new uint256[](candidateCount);
        string[] memory parties = new string[](candidateCount);
        uint256[] memory counts = new uint256[](candidateCount);

        for (uint256 i = 0; i < candidateCount; i++) {
            names[i] = candidates[i].name;
            ids[i] = candidates[i].candidateId;
            parties[i] = candidates[i].party;
            counts[i] = candidates[i].voteCount;
        }

        return (names, ids, parties, counts);
    }
}
