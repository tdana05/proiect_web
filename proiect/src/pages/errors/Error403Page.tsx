import { ErrorPage } from '../../components/ErrorPage'

export default function Error403Page() {
  return (
    <ErrorPage
      code="403"
      title="Acces Interzis"
      description="Nu ai permisiunea de a accesa aceasta pagina. Aceasta zona este rezervata administratorilor."
      showDashboardButton
      showHomeButton
    />
  )
}
