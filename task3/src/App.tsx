import React from 'react';

// components 
import { ErrorBoundary } from './components/ErrorBoundary';
import { BookingScreen } from './screens/BookingScreen';


function App() {
  return (
    <div className="App">
        <ErrorBoundary>
          <BookingScreen />
        </ErrorBoundary>
    </div>
  );
}

export default App;
