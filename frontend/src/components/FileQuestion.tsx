import { useState, useCallback } from 'react';
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
  Stack,
  Fade,
} from '@mui/material';
import { useFiles } from '../queries/files';
import { useAskQuestion } from '../mutations/ask';
import { QuestionHistory } from './QuestionHistory';
import { useQueryClient } from '@tanstack/react-query';

export const FileQuestion = () => {
  const [selectedFileId, setSelectedFileId] = useState<string>('');
  const [question, setQuestion] = useState('');
  const [lastAnswer, setLastAnswer] = useState<{ question: string; answer: string } | null>(null);
  const { data: files, isLoading: isLoadingFiles } = useFiles();
  const askMutation = useAskQuestion();
  const queryClient = useQueryClient();

  const handleFileChange = useCallback((newFileId: string) => {
    setSelectedFileId(newFileId);
    setQuestion('');
    setLastAnswer(null);
    queryClient.invalidateQueries({ queryKey: ['questions', newFileId] });
  }, [queryClient]);

  const handleAsk = async () => {
    if (!selectedFileId || !question) return;

    try {
      const result = await askMutation.mutateAsync({
        fileId: selectedFileId,
        question,
      });
      setLastAnswer({ question, answer: result.data });
      setQuestion('');
      queryClient.invalidateQueries({ queryKey: ['questions', selectedFileId] });
    } catch (error) {
      console.error('Failed to get answer:', error);
    }
  };

  if (isLoadingFiles) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
      <Box sx={{ flex: 1 }}>
        <Paper sx={{ p: 3 }}>
          <Box component="header">
            <Typography component="h2" variant="h6" gutterBottom>
              Ask a Question
            </Typography>
          </Box>
          <Box component="main">
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select File</InputLabel>
              <Select
                value={selectedFileId}
                label="Select File"
                onChange={(e) => handleFileChange(e.target.value)}
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
              disabled={!selectedFileId}
            />

            <Button
              variant="contained"
              onClick={handleAsk}
              disabled={!selectedFileId || !question || askMutation.isPending}
              fullWidth
            >
              {askMutation.isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Ask Question'
              )}
            </Button>

            {askMutation.isError && (
              <Box sx={{ mt: 2 }}>
                <Typography component="div" color="error">
                  Failed to get answer. Please try again.
                </Typography>
              </Box>
            )}

            <Fade in={!!lastAnswer}>
              <Paper 
                elevation={0} 
                sx={{ 
                  mt: 3, 
                  p: 2, 
                  bgcolor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1
                }}
              >
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Last Question:
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {lastAnswer?.question}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Answer:
                </Typography>
                <Typography variant="body1">
                  {lastAnswer?.answer}
                </Typography>
              </Paper>
            </Fade>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Paper sx={{ p: 3 }}>
          <Box component="header">
            <Typography component="h2" variant="h6" gutterBottom>
              Question History
            </Typography>
          </Box>
          <Box component="main">
            <QuestionHistory fileId={selectedFileId} />
          </Box>
        </Paper>
      </Box>
    </Stack>
  );
}; 