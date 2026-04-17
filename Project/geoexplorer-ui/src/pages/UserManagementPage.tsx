import { ScreenTemplate } from '../components/shared/ScreenTemplate'

export function UserManagementPage() {
  return (
    <ScreenTemplate
      screenTitle="User Management Screen"
      panel="Admin Panel"
      owner="Khizar Shahid (i22-2595)"
      blocks={[
        { label: 'Users Table', notes: 'All users listing template.' },
        { label: 'Search Users', notes: 'Search input placeholder.' },
        { label: 'Block/Unblock Action', notes: 'Moderation action slots.' },
        { label: 'Delete User Action', notes: 'Danger action placeholder.' },
      ]}
    />
  )
}
