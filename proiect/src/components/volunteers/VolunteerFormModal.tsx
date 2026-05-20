import { useState } from 'react';
import type { User } from '../../types';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { dataService } from '../../services/dataService';

interface VolunteerFormModalProps {
  volunteer: User | null;
  onClose: () => void;
  onSave: () => void;
}

export function VolunteerFormModal({ volunteer, onClose, onSave }: VolunteerFormModalProps) {
  const [formData, setFormData] = useState({
    name: volunteer?.name || '',
    email: volunteer?.email || '',
    phone: volunteer?.phone || '',
    status: volunteer?.status || 'pending',
    role: volunteer?.role || 'volunteer',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (volunteer) {
        await dataService.updateVolunteer(volunteer.id, formData);
      } else {
        // Pasul 1: Creează utilizatorul
        const newUser = await dataService.createVolunteer({
          email: formData.email,
          password: 'temp123',
          name: formData.name,
        });

        // Pasul 2: Actualizează telefonul (dacă există)
        if (formData.phone && newUser.id) {
          await dataService.updateVolunteer(newUser.id, {
            phone: formData.phone
          });
        }
      }
      onSave();
    } catch (err) {
      console.error('Failed to save volunteer:', err);
      setError('A aparut o eroare. Va rugam incercati din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <Modal
          title={volunteer ? 'Editeaza Voluntar' : 'Adauga Voluntar'}
          onClose={onClose}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                {error}
              </div>
          )}

          <Input
              label="Nume complet"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
          />
          <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
          />
          <Input
              label="Telefon"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
            <Select
                label="Status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pending' | 'active' | 'inactive' })}
                options={[
                  { value: 'pending', label: 'In asteptare' },
                  { value: 'active', label: 'Activ' },
                  { value: 'inactive', label: 'Inactiv' },
                ]}
            />
          <Select
              label="Rol"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'volunteer' })}
              options={[
                { value: 'volunteer', label: 'Voluntar' },
                { value: 'admin', label: 'Administrator' },
              ]}
          />
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Anuleaza
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Se salveaza...' : (volunteer ? 'Salveaza' : 'Adauga')}
            </Button>
          </div>
        </form>
      </Modal>
  );
}