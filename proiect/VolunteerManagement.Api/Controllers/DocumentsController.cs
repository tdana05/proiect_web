using Microsoft.AspNetCore.Mvc;
using VolunteerManagement.BusinessLayer;
using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.Domain.Models.Document;

namespace VolunteerManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        private readonly IDocumentAction _documentAction;

        public DocumentsController()
        {
            var bl = new BusinessLogic();
            _documentAction = bl.DocumentAction();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var documents = _documentAction.GetAllDocuments();
            return Ok(documents);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var doc = _documentAction.GetDocumentById(id);
            if (doc == null)
                return NotFound(new { message = "Document not found." });
            return Ok(doc);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateDocumentDto dto)
        {
            var result = _documentAction.CreateDocument(dto);
            if (!result.IsSuccess)
                return BadRequest(result);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateDocumentDto dto)
        {
            if (id != dto.Id)
                return BadRequest(new { message = "ID mismatch." });
            var result = _documentAction.UpdateDocument(id, dto);
            if (!result.IsSuccess)
                return NotFound(result);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _documentAction.DeleteDocument(id);
            if (!result.IsSuccess)
                return NotFound(result);
            return Ok(result);
        }
    }
}