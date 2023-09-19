import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './PrivacyPolicy.css'; // Reuse the existing CSS for styling
import logo from '../../assets/bargain_logo_transparent.png'; // Import the logo image

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <Link to="/">
        {/* Clickable logo that links back to the home page */}
        <img src={logo} alt="Company Logo" className="logo" />
      </Link>
      <h1>Privacy Policy</h1>
      <p>
        Bargain ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains our data collection and usage practices.
      </p>
      <p>
        We want to inform you that the App may collect location data with your explicit consent. This location data is used solely for the purpose of displaying your location within the App and enhancing your experience. We respect your privacy and will only access your location data when you grant us permission to do so.
      </p>
      <p>
        While we do not collect personal information for our own use, some third-party services or features integrated into the App may have their own data collection practices. We recommend reviewing their respective privacy policies for more information.
      </p>
      <p>
        We take security measures to protect your personal information and
        ensure it is not accessed or disclosed without your consent.
      </p>
      <p>
        If you have any questions or concerns about our privacy practices, please contact us at bargainsipandsave@gmail.com.
      </p>
      <p>
        Effective Date: September 12, 2023
      </p>
    </div>
  );
};

export default PrivacyPolicy;