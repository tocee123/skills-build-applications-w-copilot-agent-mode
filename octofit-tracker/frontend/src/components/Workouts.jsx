import { useEffect, useState } from 'react';
import { endpoints } from '../api';

function normalizeCollection(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(endpoints.workouts)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setItems(normalizeCollection(data)))
      .catch((err) => {
        console.error('Failed to load workouts:', err);
        setError('Unable to load workouts right now.');
      });
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {items.map((item) => (
          <div key={item._id || item.id} className="col-md-6 col-xl-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5 card-title">{item.name || 'Workout'}</h3>
                <p className="card-text mb-1"><strong>Category:</strong> {item.category || 'General'}</p>
                <p className="card-text mb-1"><strong>Difficulty:</strong> {item.difficulty || 'beginner'}</p>
                <p className="card-text mb-1"><strong>Duration:</strong> {item.durationMinutes ?? '—'} min</p>
                <p className="card-text mb-0"><strong>Exercises:</strong> {(item.exercises || []).join(', ') || '—'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
