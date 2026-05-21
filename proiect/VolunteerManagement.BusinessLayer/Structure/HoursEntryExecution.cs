using VolunteerManagement.BusinessLayer.Core;
using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.Domain.Models.HoursEntry;
using VolunteerManagement.Domain.Models.Responses;

namespace VolunteerManagement.BusinessLayer.Structure
{
    public class HoursEntryExecution : HoursEntryActions, IHoursEntryAction
    {
        public List<HoursEntryDto> GetAllHoursEntries() => GetAllHoursEntriesActionExecution();
        public List<HoursEntryDto> GetHoursByVolunteer(int volunteerId) => GetHoursByVolunteerActionExecution(volunteerId);
        public HoursEntryDto? GetHoursEntryById(int id) => GetHoursEntryByIdActionExecution(id);
        public ActionResponse CreateHoursEntry(CreateHoursEntryDto dto) => CreateHoursEntryActionExecution(dto);
        public ActionResponse UpdateHoursStatus(int id, UpdateHoursStatusDto dto) => UpdateHoursStatusActionExecution(id, dto);
        public ActionResponse DeleteHoursEntry(int id) => DeleteHoursEntryActionExecution(id);
    }
}