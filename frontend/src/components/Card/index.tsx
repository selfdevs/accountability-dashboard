import React, { FC } from 'react';
import './stylesheet.css';

type CardProps = {
  className?: string
};

const Card: FC<CardProps> = ({ children, className }) => (
  <div className={`card ${className}`}>
    {children}
  </div>
);

export default Card;
