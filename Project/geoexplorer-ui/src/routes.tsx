import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/admin/AdminDashboard.tsx'
import AdminLogin from './pages/admin/AdminLogin.tsx'
import AnalyticsPage from './pages/admin/AnalyticsPage.tsx'
import GameManagement from './pages/admin/GameManagement.tsx'
import LeaderboardManagement from './pages/admin/LeaderboardManagement.tsx'
import UserManagement from './pages/admin/UserManagement.tsx'
import { GameHistoryPage } from './pages/GameHistoryPage.tsx'
import { GamePage } from './pages/GamePage.tsx'
import { GuessSubmissionPage } from './pages/GuessSubmissionPage.tsx'
import { LandingPage } from './pages/LandingPage.tsx'
import { LeaderboardPage } from './pages/LeaderboardPage.tsx'
import Login from './pages/Login.tsx'
import { ProfilePage } from './pages/ProfilePage.tsx'
import { ResultPage } from './pages/ResultPage.tsx'
import Signup from './pages/Signup.tsx'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/guess-submit" element={<GuessSubmissionPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/history" element={<GameHistoryPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/game-data" element={<GameManagement />} />
      <Route path="/admin/leaderboard" element={<LeaderboardManagement />} />
      <Route path="/admin/reports" element={<AnalyticsPage />} />
    </Routes>
  )
}
