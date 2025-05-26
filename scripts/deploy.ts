import { ethers } from "hardhat";

async function main() {
  console.log("Deploying ProposalContract...");

  const ProposalContract = await ethers.getContractFactory("ProposalContract");
  const proposalContract = await ProposalContract.deploy();

  await proposalContract.deployed();

  console.log(`ProposalContract deployed to: ${proposalContract.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 