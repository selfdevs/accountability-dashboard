import React from 'react';
import { NavLink } from 'react-router-dom';
import './stylesheet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

const LoginButton = () => (
  <div className="login-button-container">
    <button type="button" className="login-button shadowed">
      <FontAwesomeIcon icon={faDiscord} className="social-icon" />
      Login with Discord
    </button>
    <NavLink to="/longlikeshort">Go to example dashboard</NavLink>
  </div>
);

export default LoginButton;
