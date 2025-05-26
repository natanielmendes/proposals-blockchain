const { expect } = require("chai");
const { ethers } = require("hardhat");
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("ProposalContract", function () {
  let proposalContract: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;

  beforeEach(async function () {
    // Get signers
    [owner, addr1] = await ethers.getSigners();

    // Deploy contract
    const ProposalContract = await ethers.getContractFactory("ProposalContract");
    proposalContract = await ProposalContract.deploy();
    await proposalContract.deployed();
  });

  describe("Proposal Creation", function () {
    it("Should create a new proposal", async function () {
      const title = "Test Proposal";
      const description = "This is a test proposal";

      const tx = await proposalContract.createProposal(title, description);
      const receipt = await tx.wait();
      
      // Get the event from the receipt
      const event = receipt.events.find((e: { event: string }) => e.event === 'ProposalCreated');
      expect(event).to.not.be.undefined;
      expect(event.args.id).to.equal(0);
      expect(event.args.title).to.equal(title);
      expect(event.args.proposer).to.equal(owner.address);
      
      // Verify the stored proposal
      const proposals = await proposalContract.getProposals();
      expect(proposals.length).to.equal(1);
      expect(proposals[0].title).to.equal(title);
      expect(proposals[0].description).to.equal(description);
      expect(proposals[0].proposer).to.equal(owner.address);
    });

    it("Should increment proposal counter", async function () {
      await proposalContract.createProposal("First", "First proposal");
      await proposalContract.createProposal("Second", "Second proposal");

      const count = await proposalContract.getProposalCount();
      expect(count).to.equal(2);
    });

    it("Should store proposals with correct IDs", async function () {
      await proposalContract.createProposal("First", "First proposal");
      await proposalContract.createProposal("Second", "Second proposal");

      const proposals = await proposalContract.getProposals();
      expect(proposals[0].id).to.equal(0);
      expect(proposals[1].id).to.equal(1);
    });
  });

  describe("Proposal Retrieval", function () {
    beforeEach(async function () {
      // Create some test proposals
      await proposalContract.createProposal("First", "First proposal");
      await proposalContract.connect(addr1).createProposal("Second", "Second proposal");
    });

    it("Should return all proposals", async function () {
      const proposals = await proposalContract.getProposals();
      expect(proposals.length).to.equal(2);
    });

    it("Should store proposals with correct proposer addresses", async function () {
      const proposals = await proposalContract.getProposals();
      expect(proposals[0].proposer).to.equal(owner.address);
      expect(proposals[1].proposer).to.equal(addr1.address);
    });

    it("Should return correct proposal count", async function () {
      const count = await proposalContract.getProposalCount();
      expect(count).to.equal(2);
    });
  });
});

async function getBlockTimestamp() {
  const blockNumber = await ethers.provider.getBlockNumber();
  const block = await ethers.provider.getBlock(blockNumber);
  return block.timestamp;
} 