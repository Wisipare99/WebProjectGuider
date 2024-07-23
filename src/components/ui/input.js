// src/components/ui/input.js
import React from 'react';

const Input = ({ value, onChange, placeholder, className = '' }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`px-4 py-2 border rounded ${className}`}
  />
);

export default Input;
