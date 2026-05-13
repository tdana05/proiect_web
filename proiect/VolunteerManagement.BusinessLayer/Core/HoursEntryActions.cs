using VolunteerManagement.DataAccess.Context;
using VolunteerManagement.Domain.Entities;
using VolunteerManagement.Domain.Models.Hours;
using VolunteerManagement.Domain.Models.Responses;

namespace VolunteerManagement.BusinessLayer.Core
{
    public class HoursEntryActions
    {
        protected HoursEntryActions() { }

        protected List<HoursEntryDto> GetAllHoursEntriesActionExecution()
        {
            var result = new List<HoursEntryDto>();
            using (var db = new VolunteerManagementContext())
            {
                var entries = db.HoursEntries
                    .Where(x => !x.IsDeleted)
                    .ToList();

                foreach (var entry in entries)
                {
                    var volunteer = db.Users.FirstOrDefault(u => u.Id == entry.VolunteerId && !u.IsDeleted);
                    result.Add(MapToDto(entry, volunteer));
                }
            }
            return result;
        }

        protected List<HoursEntryDto> GetHoursEntriesByVolunteerActionExecution(int volunteerId)
        {
            var result = new List<HoursEntryDto>();
            using (var db = new VolunteerManagementContext())
            {
                var entries = db.HoursEntries
                    .Where(x => x.VolunteerId == volunteerId && !x.IsDeleted)
                    .ToList();

                var volunteer = db.Users.FirstOrDefault(u => u.Id == volunteerId && !u.IsDeleted);

                foreach (var entry in entries)
                {
                    result.Add(MapToDto(entry, volunteer));
                }
            }
            return result;
        }

        protected HoursEntryDto? GetHoursEntryByIdActionExecution(int id)
        {
            using (var db = new VolunteerManagementContext())
            {
                var entry = db.HoursEntries.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
                if (entry == null) return null;

                var volunteer = db.Users.FirstOrDefault(u => u.Id == entry.VolunteerId && !u.IsDeleted);
                return MapToDto(entry, volunteer);
            }
        }

        protected ActionResponse CreateHoursEntryActionExecution(CreateHoursEntryDto data)
        {
            using (var db = new VolunteerManagementContext())
            {
                var volunteer = db.Users.FirstOrDefault(x => x.Id == data.VolunteerId && !x.IsDeleted);
                if (volunteer == null)
                {
                    return new ActionResponse { IsSuccess = false, Message = "Volunteer not found." };
                }

                var entry = new HoursEntryData
                {
                    VolunteerId = data.VolunteerId,
                    Date = data.Date,
                    Hours = data.Hours,
                    Description = data.Description,
                    RelatedTaskId = data.RelatedTaskId,
                    RelatedEventId = data.RelatedEventId,
                    Status = "pending",
                    CreatedAt = DateTime.Now
                };

                db.HoursEntries.Add(entry);
                db.SaveChanges();

                return new ActionResponse { IsSuccess = true, Message = "Hours entry created successfully." };
            }
        }

        protected ActionResponse UpdateHoursEntryStatusActionExecution(int id, UpdateHoursEntryDto data)
        {
            using (var db = new VolunteerManagementContext())
            {
                var entry = db.HoursEntries.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
                if (entry == null)
                {
                    return new ActionResponse { IsSuccess = false, Message = "Hours entry not found." };
                }

                entry.Status = data.Status;
                entry.AdminNote = data.AdminNote;
                entry.UpdatedAt = DateTime.Now;

                // If approved, update volunteer's total hours
                if (data.Status == "approved")
                {
                    var volunteer = db.Users.FirstOrDefault(x => x.Id == entry.VolunteerId);
                    if (volunteer != null)
                    {
                        volunteer.TotalHours += (int)entry.Hours;
                        volunteer.UpdatedAt = DateTime.Now;
                    }
                }

                db.SaveChanges();

                return new ActionResponse { IsSuccess = true, Message = $"Hours entry {data.Status} successfully." };
            }
        }

        protected ActionResponse DeleteHoursEntryActionExecution(int id)
        {
            using (var db = new VolunteerManagementContext())
            {
                var entry = db.HoursEntries.FirstOrDefault(x => x.Id == id);
                if (entry == null)
                {
                    return new ActionResponse { IsSuccess = false, Message = "Hours entry not found." };
                }

                entry.IsDeleted = true;
                entry.UpdatedAt = DateTime.Now;
                db.SaveChanges();

                return new ActionResponse { IsSuccess = true, Message = "Hours entry deleted successfully." };
            }
        }

        private HoursEntryDto MapToDto(HoursEntryData entry, UserData? volunteer)
        {
            return new HoursEntryDto
            {
                Id = entry.Id,
                VolunteerId = entry.VolunteerId,
                VolunteerName = volunteer?.Name ?? "Unknown",
                Date = entry.Date.ToString("o"),
                Hours = entry.Hours,
                Description = entry.Description,
                RelatedTaskId = entry.RelatedTaskId,
                RelatedEventId = entry.RelatedEventId,
                Status = entry.Status,
                AdminNote = entry.AdminNote
            };
        }
    }
}