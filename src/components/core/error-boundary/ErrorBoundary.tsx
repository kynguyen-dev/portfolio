import { Component, type ErrorInfo, type ReactNode } from 'react';
import { PFTypography, PFButton } from '@components/core';

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
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B0D2E] via-[#1B1145] to-[#4A1942] p-6'>
          <div className='flex flex-col items-center gap-6 text-center max-w-lg'>
            <PFTypography variant='h1' className='text-[#F5D060] font-bold'>
              Oops!
            </PFTypography>
            <PFTypography variant='h3' className='text-[#FFE4B5]'>
              Something went wrong. Please try again.
            </PFTypography>
            <PFButton
              onClick={this.handleRetry}
              className='bg-[#D4A843] hover:bg-[#E8C96A]'
            >
              Try Again
            </PFButton>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
