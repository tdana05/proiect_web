import { useState, useEffect } from 'react'
import type { User } from '../../types'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Button } from '../ui/Button'
import { formatDate } from '../../lib/utils'

interface Props {
  user: User
  isEditing: boolean
  onSave: (data: { name: string; phone: string; bio: string }) => void
  onCancel: () => void
}

export function ProfileForm({ user, isEditing, onSave, onCancel }: Props) {
  const [name, setName] = useState(user.name)
  const [phone, setPhone] = useState(user.phone || '')
  const [bio, setBio] = useState(user.bio || '')

  useEffect(() => {
    setName(user.name)
    setPhone(user.phone || '')
    setBio(user.bio || '')
  }, [user, isEditing])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ name, phone, bio })
  }

  if (!isEditing) {
    return (
      <div className="space-y-4">
        <InfoRow label="Telefon" value={user.phone || 'Nespecificat'} />
        <InfoRow label="Departament" value={user.department || 'Nespecificat'} />
        <InfoRow label="Data inscrierii" value={formatDate(user.joinDate)} />
        <InfoRow label="Despre mine" value={user.bio || 'Nicio descriere'} />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input id="name" label="Nume complet" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input id="phone" label="Telefon" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Textarea id="bio" label="Despre mine" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
      <div className="flex gap-3">
        <Button type="submit">Salveaza</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Anuleaza</Button>
      </div>
    </form>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}
