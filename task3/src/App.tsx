import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ListData } from './components/ListData';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <ListData />
      </ErrorBoundary>
    </div>
  );
}

export default App;
