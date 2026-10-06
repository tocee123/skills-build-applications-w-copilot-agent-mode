import { useEffect, useState } from 'react';
import { endpoints } from '../api';

function normalizeCollection(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(endpoints.leaderboard)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setItems(normalizeCollection(data)))
      .catch((err) => {
        console.error('Failed to load leaderboard:', err);
        setError('Unable to load leaderboard right now.');
      });
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {items.map((item) => (
          <div key={item._id || item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-semibold">#{item.rank ?? '—'}</div>
              <small className="text-body-secondary">{item.challenge || 'Challenge'}</small>
            </div>
            <span className="badge bg-primary rounded-pill">{item.score ?? 0} pts</span>
          </div>
        ))}
      </div>
    </section>
  );
}
