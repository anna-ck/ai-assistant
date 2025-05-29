# AI Document Q&A Assistant

A web application that allows users to upload PDF documents and ask questions about their content using AI. This project was created using OpenAI API for learning purposes.

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI (MUI) for UI components
- TanStack Query (React Query) for data fetching
- Vite as build tool

### Backend
- NestJS (Node.js framework)
- TypeORM with PostgreSQL for database
- OpenAI API for AI capabilities
- PDF parsing with pdf-parse

## AI Implementation

The application uses OpenAI's API in two ways:
1. **Text Embeddings** (text-embedding-3-small model)
   - Converts document chunks and questions into vector embeddings
   - Enables semantic search to find relevant document sections
2. **Chat Completion** (gpt-3.5-turbo model)
   - Generates answers based on the most relevant document chunks
   - Provides natural language responses to user questions

## Features
- PDF document upload and processing
- Semantic search for relevant document sections
- Question answering with AI
- Question history tracking
- Real-time answer display 