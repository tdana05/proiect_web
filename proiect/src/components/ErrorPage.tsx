import { useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { Button } from './ui/Button'

interface Props {
  code: string
  title: string
  description: string
  showLoginButton?: boolean
  showDashboardButton?: boolean
  showHomeButton?: boolean
}

export function ErrorPage({
  code, title, description,
  showLoginButton, showDashboardButton, showHomeButton
}: Props) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Heart className="h-8 w-8 text-primary" />
          </div>
        </div>
        <p className="text-8xl font-bold text-primary/20 font-mono mb-4">{code}</p>
        <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>
        <p className="text-muted-foreground mb-8">{description}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showLoginButton && (
            <Button onClick={() => navigate('/')}>Autentificare</Button>
          )}
          {showDashboardButton && (
            <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
          )}
          {showHomeButton && (
            <Button variant="outline" onClick={() => navigate('/')}>
              Pagina principala
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
