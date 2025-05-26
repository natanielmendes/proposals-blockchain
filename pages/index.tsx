import { useState, useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider, createTheme, CssBaseline, Container, Typography, Button, Box } from '@mui/material';
import ProposalForm from '../components/ProposalForm';
import ProposalList from '../components/ProposalList';
import { Web3State } from '../types';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

export default function Home() {
  const [web3State, setWeb3State] = useState<Web3State>({
    isConnected: false,
    address: null,
    chainId: null,
  });
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setWeb3State({
            isConnected: Array.isArray(accounts) && accounts.length > 0,
            address: Array.isArray(accounts) ? accounts[0] || null : null,
            chainId: chainId ? parseInt(chainId as string, 16) : null,
          });
        } catch (error) {
          console.error('Error checking connection:', error);
        }
      }
    };

    checkConnection();

    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', checkConnection);
      window.ethereum.on('chainChanged', checkConnection);
    }

    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeListener('accountsChanged', checkConnection);
        window.ethereum.removeListener('chainChanged', checkConnection);
      }
    };
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Head>
        <title>Governance Proposals dApp</title>
        <meta name="description" content="A decentralized application for governance proposals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Proposals
        </Typography>

        {!web3State.isConnected ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={connectWallet}
              sx={{ px: 4, py: 1.5 }}
            >
              Connect Wallet
            </Button>
          </Box>
        ) : (
          <Box sx={{ mt: 4 }}>
            <ProposalForm onProposalCreated={() => setShouldRefresh(!shouldRefresh)} />
            <Box sx={{ mt: 6 }}>
              <ProposalList key={shouldRefresh ? 'refresh' : 'initial'} />
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
} 