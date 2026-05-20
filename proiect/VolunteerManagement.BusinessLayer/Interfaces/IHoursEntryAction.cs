using VolunteerManagement.Domain.Models.HoursEntry;
using VolunteerManagement.Domain.Models.Responses;

namespace VolunteerManagement.BusinessLayer.Interfaces
{
    public interface IHoursEntryAction
    {
        List<HoursEntryDto> GetAllHoursEntries();
        List<HoursEntryDto> GetHoursByVolunteer(int volunteerId);
        HoursEntryDto? GetHoursEntryById(int id);
        ActionResponse CreateHoursEntry(CreateHoursEntryDto dto);
        ActionResponse UpdateHoursStatus(int id, UpdateHoursStatusDto dto);
        ActionResponse DeleteHoursEntry(int id);
    }
}