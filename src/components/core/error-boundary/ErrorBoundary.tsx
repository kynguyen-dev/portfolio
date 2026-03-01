import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Global React error boundary — catches render-time errors in the
 * component tree and shows a friendly fallback UI.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(180deg, #0B0D2E 0%, #1B1145 40%, #4A1942 100%)',
            p: 3,
          }}
        >
          <Stack alignItems="center" spacing={3} sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ color: '#F5D060', fontWeight: 700 }}>
              Oops!
            </Typography>
            <Typography variant="h6" sx={{ color: '#FFE4B5', maxWidth: 480 }}>
              Something went wrong. Please try again.
            </Typography>
            <Button
              variant="contained"
              onClick={this.handleRetry}
              sx={{
                backgroundColor: '#D4A843',
                '&:hover': { backgroundColor: '#E8C96A' },
              }}
            >
              Try Again
            </Button>
          </Stack>
        </Box>
      );
    }

    return this.props.children;
  }
}
