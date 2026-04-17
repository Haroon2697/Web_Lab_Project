import { ScreenTemplate } from '../components/shared/ScreenTemplate'

export function LeaderboardPage() {
  return (
    <ScreenTemplate
      screenTitle="Leaderboard Page"
      panel="User Panel"
      owner="Haroon Aziz (i22-2697)"
      blocks={[
        { label: 'Top Players Ranking', notes: 'Leaderboard list/table skeleton.' },
        { label: 'Search Bar', notes: 'Search players by name placeholder.' },
        { label: 'Filter Controls', notes: 'Filter slots (region/date/score).' },
        { label: 'User Rank Highlight', notes: 'Current user rank summary card.' },
      ]}
    />
  )
}
