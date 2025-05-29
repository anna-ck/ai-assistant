import { useQuery } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;

export interface Question {
  id: string;
  question: string;
  answer: string;
  askedAt: string;
  file: {
    id: string;
    name: string;
  };
}

export const useQuestions = (fileId?: string) => {
  return useQuery<Question[]>({
    queryKey: ['questions', fileId],
    queryFn: async () => {
      if (!fileId) {
        const response = await fetch(`${API_URL}/files/questions`);
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        return response.json();
      }

      const response = await fetch(`${API_URL}/files/${fileId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileId }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      return response.json();
    },
  });
}; 