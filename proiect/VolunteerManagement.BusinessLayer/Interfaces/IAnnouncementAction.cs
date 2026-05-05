using VolunteerManagement.Domain.Models;
using VolunteerManagement.Domain.Models.Responses;

namespace VolunteerManagement.BusinessLayer.Interfaces
{
    public interface IAnnouncementAction
    {
        List<AnnouncementDto> GetAllAnnouncementsAction();
        AnnouncementDto? GetAnnouncementByIdAction(int id);
        ActionResponse CreateAnnouncementAction(AnnouncementDto data);
        ActionResponse UpdateAnnouncementAction(AnnouncementDto data);
        ActionResponse DeleteAnnouncementAction(int id);
    }
}