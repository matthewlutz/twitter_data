// src/App.jsx
import React, { useState } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {!loggedIn ? (
        <LoginPage onLogin={() => setLoggedIn(true)} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;
