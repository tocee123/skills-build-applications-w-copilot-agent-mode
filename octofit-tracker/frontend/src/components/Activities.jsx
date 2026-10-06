import { useEffect, useState } from 'react';
import { apiBase, normalizeCollection } from '../api';

export default function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiBase}/api/activities/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then(normalizeCollection)
      .then(setItems)
      .catch((err) => {
        console.error('Failed to load activities:', err);
        setError('Unable to load activities right now.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      {loading ? <p className="text-body-secondary">Loading activities...</p> : null}
      {!loading && !error && items.length === 0 ? <p className="text-body-secondary">No activities recorded yet.</p> : null}
      <div className="row g-3">
        {items.map((item) => (
          <div key={item._id || item.id} className="col-md-6 col-xl-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5 card-title">{item.type || 'Activity'}</h3>
                <p className="card-text mb-2"><strong>Duration:</strong> {item.durationMinutes ?? '—'} min</p>
                <p className="card-text mb-2"><strong>Calories:</strong> {item.caloriesBurned ?? 0}</p>
                <p className="card-text mb-0"><strong>Notes:</strong> {item.notes || 'No notes added.'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
