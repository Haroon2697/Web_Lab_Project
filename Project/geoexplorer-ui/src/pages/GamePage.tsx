import { ScreenTemplate } from '../components/shared/ScreenTemplate'

export function GamePage() {
  return (
    <ScreenTemplate
      screenTitle="Game Screen"
      panel="User Panel"
      owner="Haroon Aziz (i22-2697)"
      blocks={[
        { label: 'Location Image Container', notes: 'Unsplash image viewport placeholder.' },
        { label: 'Timer Countdown', notes: 'Round timer and urgency indicators.' },
        { label: 'Country Dropdown', notes: 'Country selection input block.' },
        { label: 'Submission Controls', notes: 'Submit and hint interaction placeholders.' },
      ]}
    />
  )
}
