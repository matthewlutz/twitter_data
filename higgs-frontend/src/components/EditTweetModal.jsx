import React, { useState } from 'react';

function EditTweetModal({ tweet, onUpdate, onDelete, onClose }) {
  const [form, setForm] = useState({ ...tweet });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdate = () => {
    if (!form.userA || !form.userB || !form.type || !form.content || !form.timestamp) {
      alert('All fields are required');
      return;
    }
    onUpdate(form);
    onClose();
  };

  const handleDelete = () => {
    const confirm = window.confirm('Are you sure you want to delete this tweet?');
    if (confirm) {
      onDelete(form.id);
      onClose();
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Edit Tweet</h3>
        <input name="userA" value={form.userA} onChange={handleChange} style={styles.input} />
        <input name="userB" value={form.userB} onChange={handleChange} style={styles.input} />
        <select name="type" value={form.type} onChange={handleChange} style={styles.input}>
          <option value="retweet">Retweet</option>
          <option value="mention">Mention</option>
          <option value="reply">Reply</option>
        </select>
        <textarea name="content" value={form.content} onChange={handleChange} style={styles.textarea} />
        <input name="timestamp" type="datetime-local" value={form.timestamp} onChange={handleChange} style={styles.input} />
        <input name="media" value={form.media || ''} onChange={handleChange} style={styles.input} />
        <div style={styles.buttonGroup}>
          <button onClick={handleUpdate} style={styles.update}>Update</button>
          <button onClick={handleDelete} style={styles.delete}>Delete</button>
          <button onClick={onClose} style={styles.cancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff', padding: '2rem', borderRadius: '10px', width: '400px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  },
  input: {
    marginBottom: '0.75rem', width: '100%', padding: '0.5rem',
  },
  textarea: {
    marginBottom: '0.75rem', width: '100%', height: '80px', padding: '0.5rem',
  },
  buttonGroup: {
    display: 'flex', justifyContent: 'space-between',
  },
  update: {
    backgroundColor: '#007BFF', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px',
  },
  delete: {
    backgroundColor: '#dc3545', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px',
  },
  cancel: {
    backgroundColor: '#6c757d', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px',
  }
};

export default EditTweetModal;
