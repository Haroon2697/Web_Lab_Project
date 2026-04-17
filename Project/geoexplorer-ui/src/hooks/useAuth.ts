/** Auth state hook — wire to Redux auth slice when ready. */
export function useAuth() {
  return { user: null as null | { token: string }, isLoading: false }
}
