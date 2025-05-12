import React from 'react';

function TweetModal({ tweet, onClose }) {
  if (!tweet) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>
          Tweet by <strong>{tweet?.user || 'Unknown'}</strong>
        </h3>
        <p>{tweet?.content || 'No content available.'}</p>
        <p style={{ fontSize: '0.9rem', color: '#555' }}>
          {tweet?.timestamp
            ? new Date(tweet.timestamp).toLocaleString()
            : 'Unknown time'}
        </p>
        <button style={styles.closeButton} onClick={onClose}>
          ✖ Close
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0,
    width: '100%', height: '100%',
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    width: '400px',
    maxWidth: '90%',
    textAlign: 'center',
  },
  title: {
    marginBottom: '0.5rem',
  },
  user: {
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    fontSize: '1.1rem',
    margin: '1rem 0',
  },
  timestamp: {
    fontSize: '0.9rem',
    color: '#666',
  },
  button: {
    marginTop: '1rem',
    padding: '0.6rem 1.2rem',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default TweetModal;
