import { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  IconButton,
  Collapse,
  Chip,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useQuestions } from "../queries/questions";

interface QuestionHistoryProps {
  fileId?: string;
}

export const QuestionHistory = ({ fileId }: QuestionHistoryProps) => {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const { data: questions, isLoading } = useQuestions(fileId);

  if (isLoading) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Loading questions...</Typography>
      </Box>
    );
  }

  if (!questions?.length) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="text.secondary">No questions asked yet.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2, maxHeight: 400, overflow: 'auto' }}>
      <List disablePadding>
        {questions.map((question, index) => (
          <Box key={question.id}>
            {index > 0 && <Divider />}
            <ListItem
              disablePadding
              sx={{ 
                display: 'block',
                px: 2,
                py: 1.5
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle1" sx={{ flex: 1 }}>
                      {question.question}
                    </Typography>
                    <Chip
                      size="small"
                      label={new Date(question.askedAt).toLocaleDateString()}
                    />
                  </Box>
                  <Collapse in={expandedQuestion === question.id}>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {question.answer}
                      </Typography>
                      {!fileId && (
                        <Typography variant="caption" color="text.secondary">
                          File: {question.file.name}
                        </Typography>
                      )}
                    </Box>
                  </Collapse>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => setExpandedQuestion(
                    expandedQuestion === question.id ? null : question.id
                  )}
                  sx={{ mt: 0.5 }}
                >
                  {expandedQuestion === question.id ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>
            </ListItem>
          </Box>
        ))}
      </List>
    </Box>
  );
}; 