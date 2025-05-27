import { useState } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import { useUploadFile } from '../mutations/upload';

export const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const uploadMutation = useUploadFile();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        await uploadMutation.mutateAsync(selectedFile);
        setSelectedFile(null);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Upload PDF File
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button
          variant="contained"
          component="label"
          disabled={uploadMutation.isPending}
        >
          Select File
          <input
            type="file"
            hidden
            accept=".pdf"
            onChange={handleFileChange}
          />
        </Button>
        {selectedFile && (
          <>
            <Typography>{selectedFile.name}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={uploadMutation.isPending}
            >
              {uploadMutation.isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Upload'
              )}
            </Button>
          </>
        )}
      </Box>
      {uploadMutation.isError && (
        <Typography color="error" sx={{ mt: 1 }}>
          Upload failed. Please try again.
        </Typography>
      )}
    </Box>
  );
}; 