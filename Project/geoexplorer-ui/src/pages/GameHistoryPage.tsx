import { ScreenTemplate } from '../components/shared/ScreenTemplate'

export function GameHistoryPage() {
  return (
    <ScreenTemplate
      screenTitle="Game History Screen"
      panel="User Panel"
      owner="Haroon Aziz (i22-2697)"
      blocks={[
        { label: 'History List', notes: 'Past games list/table placeholder.' },
        { label: 'Date Filter', notes: 'Filter by date range control block.' },
        { label: 'Score & Difficulty Filters', notes: 'Filter controls area.' },
        { label: 'Guess Comparison Row', notes: 'User guess vs correct answer template.' },
      ]}
    />
  )
}
