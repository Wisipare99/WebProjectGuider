// src/components/ui/button.js
import React from 'react';

const Button = ({ onClick, children, variant = 'default', className = '' }) => {
  const baseStyle = 'px-4 py-2 rounded focus:outline-none';
  const variantStyle =
    variant === 'ghost'
      ? 'bg-transparent hover:bg-gray-100'
      : 'bg-blue-500 text-white hover:bg-blue-600';
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
