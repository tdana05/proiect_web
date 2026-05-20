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

        public IUserAction UserAction()
        {
            return new UserExecution();
        }
        
        public IDashboardAction DashboardAction()
        {
            return new DashboardExecution();
        }
        
        
        public IEventAction EventAction()
        {
            return new EventExecution();
        }
        
        public IProjectAction ProjectAction() => new ProjectExecution();
        
        public IDocumentAction DocumentAction() => new DocumentExecution();
        
        public ITaskAction TaskAction() => new TaskExecution();
        
        public IHoursEntryAction HoursEntryAction() => new HoursEntryExecution();
    }
}