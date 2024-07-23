import React from 'react';
import './App.css';
import ProjectManagementPlatform from './components/ProjectManagementPlatform';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Web Project Guider</h1>
      </header>
      <main>
        <ProjectManagementPlatform />
      </main>
      <footer>
        <p>© 2024 Web Project Guider. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;