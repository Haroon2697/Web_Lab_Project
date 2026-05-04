/**
 * Leaderboard feature — Redux slice (Haroon).
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getLeaderboardAPI, getMyRankAPI } from './leaderboardService'

export const fetchLeaderboard = createAsyncThunk(
  'leaderboard/fetchAll',
  async (limit, { rejectWithValue }) => {
    try {
      return await getLeaderboardAPI(limit)
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch leaderboard')
    }
  },
)

export const fetchMyRank = createAsyncThunk(
  'leaderboard/fetchMyRank',
  async (_, { rejectWithValue }) => {
    try {
      return await getMyRankAPI()
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch rank')
    }
  },
)

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    players: [],
    myRank: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearLeaderboardError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false
        state.players = action.payload.leaderboard
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    builder
      .addCase(fetchMyRank.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMyRank.fulfilled, (state, action) => {
        state.loading = false
        state.myRank = action.payload
      })
      .addCase(fetchMyRank.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearLeaderboardError } = leaderboardSlice.actions
export default leaderboardSlice.reducer
