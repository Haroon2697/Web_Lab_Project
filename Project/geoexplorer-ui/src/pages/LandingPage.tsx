import { ScreenTemplate } from '../components/shared/ScreenTemplate'

export function LandingPage() {
  return (
    <ScreenTemplate
      screenTitle="Landing Page"
      panel="User Panel"
      owner="Haroon Aziz (i22-2697)"
      blocks={[
        { label: 'Hero Banner', notes: 'Game introduction headline and background area.' },
        { label: 'Start Game CTA', notes: 'Primary call-to-action button placeholder.' },
        { label: 'Instructions Section', notes: 'Short gameplay instruction cards.' },
        { label: 'Footer Links', notes: 'Policy/help/social placeholders.' },
      ]}
    />
  )
}
