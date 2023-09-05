import React from 'react';
import './Footer.css'; // Import the footer.css file from the same directory

const Footer = () => {
  return (
    <footer className="footer">
      <ul>
        <li><a href="/privacy-policy">Privacy Policy</a></li>
        <li><a href="/support">Support</a></li>
      </ul>
    </footer>
  );
};

export default Footer;