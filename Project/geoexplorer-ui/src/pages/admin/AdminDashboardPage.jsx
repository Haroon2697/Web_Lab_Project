import { ScreenTemplate } from '../../components/shared/ScreenTemplate'

export function AdminDashboardPage() {
  return (
    <ScreenTemplate
      screenTitle="Admin Dashboard Screen"
      panel="Admin Panel"
      owner="Khizar Shahid (i22-2595)"
      blocks={[
        { label: 'Total Users Card', notes: 'KPI widget placeholder.' },
        { label: 'Games Played Card', notes: 'KPI widget placeholder.' },
        { label: 'Analytics Preview', notes: 'Chart area placeholder.' },
        { label: 'Quick Actions', notes: 'Navigation/action buttons.' },
      ]}
    />
  )
}
