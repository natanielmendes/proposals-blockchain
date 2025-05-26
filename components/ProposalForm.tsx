import { useState } from 'react';
import { TextField, Box, Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { createProposal } from '../utils/contract';
import { ProposalFormData } from '../types';

const ProposalForm = ({ onProposalCreated }: { onProposalCreated: () => void }) => {
  const [formData, setFormData] = useState<ProposalFormData>({
    title: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createProposal(formData.title, formData.description);
      setFormData({ title: '', description: '' });
      onProposalCreated();
    } catch (error) {
      console.error('Error creating proposal:', error);
    }
    setIsSubmitting(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          required
          multiline
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 2 }}
        >
          Create Proposal
        </LoadingButton>
      </Box>
    </Paper>
  );
};

export default ProposalForm; 