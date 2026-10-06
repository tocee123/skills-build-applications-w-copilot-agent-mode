import { useEffect, useState } from 'react';
import { apiBase, normalizeCollection } from '../api';

export default function Users() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiBase}/api/users/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then(normalizeCollection)
      .then(setItems)
      .catch((err) => {
        console.error('Failed to load users:', err);
        setError('Unable to load users right now.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      {loading ? <p className="text-body-secondary">Loading users...</p> : null}
      {!loading && !error && items.length === 0 ? <p className="text-body-secondary">No users found.</p> : null}
      <div className="row g-3">
        {items.map((item) => (
          <div key={item._id || item.id} className="col-md-6 col-xl-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5 card-title">{item.username || 'User'}</h3>
                <p className="card-text mb-1"><strong>Email:</strong> {item.email || '—'}</p>
                <p className="card-text mb-1"><strong>Age:</strong> {item.age || '—'}</p>
                <p className="card-text mb-0"><strong>Fitness level:</strong> {item.fitnessLevel || 'beginner'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
