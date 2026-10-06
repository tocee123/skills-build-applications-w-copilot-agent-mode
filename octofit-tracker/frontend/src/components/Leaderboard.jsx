import { useEffect, useState } from 'react';
import { apiBase, normalizeCollection } from '../api';

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiBase}/api/leaderboard/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then(normalizeCollection)
      .then(setItems)
      .catch((err) => {
        console.error('Failed to load leaderboard:', err);
        setError('Unable to load leaderboard right now.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      {loading ? <p className="text-body-secondary">Loading leaderboard...</p> : null}
      {!loading && !error && items.length === 0 ? <p className="text-body-secondary">No leaderboard scores yet.</p> : null}
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
