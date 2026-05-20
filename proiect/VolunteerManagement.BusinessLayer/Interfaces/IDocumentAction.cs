using VolunteerManagement.Domain.Models.Document;
using VolunteerManagement.Domain.Models.Responses;

namespace VolunteerManagement.BusinessLayer.Interfaces
{
    public interface IDocumentAction
    {
        List<DocumentDto> GetAllDocuments();
        DocumentDto? GetDocumentById(int id);
        ActionResponse CreateDocument(CreateDocumentDto dto);
        ActionResponse UpdateDocument(int id, UpdateDocumentDto dto);
        ActionResponse DeleteDocument(int id);
    }
}