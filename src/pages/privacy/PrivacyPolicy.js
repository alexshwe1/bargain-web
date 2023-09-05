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
        This Privacy Policy outlines how we collect, use, and protect your
        personal information when you use our iOS application.
      </p>
      <h2>Information We Collect</h2>
      <p>
        We may collect information that you provide directly when you use our
        application, such as your name, email address, and any other
        information you choose to provide.
      </p>
      <h2>How We Use Your Information</h2>
      <p>
        We use your information to provide and improve our iOS application.
        This may include personalizing your experience, providing customer
        support, and sending you updates and notifications.
      </p>
      <h2>Protecting Your Information</h2>
      <p>
        We take security measures to protect your personal information and
        ensure it is not accessed or disclosed without your consent.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions or concerns about our Privacy Policy, please
        contact us at 415-676-9418.
      </p>
    </div>
  );
};

export default PrivacyPolicy;