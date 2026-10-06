import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

const sections = [
  { path: '/', label: 'Overview' },
  { path: '/activities', label: 'Activities' },
  { path: '/teams', label: 'Teams' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/users', label: 'Users' },
  { path: '/workouts', label: 'Workouts' },
]

function Overview() {
  return (
    <section>
      <div className="row g-4">
        <div className="col-md-6 col-xl-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h5">Activity</h2>
              <p className="mb-0 text-body-secondary">Track every workout, run, and recovery session.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h5">Teams</h2>
              <p className="mb-0 text-body-secondary">Create groups and encourage shared progress.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h5">Leaderboard</h2>
              <p className="mb-0 text-body-secondary">Spot the top performers in each challenge.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h5">Workouts</h2>
              <p className="mb-0 text-body-secondary">Personalized plans for every training level.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <main className="container py-4">
      <header className="mb-4">
        <p className="text-uppercase text-body-secondary mb-1">OctoFit Tracker</p>
        <h1 className="h2 mb-0">Training, together.</h1>
      </header>
      <nav className="nav nav-pills mb-4 flex-wrap" aria-label="Main navigation">
        {sections.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<h2 className="h4">Page not found</h2>} />
      </Routes>
    </main>
  )
}

export default App
