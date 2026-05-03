import { ErrorPage } from '../../components/ErrorPage'

export default function Error401Page() {
  return (
    <ErrorPage
      code="401"
      title="Neautorizat"
      description="Trebuie sa te autentifici pentru a accesa aceasta pagina."
      showLoginButton
    />
  )
}
