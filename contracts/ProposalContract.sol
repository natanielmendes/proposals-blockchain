// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract ProposalContract {
    struct Proposal {
        uint256 id;
        string title;
        string description;
        address proposer;
        uint256 timestamp;
    }

    Proposal[] public proposals;
    uint256 private proposalCounter;

    event ProposalCreated(
        uint256 indexed id,
        string title,
        address indexed proposer,
        uint256 timestamp
    );

    function createProposal(string memory _title, string memory _description) public {
        uint256 proposalId = proposalCounter;
        proposals.push(
            Proposal({
                id: proposalId,
                title: _title,
                description: _description,
                proposer: msg.sender,
                timestamp: block.timestamp
            })
        );
        
        emit ProposalCreated(proposalId, _title, msg.sender, block.timestamp);
        proposalCounter++;
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }

    function getProposalCount() public view returns (uint256) {
        return proposalCounter;
    }
} 