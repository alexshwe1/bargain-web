import React from 'react';
import './Home.css';
import logo from '../../assets/bargain_logo_transparent.png';

const Home = () => {
  return (
    <div className="App">
      <div className="logo-container">
        <img src={logo} alt="Company Logo" className="homepage-logo" />
      </div>
    </div>
  );
};

export default Home;