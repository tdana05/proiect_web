import type { Document } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Edit, Trash2, Download, FileText, FileSpreadsheet, FileImage } from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface DocumentCardProps {
  document: Document;
  isAdmin: boolean;
  onEdit: (document: Document) => void;
  onDelete: (id: string) => void;
}

export function DocumentCard({ document, isAdmin, onEdit, onDelete }: DocumentCardProps) {
  const getFileIcon = (type: string) => {
    if (type.includes('spreadsheet') || type.includes('excel')) {
      return <FileSpreadsheet className="h-8 w-8" />;
    }
    if (type.includes('image')) {
      return <FileImage className="h-8 w-8" />;
    }
    return <FileText className="h-8 w-8" />;
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'regulament': return 'Regulament';
      case 'template': return 'Template';
      case 'raport': return 'Raport';
      case 'altele': return 'Altele';
      default: return category;
    }
  };

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <div className="text-primary">
          {getFileIcon(document.type)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{document.name}</h3>
          <Badge variant="secondary" className="mt-1">
            {getCategoryLabel(document.category)}
          </Badge>
        </div>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {document.description}
      </p>

      <div className="text-xs text-muted-foreground mb-4">
        Adaugat: {formatDate(document.uploadedAt)}
      </div>

      <div className="flex gap-2">
        <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(document.url, '_blank')}
        >
          <Download className="mr-1 h-3 w-3" />
          Descarca
        </Button>
        {isAdmin && (
          <>
            <Button variant="outline" size="sm" onClick={() => onEdit(document)}>
              <Edit className="h-3 w-3" />
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(document.id)}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
