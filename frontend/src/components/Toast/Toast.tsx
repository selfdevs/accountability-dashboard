import React from 'react';
import './styles.css';

const Toast = ({ children }) => (
  <p className={`toast shadowed ${children ? 'toast-visible' : ''}`}>
    {children}
  </p>
);

export default Toast;
