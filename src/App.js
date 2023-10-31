import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Home from './pages/Home/Home';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import Support from './pages/Support/Support';
import { AuthContextProvider } from './contexts/AuthContext';
import Signin from './components/auth/SignIn';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DealsList from './components/dealsPortal/DealsList'

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/support" element={<Support />} />
            <Route path="/signIn" element={<Signin />} />
            <Route
              path='/account'
              element={
                <ProtectedRoute>
                  <DealsList />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </AuthContextProvider>
    </div>
  );
}

export default App;