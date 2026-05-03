import { Heart } from 'lucide-react'

export function LoginInfo() {
  return (
    <div className="hidden lg:flex flex-1 bg-primary p-12 items-center justify-center">
      <div className="max-w-md text-primary-foreground">
        <Heart className="h-16 w-16 mb-8 opacity-80" />
        <h2 className="text-3xl font-bold mb-4">
          Platforma de Gestionare a Voluntarilor
        </h2>
        <p className="text-lg opacity-90 mb-8">
          Gestioneaza eficient echipa de voluntari, evenimentele si proiectele organizatiei AMiCUS.
        </p>
        <div className="space-y-4 text-sm opacity-80">
          <div className="p-4 bg-white/10 rounded-lg">
            <p className="font-medium mb-1">Cont Admin:</p>
            <p>admin@amicus.md / admin123</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <p className="font-medium mb-1">Cont Voluntar:</p>
            <p>maria@amicus.md / user123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
