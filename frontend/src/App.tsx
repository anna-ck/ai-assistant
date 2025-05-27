import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { FileUpload } from './components/FileUpload';
import { FileQuestion } from './components/FileQuestion';

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={{ py: 4, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', width: '100vw' }}>
          <FileUpload />
          <FileQuestion />
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
