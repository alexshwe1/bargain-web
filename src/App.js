import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Home from './pages/Home/Home';
import PrivacyPolicy from './pages/privacy/PrivacyPolicy';
import Support from './pages/support/Support';

function App() {
  return (
    <div className="App">
      <div class="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;