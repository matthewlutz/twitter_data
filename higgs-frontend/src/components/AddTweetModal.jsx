import React, { useState } from 'react';

function AddTweetModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    userA: '',
    userB: '',
    type: 'retweet',
    content: '',
    timestamp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { userA, userB, type, content, timestamp } = form;

    if (!userA || !userB || !type || !content || !timestamp) {
      alert('Please fill out all required fields.');
      return;
    }

    onAdd(form);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Add New Tweet</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="userA"
            placeholder="User A (actor)"
            value={form.userA}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="userB"
            placeholder="User B (other)"
            value={form.userB}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="retweet">Retweet</option>
            <option value="mention">Mention</option>
            <option value="reply">Reply</option>
          </select>
          <textarea
            name="content"
            placeholder="Tweet content"
            value={form.content}
            onChange={handleChange}
            required
            style={styles.textarea}
          />
          <input
            name="timestamp"
            type="datetime-local"
            value={form.timestamp}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.button}>Submit</button>
            <button type="button" onClick={onClose} style={styles.cancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    background: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff', padding: '2rem', borderRadius: '10px', width: '400px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  },
  form: {
    display: 'flex', flexDirection: 'column', gap: '0.75rem'
  },
  input: {
    padding: '0.5rem', fontSize: '1rem'
  },
  textarea: {
    padding: '0.5rem', fontSize: '1rem', height: '80px'
  },
  buttonGroup: {
    display: 'flex', justifyContent: 'space-between', marginTop: '1rem'
  },
  button: {
    backgroundColor: '#007BFF', color: '#fff', padding: '0.5rem 1rem',
    border: 'none', borderRadius: '5px', cursor: 'pointer'
  },
  cancel: {
    backgroundColor: '#ccc', color: '#000', padding: '0.5rem 1rem',
    border: 'none', borderRadius: '5px', cursor: 'pointer'
  }
};

export default AddTweetModal;
