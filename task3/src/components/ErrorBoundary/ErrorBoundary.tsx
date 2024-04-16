import React, { Component, ErrorInfo } from 'react';

import { IProps, IState } from './types';

class ErrorBoundary extends Component<IProps, IState> {
  state: IState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): IState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Something went wrong: {this.state.error?.message}</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary