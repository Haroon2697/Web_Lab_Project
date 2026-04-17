import { ScreenTemplate } from '../components/shared/ScreenTemplate'

export function SignupPage() {
  return (
    <ScreenTemplate
      screenTitle="User Signup Screen"
      panel="User Panel"
      owner="Haroon Aziz (i22-2697)"
      blocks={[
        { label: 'Signup Form', notes: 'Name, email, password fields placeholder.' },
        { label: 'Form Validation', notes: 'Inline validation area.' },
        { label: 'Submit Action', notes: 'Create account button slot.' },
        { label: 'Navigate to Login', notes: 'Text link placeholder.' },
      ]}
    />
  )
}
