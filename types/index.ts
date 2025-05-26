export interface Proposal {
  id: number;
  title: string;
  description: string;
  proposer: string;
  timestamp: number;
}

export interface ProposalFormData {
  title: string;
  description: string;
}

export interface Web3State {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
}
