import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      &copy; {new Date().getFullYear()} Stock Analysis App
    </div>
  );
};

export default Footer;
