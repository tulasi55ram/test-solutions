import React, { Component } from 'react';
import Typography from '@mui/material/Typography';


import { IErrorBoundaryProps, IErrorBoundaryState } from './types';

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // we can log this error using sentry or any other logging service
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Typography variant="h6" color="error">
          Something went wrong.
        </Typography>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary