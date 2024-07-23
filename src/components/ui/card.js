// src/components/ui/card.js
import React from 'react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white shadow-md rounded-md p-4 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`border-b pb-2 mb-2 ${className}`}>{children}</div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

export { Card, CardHeader, CardContent };
export default Card;
