import { ErrorPage } from '../../components/ErrorPage'

export default function Error500Page() {
  return (
    <ErrorPage
      code="500"
      title="Eroare de Server"
      description="A aparut o eroare neasteptata. Te rugam sa incerci din nou mai tarziu."
      showDashboardButton
      showHomeButton
    />
  )
}
