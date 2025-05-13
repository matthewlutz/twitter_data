import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/login', {
        user: username,
        pass: password,
      });
      onLogin(res.data.token);
    } catch (err) {
      console.error(err);
      setError('Invalid username or password');
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Admin Login</h2>
        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button style={styles.button} type="submit">
          Login
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f5f5f5',
  },
  form: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '350px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    margin: 0,
    textAlign: 'center',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
    textAlign: 'center',
  },
};

export default LoginForm;
