using VolunteerManagement.BusinessLayer.Core;
using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.Domain.Models;
using VolunteerManagement.Domain.Models.Responces;

namespace VolunteerManagement.BusinessLayer.Structure
{
    public class AnnouncementExecution : AnnouncementActions, IAnnouncementAction
    {
        public List<AnnouncementDto> GetAllAnnouncementsAction()
        {
            return GetAllAnnouncementsActionExecution();
        }

        public AnnouncementDto? GetAnnouncementByIdAction(int id)
        {
            return GetAnnouncementByIdActionExecution(id);
        }

        public ActionResponse CreateAnnouncementAction(AnnouncementDto data)
        {
            return CreateAnnouncementActionExecution(data);
        }

        public ActionResponse UpdateAnnouncementAction(AnnouncementDto data)
        {
            return UpdateAnnouncementActionExecution(data);
        }

        public ActionResponse DeleteAnnouncementAction(int id)
        {
            return DeleteAnnouncementActionExecution(id);
        }
    }
}