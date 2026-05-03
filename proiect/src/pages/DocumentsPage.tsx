import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { DocumentCard } from '../components/documents/DocumentCard';
import { DocumentFormModal } from '../components/documents/DocumentFormModal';
import { dataService } from '../services/dataService';
import type { Document } from '../types';
import { Plus, Search, FileText } from 'lucide-react';

export default function DocumentsPage() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = () => {
    const data = dataService.getDocuments();
    setDocuments(data);
  };

  const filteredDocs = documents.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || d.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (doc: Document) => {
    if (!isAdmin) return;
    setEditingDoc(doc);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (!isAdmin) return;
    if (window.confirm('Sigur doriti sa stergeti acest document?')) {
      dataService.deleteDocument(id);
      loadDocuments();
    }
  };

  const handleSave = () => {
    loadDocuments();
    setShowModal(false);
    setEditingDoc(null);
  };

  const categories = [
    { value: 'all', label: 'Toate' },
    { value: 'regulament', label: 'Regulamente' },
    { value: 'template', label: 'Template-uri' },
    { value: 'raport', label: 'Rapoarte' },
    { value: 'altele', label: 'Altele' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Documente</h1>
          <p className="text-muted-foreground">Resurse si documente organizatie</p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Adauga Document
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cauta documente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Button
                  key={cat.value}
                  variant={filterCategory === cat.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterCategory(cat.value)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDocs.map(doc => (
              <DocumentCard
                key={doc.id}
                document={doc}
                isAdmin={isAdmin}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
          {filteredDocs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Nu exista documente.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {showModal && isAdmin && (
        <DocumentFormModal
          document={editingDoc}
          onClose={() => {
            setShowModal(false);
            setEditingDoc(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
