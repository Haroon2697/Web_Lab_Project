/**
 * Redux store configuration (Redux Toolkit).
 * Combines all Haroon feature slices into a single store.
 */
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import gameReducer from '../features/game/gameSlice'
import leaderboardReducer from '../features/leaderboard/leaderboardSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    leaderboard: leaderboardReducer,
    user: userReducer,
  },
})
