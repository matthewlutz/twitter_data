import React from 'react';

function FilterControls({ filters, setFilters }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Search userA/userB..."
        value={filters.search}
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value })
        }
        style={{ marginRight: '1rem' }}
      />

      <select
        value={filters.type}
        onChange={(e) =>
          setFilters({ ...filters, type: e.target.value })
        }
        style={{ marginRight: '1rem' }}
      >
        <option value="all">All</option>
        <option value="retweet">Retweet</option>
        <option value="mention">Mention</option>
        <option value="reply">Reply</option>
      </select>

      <label style={{ marginRight: '1rem' }}>
        <input
          type="checkbox"
          checked={filters.followsOnly}
          onChange={(e) =>
            setFilters({ ...filters, followsOnly: e.target.checked })
          }
        />
        {' '}Follows only
      </label>

      <select
        value={filters.sortBy}
        onChange={(e) =>
          setFilters({ ...filters, sortBy: e.target.value })
        }
        style={{ marginRight: '0.5rem' }}
      >
        <option value="userA">User A</option>
        <option value="userB">User B</option>
        <option value="type">Type</option>
        <option value="timestamp">Timestamp</option>
      </select>

      <select
        value={filters.sortOrder}
        onChange={(e) =>
          setFilters({ ...filters, sortOrder: e.target.value })
        }
      >
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>
  );
}

export default FilterControls;
