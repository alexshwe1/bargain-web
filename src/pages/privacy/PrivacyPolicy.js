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
    
      <p><strong>Bargain</strong> ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains our data collection and usage practices.</p>
      
      <p>We want to inform you that, in addition to the previously mentioned location data, Bargain now collects the following user data: Full Name, Username, Email, and Password. This information is collected with your explicit consent and is used for the following purposes:</p>
      
      <p>Your full name and username may be displayed to other users within the App if you choose to make this information public in your user profile. Your email and password information are collected to create and authenticate your account. This is essential for the security and access control of your account within the App.</p>
      
      <p>We want to assure you that Bargain is committed to safeguarding your personal data, and we do not distribute, sell, or share your information with third parties for any purpose.</p>
      
      <p>While we do not collect personal information for our own use, some third-party services or features integrated into the App may have their own data collection practices. We recommend reviewing their respective privacy policies for more information on how they handle your data.</p>
      
      <p>We take the security of your personal information seriously. We implement appropriate technical and organizational measures to protect your data against unauthorized access and maintain data integrity.</p>
      
      <p>Your use of the App and the provision of personal information constitute your consent to the collection, use, and disclosure of your data as described in this Privacy Policy.</p>
      
      <p>If you have any questions or concerns about our privacy practices, please do not hesitate to contact us at <a href="mailto:bargainsipandsave@gmail.com">bargainsipandsave@gmail.com</a>.</p>
      
      <p><strong>Bargain</strong> reserves the right to update this Privacy Policy. Any changes to this policy will be communicated to you through the App or by email, as appropriate.</p>
      
      <p>By using the App, you agree to the terms of this Privacy Policy. Please review this policy regularly to stay informed of our data practices. Your continued use of the App signifies your acceptance of any updates or changes to this policy.</p>
      
      <p>If you have any questions or concerns about our privacy practices, please contact us at <a href="mailto:bargainsipandsave@gmail.com">bargainsipandsave@gmail.com</a>.</p>
      
      <p><strong>Effective Date:</strong> September 12, 2023</p>
    </div>
  );
};

export default PrivacyPolicy;