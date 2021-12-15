import React, { FC } from 'react';
import './stylesheet.css';

const Card: FC = ({ children }) => (
  <div className="card">
    {children}
  </div>
);

export default Card;
