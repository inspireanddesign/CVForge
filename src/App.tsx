import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import CreateCV from './pages/CreateCV';
import Templates from './pages/Templates';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<CreateCV />} />
          <Route path="/templates" element={<Templates />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;