// SupportPage.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import '../privacy/PrivacyPolicy.css'; // Reuse the existing CSS for styling
import logo from '../../assets/bargain_logo_transparent.png'; // Import the logo image

const Support = () => {
  return (
    <div className="privacy-policy">
      <Link to="/">
        {/* Clickable logo that links back to the home page */}
        <img src={logo} alt="Company Logo" className="logo" />
      </Link>
      <h1>Contact Support</h1>
      <p>
        If you have any questions or need assistance, please feel free to
        contact our support team at bargainsipandsave@gmail.com.
      </p>
    </div>
  );
};

export default Support;