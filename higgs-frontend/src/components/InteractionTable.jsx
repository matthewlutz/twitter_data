import React from 'react';

function InteractionTable({ interactions, filters, onSelectTweet, onDelete, onEdit }) {
  const filtered = interactions
    .filter((item) =>
      item.userA.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.userB.toLowerCase().includes(filters.search.toLowerCase())
    )
    .filter((item) =>
      filters.type === 'all' ? true : item.type === filters.type
    )
    .filter((item) =>
      filters.followsOnly ? item.follows : true
    )
    .sort((a, b) => {
      const field = filters.sortBy;
      const dir = filters.sortOrder === 'asc' ? 1 : -1;
      return a[field] > b[field] ? dir : -dir;
    });

    return (
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>User A</th>
            <th style={styles.th}>User B</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Timestamp</th>
            <th style={styles.th}>Follows?</th>
            <th style={styles.th}>Edit</th>
            <th style={styles.th}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.id}>
              <td
                style={{ ...styles.td, ...styles.link }}
                onClick={() => onSelectTweet(item.tweetId)}
              >
                {item.userA}
              </td>
              <td style={styles.td}>{item.userB}</td>
              <td style={styles.td}>{item.type}</td>
              <td style={styles.td}>{new Date(item.timestamp).toLocaleString()}</td>
              <td style={styles.td}>{item.follows ? 'Yes' : 'No'}</td>
              <td style={styles.td}>
                <button style={styles.editBtn} onClick={() => onEdit(item)}>Edit</button>
              </td>
              <td style={styles.td}>
                <button style={styles.deleteBtn} onClick={() => onDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );    
}

const styles = {
  table: {
    width: '100%',
    marginTop: '1rem',
    borderCollapse: 'collapse',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
    border: '1px solid #ccc',
  },
  th: {
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderBottom: '2px solid #ccc',
  },
  td: {
    padding: '12px',
    textAlign: 'center',
    borderBottom: '1px solid #eee',
  },
  link: {
    color: 'black',
    cursor: 'pointer',
  },
  editBtn: {
    backgroundColor: '#e7eaf1',
    border: '1px solid #ccc',
    padding: '5px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  deleteBtn: {
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    color: '#721c24',
    padding: '5px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default InteractionTable;
