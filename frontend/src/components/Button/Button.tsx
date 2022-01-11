import React, { ButtonHTMLAttributes, FC } from 'react';
import './styles.css';

type ButtonProps = {
  className?: string;
};

const Button: FC<ButtonProps & ButtonHTMLAttributes<any>> = ({
  children,
  className,
  ...props
}) => (
  // eslint-disable-next-line react/button-has-type
  <button className={`button shadowed ${className}`} {...props}>
    {children}
  </button>
);

export default Button;
