import { useQuery } from '@tanstack/react-query';
import { type FileInfo } from '../types/api';

const API_URL = import.meta.env.VITE_API_URL;

export const useFiles = () => {
  return useQuery<FileInfo[]>({
    queryKey: ['files'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/files`);
      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }
      return response.json();
    },
  });
}; 