// Footer.js
import React from 'react';
import './Footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <ul>
        <li>
          <Link to="/privacyPolicy">Privacy Policy</Link>
        </li>
        <li>
          <Link to="/support">Support</Link>
        </li>
        <li>
          <Link to="/dealsPortal">Deals Portal</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;