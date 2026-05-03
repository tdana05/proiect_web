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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (volunteer) {
      dataService.updateVolunteer(volunteer.id, formData);
    } else {
      dataService.createVolunteer(formData);
    }
    
    onSave();
  };

  return (
    <Modal
      title={volunteer ? 'Editeaza Voluntar' : 'Adauga Voluntar'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
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
          <Button type="button" variant="outline" onClick={onClose}>
            Anuleaza
          </Button>
          <Button type="submit">
            {volunteer ? 'Salveaza' : 'Adauga'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
