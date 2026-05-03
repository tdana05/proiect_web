import { ErrorPage } from '../../components/ErrorPage'

export default function Error404Page() {
  return (
    <ErrorPage
      code="404"
      title="Pagina Negasita"
      description="Pagina pe care o cauti nu exista sau a fost mutata."
      showDashboardButton
      showHomeButton
    />
  )
}
