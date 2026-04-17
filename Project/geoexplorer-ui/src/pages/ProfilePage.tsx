import { ScreenTemplate } from '../components/shared/ScreenTemplate'

export function ProfilePage() {
  return (
    <ScreenTemplate
      screenTitle="User Profile Page"
      panel="User Panel"
      owner="Haroon Aziz (i22-2697)"
      blocks={[
        { label: 'Profile Header', notes: 'Name, avatar, and account overview.' },
        { label: 'Score & Stats Panel', notes: 'Total score and games played cards.' },
        { label: 'Editable Profile Fields', notes: 'Profile update form placeholders.' },
        { label: 'Settings Block', notes: 'Account preferences and controls.' },
      ]}
    />
  )
}
