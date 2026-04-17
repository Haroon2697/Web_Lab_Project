import { ScreenTemplate } from '../components/shared/ScreenTemplate'

export function ResultPage() {
  return (
    <ScreenTemplate
      screenTitle="Result Screen"
      panel="User Panel"
      owner="Haroon Aziz (i22-2697)"
      blocks={[
        { label: 'Correct Answer Panel', notes: 'Result summary placeholder.' },
        { label: 'Score Calculation Box', notes: 'Points earned display template.' },
        { label: 'Location Detail Section', notes: 'Country/location info region.' },
        { label: 'Next Action Buttons', notes: 'Play again / leaderboard / profile.' },
      ]}
    />
  )
}
