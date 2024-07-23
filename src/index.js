// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Puedes usar un archivo CSS para estilos globales
import ProjectManagementPlatform from './App';

ReactDOM.render(
  <React.StrictMode>
    <ProjectManagementPlatform />
  </React.StrictMode>,
  document.getElementById('root'),
);
