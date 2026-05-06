/**
 * Game feature — Redux slice (Haroon).
 * Handles startGame, submitGuess, fetchHistory async thunks.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { startGameAPI, submitGuessAPI, getHistoryAPI } from './gameService'

/* ── Async Thunks ──────────────────────────────────────────── */

export const startGame = createAsyncThunk(
  'game/start',
  async (difficulty, { rejectWithValue }) => {
    try {
      return await startGameAPI(difficulty)
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to start game')
    }
  },
)

export const submitGuess = createAsyncThunk(
  'game/submit',
  async (payload, { rejectWithValue }) => {
    try {
      return await submitGuessAPI(payload)
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to submit guess')
    }
  },
)

export const fetchHistory = createAsyncThunk(
  'game/fetchHistory',
  async (params, { rejectWithValue }) => {
    try {
      return await getHistoryAPI(params)
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch history')
    }
  },
)

/* ── Slice ─────────────────────────────────────────────────── */

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    // Current session
    session: null,       // { imageUrl, options, correctCountry, difficulty, timeLimit }
    result: null,        // { isCorrect, score, correctCountry, userGuess, timeLeft }
    // History
    history: [],
    historyPage: 1,
    historyTotalPages: 1,
    historyTotal: 0,
    // UI
    loading: false,
    error: null,
  },
  reducers: {
    resetGame(state) {
      state.session = null
      state.result = null
      state.error = null
    },
    clearGameError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Start game
    builder
      .addCase(startGame.pending, (state) => {
        state.loading = true
        state.error = null
        state.session = null
        state.result = null
      })
      .addCase(startGame.fulfilled, (state, action) => {
        state.loading = false
        state.session = action.payload
      })
      .addCase(startGame.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    // Submit guess
    builder
      .addCase(submitGuess.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(submitGuess.fulfilled, (state, action) => {
        state.loading = false
        state.result = action.payload
      })
      .addCase(submitGuess.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    // Fetch history
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = false
        state.history = action.payload.sessions
        state.historyPage = action.payload.page
        state.historyTotalPages = action.payload.totalPages
        state.historyTotal = action.payload.total
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { resetGame, clearGameError } = gameSlice.actions
export default gameSlice.reducer
