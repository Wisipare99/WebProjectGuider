// src/components/ui/textarea.js
import React from 'react';

const Textarea = ({ value, onChange, placeholder, rows, className = '' }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className={`px-4 py-2 border rounded ${className}`}
  />
);

export default Textarea;
