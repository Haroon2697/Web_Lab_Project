import { NavLink, Route, Routes } from 'react-router-dom'
import { AdminDashboardPage } from './pages/AdminDashboardPage.tsx'
import { AdminLoginPage } from './pages/AdminLoginPage.tsx'
import { AnalyticsReportsPage } from './pages/AnalyticsReportsPage.tsx'
import { GamePage } from './pages/GamePage.tsx'
import { GameDataManagementPage } from './pages/GameDataManagementPage.tsx'
import { GameHistoryPage } from './pages/GameHistoryPage.tsx'
import { GuessSubmissionPage } from './pages/GuessSubmissionPage.tsx'
import { LandingPage } from './pages/LandingPage.tsx'
import { LeaderboardPage } from './pages/LeaderboardPage.tsx'
import { LeaderboardControlPage } from './pages/LeaderboardControlPage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { ProfilePage } from './pages/ProfilePage.tsx'
import { ResultPage } from './pages/ResultPage.tsx'
import { SignupPage } from './pages/SignupPage.tsx'
import { UserManagementPage } from './pages/UserManagementPage.tsx'

const userNavItems = [
  { to: '/', label: 'Landing' },
  { to: '/login', label: 'Login' },
  { to: '/signup', label: 'Signup' },
  { to: '/game', label: 'Game' },
  { to: '/guess-submit', label: 'Guess Submit' },
  { to: '/result', label: 'Result' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/profile', label: 'Profile' },
  { to: '/history', label: 'History' },
]

const adminNavItems = [
  { to: '/admin/login', label: 'Admin Login' },
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/users', label: 'User Management' },
  { to: '/admin/game-data', label: 'Game Data' },
  { to: '/admin/leaderboard', label: 'Leaderboard Control' },
  { to: '/admin/reports', label: 'Analytics' },
]

function App() {
  return (
    <main className="min-h-screen bg-geo-bg text-white">
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-10">
        <header className="mb-6 rounded-2xl border border-geo-p20/40 bg-geo-card p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-geo-p10">Component Planning Scaffold</p>
          <h1 className="mt-2 text-3xl font-black">GeoExplorer Team Template</h1>
          <p className="mt-2 text-geo-p10">
            Template-only pages and screens from your proposal. No API wiring or business logic added.
          </p>
        </header>

        <section className="mb-6 space-y-3">
          <p className="text-sm font-semibold text-geo-aqua">User Panel Screens — Haroon Aziz (i22-2697)</p>
          <nav className="flex flex-wrap gap-2">
            {userNavItems.map((item) => (
              <NavButton key={item.to} to={item.to} label={item.label} />
            ))}
          </nav>
          <p className="text-sm font-semibold text-geo-warning">Admin Panel Screens — Khizar Shahid (i22-2595)</p>
          <nav className="flex flex-wrap gap-2">
            {adminNavItems.map((item) => (
              <NavButton key={item.to} to={item.to} label={item.label} />
            ))}
          </nav>
        </section>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/guess-submit" element={<GuessSubmissionPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/history" element={<GameHistoryPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<UserManagementPage />} />
          <Route path="/admin/game-data" element={<GameDataManagementPage />} />
          <Route path="/admin/leaderboard" element={<LeaderboardControlPage />} />
          <Route path="/admin/reports" element={<AnalyticsReportsPage />} />
        </Routes>
      </div>
    </main>
  )
}

function NavButton({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-lg border px-4 py-2 text-sm font-medium transition ${
          isActive
            ? 'border-geo-p50 bg-geo-p50/20 text-white'
            : 'border-geo-p20/40 bg-geo-card text-geo-p10 hover:border-geo-aqua hover:text-geo-aqua'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

export default App
