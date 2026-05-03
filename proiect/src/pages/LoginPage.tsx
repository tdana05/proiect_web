import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LoginForm } from '../components/auth/LoginForm'
import { LoginInfo } from '../components/auth/LoginInfo'

export default function LoginPage() {
  const [error, setError] = useState('')
  const { login, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/dashboard')
  }, [user, navigate])

  const handleLogin = (email: string, password: string) => {
    setError('')
    const result = login(email, password)
    if (result) {
      navigate('/dashboard')
    } else {
      setError('Email sau parola incorecta')
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <LoginForm onSubmit={handleLogin} error={error} />
      </div>
      <LoginInfo />
    </div>
  )
}
