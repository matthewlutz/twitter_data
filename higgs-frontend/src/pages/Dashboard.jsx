import React, { useState, useEffect } from 'react';
import FilterControls from '../components/FilterControls.jsx';
import InteractionTable from '../components/InteractionTable.jsx';
import AddTweetModal from '../components/AddTweetModal.jsx';
import TweetModal from '../components/TweetModal.jsx';
import EditTweetModal from '../components/EditTweetModal.jsx';
import { getTweetById } from '../services/api';


import {
  fetchInteractions,
  deleteInteraction,
} from '../services/api.js';

function Dashboard() {
  const [interactions, setInteractions] = useState([]);
  const [selectedTweet, setSelectedTweet] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTweet, setEditingTweet] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    followsOnly: false,
    sortBy: 'timestamp',
    sortOrder: 'desc',
  });

  // handler for fetching interactions
  useEffect(() => {
    fetchInteractions()
      .then((res) => setInteractions(res.data))
      .catch((err) => console.error('Failed to fetch interactions:', err));
  }, []);

  // handler for deleting interactions
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this interaction?');
    if (!confirmed) return;

    try {
      await deleteInteraction(id);
      setInteractions((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error('Failed to delete interaction:', err);
      alert('Error deleting interaction.');
    }
  };

  //handler for seeing the contents of a tweet
  const handleTweetSelect = async (tweetId) => {
    try {
      const res = await getTweetById(tweetId);
      setSelectedTweet(res.data); // contains user, content, timestamp
    } catch (err) {
      console.error('Failed to load tweet:', err);
      alert('Tweet not found.');
    }
  };

  //handler for updating tweets
  const handleUpdateTweet = (updated) => {
    setInteractions(prev => prev.map(i => i.id === updated.id ? updated : i));
  };

  //handler for adding a tweet
  const handleAddTweet = (form) => {
    const newInteraction = {
      id: interactions.length + 1,
      userA: form.userA,
      userB: form.userB,
      type: form.type,
      timestamp: form.timestamp,
      tweetId: `t${interactions.length + 100}`,
      follows: false,
    };
    setInteractions([newInteraction, ...interactions]);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2>Higgs Twitter Interaction Dashboard</h2>
        <button onClick={() => setShowAddModal(true)} style={{
          margin: '1rem auto', padding: '0.5rem 1rem', fontSize: '1rem',
          backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
        }}>
          Add Tweet
        </button>
        <FilterControls filters={filters} setFilters={setFilters} />
      </div>

      <div style={{ width: '100%' }}>
      <InteractionTable
        interactions={interactions}
        filters={filters}
        onSelectTweet={setSelectedTweet}
        onDelete={handleDelete}
        onEdit={setEditingTweet}
      />

      {editingTweet && (
        <EditTweetModal
          tweet={editingTweet}
          onClose={() => setEditingTweet(null)}
          onUpdate={handleUpdateTweet}
          onDelete={handleDelete}
        />
      )}
      </div>

      <TweetModal
        tweet={selectedTweet}
        onClose={() => setSelectedTweet(null)}
      />

      {showAddModal && (
        <AddTweetModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddTweet}
        />
      )}
    </div>
  );
}

export default Dashboard;

