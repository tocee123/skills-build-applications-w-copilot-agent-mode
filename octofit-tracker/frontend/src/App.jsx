import { NavLink, Route, Routes } from 'react-router-dom'

const sections = [
  { path: '/', label: 'Overview' },
  { path: '/activities', label: 'Activities' },
  { path: '/teams', label: 'Teams' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <main className="container py-4">
      <header className="mb-4">
        <p className="text-uppercase text-body-secondary mb-1">OctoFit Tracker</p>
        <h1 className="h2 mb-0">Training, together.</h1>
      </header>
      <nav className="nav nav-pills mb-4" aria-label="Main navigation">
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
        {sections.map(({ path, label }) => (
          <Route key={path} path={path} element={<h2 className="h4">{label}</h2>} />
        ))}
        <Route path="*" element={<h2 className="h4">Page not found</h2>} />
      </Routes>
    </main>
  )
}

export default App
