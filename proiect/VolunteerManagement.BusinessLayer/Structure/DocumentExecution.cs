using VolunteerManagement.BusinessLayer.Core;
using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.Domain.Models.Document;
using VolunteerManagement.Domain.Models.Responses;

namespace VolunteerManagement.BusinessLayer.Structure
{
    public class DocumentExecution : DocumentActions, IDocumentAction
    {
        public List<DocumentDto> GetAllDocuments() => GetAllDocumentsActionExecution();
        public DocumentDto? GetDocumentById(int id) => GetDocumentByIdActionExecution(id);
        public ActionResponse CreateDocument(CreateDocumentDto dto) => CreateDocumentActionExecution(dto);
        public ActionResponse UpdateDocument(int id, UpdateDocumentDto dto) => UpdateDocumentActionExecution(id, dto);
        public ActionResponse DeleteDocument(int id) => DeleteDocumentActionExecution(id);
    }
}