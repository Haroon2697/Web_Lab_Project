import { ScreenTemplate } from '../components/shared/ScreenTemplate'

export function LoginPage() {
  return (
    <ScreenTemplate
      screenTitle="User Login Screen"
      panel="User Panel"
      owner="Haroon Aziz (i22-2697)"
      blocks={[
        { label: 'Login Form', notes: 'Email and password fields placeholder.' },
        { label: 'Validation Messages', notes: 'Error message region.' },
        { label: 'Submit Action', notes: 'Login button slot.' },
        { label: 'Navigate to Signup', notes: 'Text link placeholder.' },
      ]}
    />
  )
}
