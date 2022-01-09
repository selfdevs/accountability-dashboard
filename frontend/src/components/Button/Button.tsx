import React from 'react';
import './styles.css';

const Button = ({ children, className, ...props }) => (
  // eslint-disable-next-line react/button-has-type
  <button className={`button ${className}`} {...props}>
    {children}
  </button>
);

export default Button;
