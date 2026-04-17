import { ScreenTemplate } from '../components/shared/ScreenTemplate'

export function AnalyticsReportsPage() {
  return (
    <ScreenTemplate
      screenTitle="Analytics & Reports Screen"
      panel="Admin Panel"
      owner="Khizar Shahid (i22-2595)"
      blocks={[
        { label: 'Most Guessed Countries', notes: 'Top countries chart/list placeholder.' },
        { label: 'User Activity Report', notes: 'User engagement summary area.' },
        { label: 'Game Performance Stats', notes: 'Performance chart placeholders.' },
        { label: 'System Usage Insights', notes: 'Aggregated analytics cards.' },
      ]}
    />
  )
}
