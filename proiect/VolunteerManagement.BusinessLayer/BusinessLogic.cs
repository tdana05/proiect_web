using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.BusinessLayer.Structure;

namespace VolunteerManagement.BusinessLayer
{
    public class BusinessLogic
    {
        public IAnnouncementAction AnnouncementAction()
        {
            return new AnnouncementExecution();
        }

        // Aici se va adăuga și celelalte acțiuni pentru:
        // UserAction, EventAction, TaskAction, ProjectAction, HoursAction, DocumentAction
    }
}