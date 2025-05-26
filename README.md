 # Governance Proposals dApp

A decentralized application that allows users to submit and view governance proposals on the Ethereum blockchain (Goerli testnet).

## Features

- Connect with MetaMask wallet
- Submit new governance proposals
- View all submitted proposals
- Real-time updates when new proposals are created

## Prerequisites

- Node.js (v14 or later)
- MetaMask browser extension
- Goerli testnet ETH (you can get some from a faucet)

## Setup

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd proposals-blockchain
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a .env file in the root directory with the following variables:
\`\`\`
SEPOLIA_RPC_URL=your_alchemy_sepolia_url
PRIVATE_KEY=your_wallet_private_key
NEXT_PUBLIC_CONTRACT_ADDRESS=deployed_contract_address
\`\`\`

4. Deploy the smart contract:
\`\`\`bash
npm run deploy
\`\`\`

5. Copy the deployed contract address and update NEXT_PUBLIC_CONTRACT_ADDRESS in your .env file

6. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Connect your MetaMask wallet by clicking the "Connect Wallet" button
2. Make sure you're connected to the Goerli testnet
3. Fill out the proposal form with a title and description
4. Submit the proposal by clicking "Create Proposal"
5. View all submitted proposals in the list below the form

## Smart Contract

The smart contract is deployed on the Goerli testnet and includes the following functions:

- `createProposal(string memory _title, string memory _description)`
- `getProposals()`
- `getProposalCount()`

## Technologies Used

- Next.js
- TypeScript
- Ethers.js
- Hardhat
- Solidity
- Material UI
