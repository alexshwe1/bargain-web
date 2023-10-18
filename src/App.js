import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Home from './pages/Home/Home';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import Support from './pages/Support/Support';
import DealsPortal from './pages/DealsPortal/DealsPortal';

function App() {
  return (
    <div className="App">
      <div class="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/support" element={<Support />} />
          <Route path="/dealsPortal" element={<DealsPortal />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;