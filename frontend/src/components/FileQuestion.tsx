import { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  FormControl,
  InputLabel,
  CircularProgress,
  Paper,
} from '@mui/material';
import { useFiles } from '../queries/files';
import { useAskQuestion } from '../mutations/ask';

export const FileQuestion = () => {
  const [selectedFileId, setSelectedFileId] = useState<string>('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);

  const { data: files, isLoading: isLoadingFiles } = useFiles();
  const askMutation = useAskQuestion();

  const handleAsk = async () => {
    if (!selectedFileId || !question) return;

    try {
      const result = await askMutation.mutateAsync({
        fileId: selectedFileId,
        question,
      });
      setAnswer(result.data);
    } catch (error) {
      console.error('Failed to get answer:', error);
    }
  };

  if (isLoadingFiles) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Ask a Question
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Select File</InputLabel>
          <Select
            value={selectedFileId}
            label="Select File"
            onChange={(e) => setSelectedFileId(e.target.value)}
          >
            {files?.map((file) => (
              <MenuItem key={file.id} value={file.id}>
                {file.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Your Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          onClick={handleAsk}
          disabled={!selectedFileId || !question || askMutation.isPending}
        >
          {askMutation.isPending ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Ask Question'
          )}
        </Button>
      </Paper>

      {answer && (
        <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h6" gutterBottom>
            Answer
          </Typography>
          <Typography>{answer}</Typography>
        </Paper>
      )}

      {askMutation.isError && (
        <Typography color="error" sx={{ mt: 2 }}>
          Failed to get answer. Please try again.
        </Typography>
      )}
    </Box>
  );
}; 