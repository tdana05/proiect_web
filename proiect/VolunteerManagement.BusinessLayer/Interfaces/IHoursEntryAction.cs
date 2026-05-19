using VolunteerManagement.Domain.Models.Hours;
using VolunteerManagement.Domain.Models.Responses;

namespace VolunteerManagement.BusinessLayer.Interfaces
{
    public interface IHoursEntryAction
    {
        List<HoursEntryDto> GetAllHoursEntries();
        List<HoursEntryDto> GetHoursEntriesByVolunteer(int volunteerId);
        HoursEntryDto? GetHoursEntryById(int id);
        ActionResponse CreateHoursEntry(CreateHoursEntryDto data);
        ActionResponse UpdateHoursEntryStatus(int id, UpdateHoursEntryDto data);
        ActionResponse DeleteHoursEntry(int id);
    }
}