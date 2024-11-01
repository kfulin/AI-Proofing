// Import necessary libraries and components
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LabelPage from './pages/LabelPage';
import PredictionPage from './pages/PredictionPage';

function App() {
  return (
    // Setup the router for different page navigation
    <Router>
      <div>
        <Routes>
          {/* Define routes for different pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/label" element={<LabelPage />} />
          <Route path="/predict" element={<PredictionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
