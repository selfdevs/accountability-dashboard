import React from 'react';
import './stylesheet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

const LoginButton = ({ onClick }) => (
  <div className="login-button-container">
    <button type="button" className="login-button shadowed" onClick={onClick}>
      <FontAwesomeIcon icon={faDiscord} className="social-icon" />
      Login with Discord
    </button>
  </div>
);

export default LoginButton;
