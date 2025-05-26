import { ethers } from 'ethers';
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';

const contractABI = [
  "function createProposal(string memory _title, string memory _description) public",
  "function getProposals() public view returns (tuple(uint256 id, string title, string description, address proposer, uint256 timestamp)[] memory)",
  "function getProposalCount() public view returns (uint256)",
  "event ProposalCreated(uint256 indexed id, string title, address indexed proposer, uint256 timestamp)"
];

export const getContract = async () => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed');
  }

  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
};

export const createProposal = async (title: string, description: string) => {
  const contract = await getContract();
  const tx = await contract.createProposal(title, description);
  await tx.wait();
  return tx;
};

export const getProposals = async () => {
  const contract = await getContract();
  const proposals = await contract.getProposals();
  return proposals;
};
