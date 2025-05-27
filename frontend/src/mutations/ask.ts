import { useMutation } from '@tanstack/react-query';
import { type AskResponse } from '../types/api';

const API_URL = import.meta.env.VITE_API_URL;

interface AskQuestionParams {
  fileId: string;
  question: string;
}

export const useAskQuestion = () => {
  return useMutation<AskResponse, Error, AskQuestionParams>({
    mutationFn: async ({ fileId, question }) => {
      const response = await fetch(`${API_URL}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileId, question }),
      });

      if (!response.ok) {
        throw new Error('Failed to get answer');
      }

      return response.json();
    },
  });
}; 