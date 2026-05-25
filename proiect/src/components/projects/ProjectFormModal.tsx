import { useState } from 'react';
import type { Project } from '../../types';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { dataService } from '../../services/dataService';

interface ProjectFormModalProps {
  project: Project | null;
  onClose: () => void;
  onSave: () => void;
}

export function ProjectFormModal({ project, onClose, onSave }: ProjectFormModalProps) {
  const [formData, setFormData] = useState({
    name: project?.name || '',
    description: project?.description || '',
    startDate: project?.startDate || '',
    endDate: project?.endDate || '',
    status: project?.status || 'planning',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("SUBMIT MERGE");

    try {
      if (project) {
        await dataService.updateProject(project.id, formData);
      } else {
        await dataService.createProject({
          ...formData,
          volunteerIds: [],
          memberIds: [],
          leadId: 1,
          progress: 0,
        });
      }

      onSave();
    } catch (error) {
      console.log("EROARE:", error);
    }
  };
  
  

  return (
    <Modal
      title={project ? 'Editeaza Proiect' : 'Proiect Nou'}
      onClose={onClose}
    >
      <form
          onSubmit={(e) => {
            console.log("FORM SUBMIT");
            handleSubmit(e);
          }}
          className="space-y-4"
      >
        <Input
          label="Nume proiect"
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
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Data inceput"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
          <Input
            label="Data sfarsit"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            required
          />
        </div>
        <Select
          label="Status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          options={[
            { value: 'planning', label: 'Planificare' },
            { value: 'active', label: 'Activ' },
            { value: 'on_hold', label: 'In asteptare' },
            { value: 'completed', label: 'Finalizat' },
          ]}
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Anuleaza
          </Button>
          <button
              type="submit"
              className="bg-cyan-500 text-white px-4 py-2 rounded-lg"
          >
            {project ? 'Salveaza' : 'Creeaza'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
