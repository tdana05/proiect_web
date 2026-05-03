import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { ProfileHeader } from '../components/profile/ProfileHeader'
import { ProfileForm } from '../components/profile/ProfileForm'
import { ProfileStats } from '../components/profile/ProfileStats'
import { Card } from '../components/ui/Card'

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  if (!user) return null

  const handleSave = (data: { name: string; phone: string; bio: string }) => {
    updateUser(data)
    setIsEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Profilul Meu</h1>

      {saved && (
        <div className="p-3 rounded-lg bg-green-100 text-green-700 text-sm">
          Profilul a fost actualizat cu succes!
        </div>
      )}

      <Card>
        <ProfileHeader user={user} isEditing={isEditing} onEdit={() => setIsEditing(true)} />
        <ProfileForm
          user={user}
          isEditing={isEditing}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      </Card>

      <ProfileStats user={user} />
    </div>
  )
}
