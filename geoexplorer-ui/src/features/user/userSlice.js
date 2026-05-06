/**
 * User profile feature — Redux slice (profile/stats).
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProfileAPI, updateProfileAPI } from './userService'
import { setUser } from '../auth/authSlice'

export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const data = await getProfileAPI()
      const existing = getState()?.auth?.user || {}
      // Keep token (and any auth-only fields) but refresh server-truth profile fields.
      dispatch(setUser({ ...existing, ...data }))
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch profile')
    }
  },
)

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (updates, { rejectWithValue }) => {
    try {
      return await updateProfileAPI(updates)
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update profile')
    }
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUserError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    builder
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload
      })
  },
})

export const { clearUserError } = userSlice.actions
export default userSlice.reducer
