using VolunteerManagement.BusinessLayer.Core;
using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.Domain.Models.Hours;
using VolunteerManagement.Domain.Models.Responses;

namespace VolunteerManagement.BusinessLayer.Structure
{
    public class HoursEntryExecution : HoursEntryActions, IHoursEntryAction
    {
        public List<HoursEntryDto> GetAllHoursEntries()
        {
            return GetAllHoursEntriesActionExecution();
        }

        public List<HoursEntryDto> GetHoursEntriesByVolunteer(int volunteerId)
        {
            return GetHoursEntriesByVolunteerActionExecution(volunteerId);
        }

        public HoursEntryDto? GetHoursEntryById(int id)
        {
            return GetHoursEntryByIdActionExecution(id);
        }

        public ActionResponse CreateHoursEntry(CreateHoursEntryDto data)
        {
            return CreateHoursEntryActionExecution(data);
        }

        public ActionResponse UpdateHoursEntryStatus(int id, UpdateHoursEntryDto data)
        {
            return UpdateHoursEntryStatusActionExecution(id, data);
        }

        public ActionResponse DeleteHoursEntry(int id)
        {
            return DeleteHoursEntryActionExecution(id);
        }
    }
}