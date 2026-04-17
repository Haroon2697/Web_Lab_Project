import { ScreenTemplate } from '../components/shared/ScreenTemplate'

export function GuessSubmissionPage() {
  return (
    <ScreenTemplate
      screenTitle="Guess Submission Screen"
      panel="User Panel"
      owner="Haroon Aziz (i22-2697)"
      blocks={[
        { label: 'Selected Answer Preview', notes: 'Shows selected country placeholder.' },
        { label: 'Submit Guess Button', notes: 'Primary submit action template.' },
        { label: 'Change Guess Option', notes: 'Secondary action placeholder.' },
        { label: 'Submission Status', notes: 'Loading/disabled state block.' },
      ]}
    />
  )
}
