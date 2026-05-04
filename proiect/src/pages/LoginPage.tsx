import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoginForm } from '../components/auth/LoginForm';
import { LoginInfo } from '../components/auth/LoginInfo';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (email: string, password: string) => {
    setError('');
    setIsLoading(true);

    const success = await login(email, password);

    setIsLoading(false);

    if (success) {
      navigate('/dashboard');
    } else {
      setError('Email sau parola incorectă');
    }
  };

  if (isLoading) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">Se încarcă...</div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-background flex">
        <div className="flex-1 flex items-center justify-center p-8">
          <LoginForm onSubmit={handleLogin} error={error} />
        </div>
        <LoginInfo />
      </div>
  );
}