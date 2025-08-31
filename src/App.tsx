import React, { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { TrainStatus } from './components/TrainStatus';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'status'>('home');
  const [selectedTrain, setSelectedTrain] = useState<string>('');

  const handleTrainSelect = (trainNumber: string) => {
    setSelectedTrain(trainNumber);
    setCurrentView('status');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedTrain('');
  };

  return (
    <>
      {currentView === 'home' ? (
        <HomePage onTrainSelect={handleTrainSelect} />
      ) : (
        <TrainStatus 
          trainNumber={selectedTrain} 
          onBack={handleBackToHome} 
        />
      )}
    </>
  );
}

export default App;