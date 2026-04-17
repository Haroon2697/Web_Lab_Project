import { Route, Routes } from 'react-router-dom'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AdminLoginPage } from './pages/admin/AdminLoginPage'
import { AnalyticsReportsPage } from './pages/admin/AnalyticsReportsPage'
import { GameDataManagementPage } from './pages/admin/GameDataManagementPage'
import { LeaderboardControlPage } from './pages/admin/LeaderboardControlPage'
import { UserManagementPage } from './pages/admin/UserManagementPage'
import Login from './pages/user/Login'
import Signup from './pages/user/Signup'
import { GamePage } from './pages/user/GamePage'
import { GuessSubmissionPage } from './pages/user/GuessSubmissionPage'
import { ResultPage } from './pages/user/ResultPage'
import { GameHistoryPage } from './pages/user/GameHistoryPage'
import { LandingPage } from './pages/user/LandingPage'
import { LeaderboardPage } from './pages/user/LeaderboardPage'
import { ProfilePage } from './pages/user/ProfilePage'
import { ROUTES } from './utils/constants'

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<LandingPage />} />
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.signup} element={<Signup />} />
      <Route path={ROUTES.game} element={<GamePage />} />
      <Route path={ROUTES.guessSubmit} element={<GuessSubmissionPage />} />
      <Route path={ROUTES.result} element={<ResultPage />} />
      <Route path={ROUTES.leaderboard} element={<LeaderboardPage />} />
      <Route path={ROUTES.profile} element={<ProfilePage />} />
      <Route path={ROUTES.history} element={<GameHistoryPage />} />
      <Route path={ROUTES.admin.login} element={<AdminLoginPage />} />
      <Route path={ROUTES.admin.dashboard} element={<AdminDashboardPage />} />
      <Route path={ROUTES.admin.users} element={<UserManagementPage />} />
      <Route path={ROUTES.admin.gameData} element={<GameDataManagementPage />} />
      <Route path={ROUTES.admin.leaderboard} element={<LeaderboardControlPage />} />
      <Route path={ROUTES.admin.reports} element={<AnalyticsReportsPage />} />
    </Routes>
  )
}
