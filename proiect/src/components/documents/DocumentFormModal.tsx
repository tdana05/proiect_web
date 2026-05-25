import { useState } from 'react';
import type { Document } from '../../types';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { dataService } from '../../services/dataService';

interface DocumentFormModalProps {
  document: Document | null;
  onClose: () => void;
  onSave: () => void;
}

export function DocumentFormModal({ document, onClose, onSave }: DocumentFormModalProps) {
  const [formData, setFormData] = useState({
    name: document?.name || '',
    description: document?.description || '',
    category: document?.category || 'altele',
    url: document?.url || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (document) {
      await dataService.updateDocument(document.id, formData);
    } else {
      await dataService.createDocument({
        ...formData,
        type: 'application/pdf',
        uploadedBy: 1,
        size: '1 MB',
      });
    }

    onSave();
  };

  return (
    <Modal
      title={document ? 'Editeaza Document' : 'Adauga Document'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nume document"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Textarea
          label="Descriere"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
        <Select
          label="Categorie"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          options={[
            { value: 'regulament', label: 'Regulament' },
            { value: 'template', label: 'Template' },
            { value: 'raport', label: 'Raport' },
            { value: 'altele', label: 'Altele' },
          ]}
        />
        <Input
          label="URL Document"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          placeholder="https://..."
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Anuleaza
          </Button>
          <Button type="submit">
            {document ? 'Salveaza' : 'Adauga'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
