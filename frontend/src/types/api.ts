export interface FileInfo {
  id: string;
  name: string;
  uploadedAt: string;
}

export interface AskResponse {
  answer: string;
}

export interface ApiError {
  message: string;
} 