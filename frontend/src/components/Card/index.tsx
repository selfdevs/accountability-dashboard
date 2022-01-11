import React, { FC } from 'react';
import './stylesheet.css';

type CardProps = {
  className?: string;
};

const Card: FC<CardProps> = ({ children, className }) => (
  <div className={`${className} card shadowed`}>{children}</div>
);

export default Card;
