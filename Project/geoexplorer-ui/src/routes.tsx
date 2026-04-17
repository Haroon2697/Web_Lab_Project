import { Route, Routes } from 'react-router-dom'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.tsx'
import { AdminLoginPage } from './pages/admin/AdminLoginPage.tsx'
import { AnalyticsReportsPage } from './pages/admin/AnalyticsReportsPage.tsx'
import { GameDataManagementPage } from './pages/admin/GameDataManagementPage.tsx'
import { LeaderboardControlPage } from './pages/admin/LeaderboardControlPage.tsx'
import { UserManagementPage } from './pages/admin/UserManagementPage.tsx'
import Login from './pages/user/Login.tsx'
import Signup from './pages/user/Signup.tsx'
import { GamePage } from './pages/user/GamePage.tsx'
import { GuessSubmissionPage } from './pages/user/GuessSubmissionPage.tsx'
import { ResultPage } from './pages/user/ResultPage.tsx'
import { GameHistoryPage } from './pages/user/GameHistoryPage.tsx'
import { LandingPage } from './pages/user/LandingPage.tsx'
import { LeaderboardPage } from './pages/user/LeaderboardPage.tsx'
import { ProfilePage } from './pages/user/ProfilePage.tsx'
import { ROUTES } from './utils/constants.ts'

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
