using VolunteerManagement.Domain.Entities;
using VolunteerManagement.Domain.Models.Document;
using VolunteerManagement.Domain.Models.Responses;
using VolunteerManagement.DataAccess.Context;

namespace VolunteerManagement.BusinessLayer.Core
{
    public class DocumentActions
    {
        protected DocumentActions() { }

        protected List<DocumentDto> GetAllDocumentsActionExecution()
        {
            var result = new List<DocumentDto>();
            using (var db = new VolunteerManagementContext())
            {
                var documents = db.Documents
                    .Where(d => !d.IsDeleted)
                    .OrderByDescending(d => d.UploadedAt)
                    .ToList();
                foreach (var d in documents)
                {
                    result.Add(MapToDto(d));
                }
            }
            return result;
        }

        protected DocumentDto? GetDocumentByIdActionExecution(int id)
        {
            using (var db = new VolunteerManagementContext())
            {
                var document = db.Documents
                    .FirstOrDefault(d => d.Id == id && !d.IsDeleted);
                return document != null ? MapToDto(document) : null;
            }
        }

        protected ActionResponse CreateDocumentActionExecution(CreateDocumentDto dto)
        {
            using (var db = new VolunteerManagementContext())
            {
                var document = new DocumentData
                {
                    Name = dto.Name,
                    Type = dto.Type,
                    UploadedBy = dto.UploadedBy,
                    UploadedAt = DateTime.Now,
                    Size = dto.Size,
                    Category = dto.Category,
                    Url = dto.Url
                };
                db.Documents.Add(document);
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Document created successfully." };
        }

        protected ActionResponse UpdateDocumentActionExecution(int id, UpdateDocumentDto dto)
        {
            using (var db = new VolunteerManagementContext())
            {
                var document = db.Documents.FirstOrDefault(d => d.Id == id && !d.IsDeleted);
                if (document == null)
                    return new ActionResponse { IsSuccess = false, Message = "Document not found." };

                document.Name = dto.Name;
                document.Type = dto.Type;
                document.Size = dto.Size;
                document.Category = dto.Category;
                document.Url = dto.Url;
                document.UpdatedAt = DateTime.Now;

                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Document updated successfully." };
        }

        protected ActionResponse DeleteDocumentActionExecution(int id)
        {
            using (var db = new VolunteerManagementContext())
            {
                var document = db.Documents.FirstOrDefault(d => d.Id == id);
                if (document == null)
                    return new ActionResponse { IsSuccess = false, Message = "Document not found." };

                document.IsDeleted = true;
                document.UpdatedAt = DateTime.Now;
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Document deleted successfully." };
        }

        private DocumentDto MapToDto(DocumentData document)
        {
            return new DocumentDto
            {
                Id = document.Id,
                Name = document.Name,
                Type = document.Type,
                UploadedBy = document.UploadedBy,
                UploadedAt = document.UploadedAt,
                Size = document.Size,
                Category = document.Category,
                Url = document.Url
            };
        }
    }
}