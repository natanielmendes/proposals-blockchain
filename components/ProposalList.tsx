import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress, Stack } from '@mui/material';
import { getProposals } from '../utils/contract';
import { Proposal } from '../types';

const ProposalList = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProposals = async () => {
    try {
      const fetchedProposals = await getProposals();
      // Sort proposals in reverse order (newest first)
      setProposals([...fetchedProposals].reverse());
    } catch (error) {
      console.error('Error fetching proposals:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (proposals.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1">No proposals found.</Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2} sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      {proposals.map((proposal) => (
        <Card key={proposal.id} sx={{ bgcolor: 'background.paper' }}>
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              {proposal.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {proposal.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Proposer: {proposal.proposer}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Created: {new Date(proposal.timestamp * 1000).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default ProposalList; 