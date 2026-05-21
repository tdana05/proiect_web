using VolunteerManagement.Domain.Entities;
using VolunteerManagement.Domain.Models.HoursEntry;
using VolunteerManagement.Domain.Models.Responses;
using VolunteerManagement.DataAccess.Context;

namespace VolunteerManagement.BusinessLayer.Core
{
    public class HoursEntryActions
    {
        protected HoursEntryActions() { }

        protected List<HoursEntryDto> GetAllHoursEntriesActionExecution()
        {
            using (var db = new HoursEntryContext())
            using (var userDb = new UserContext())
            {
                var entries = db.HoursEntries
                    .Where(h => !h.IsDeleted)
                    .OrderByDescending(h => h.CreatedAt)
                    .ToList();

                var result = new List<HoursEntryDto>();
                foreach (var entry in entries)
                {
                    var volunteer = userDb.Users.FirstOrDefault(u => u.Id == entry.VolunteerId);
                    result.Add(MapToDto(entry, volunteer?.Name ?? "Unknown"));
                }
                return result;
            }
        }

        protected List<HoursEntryDto> GetHoursByVolunteerActionExecution(int volunteerId)
        {
            using (var db = new HoursEntryContext())
            using (var userDb = new UserContext())
            {
                var entries = db.HoursEntries
                    .Where(h => h.VolunteerId == volunteerId && !h.IsDeleted)
                    .OrderByDescending(h => h.CreatedAt)
                    .ToList();

                var volunteer = userDb.Users.FirstOrDefault(u => u.Id == volunteerId);
                var result = new List<HoursEntryDto>();
                foreach (var entry in entries)
                {
                    result.Add(MapToDto(entry, volunteer?.Name ?? "Unknown"));
                }
                return result;
            }
        }

        protected HoursEntryDto? GetHoursEntryByIdActionExecution(int id)
        {
            using (var db = new HoursEntryContext())
            using (var userDb = new UserContext())
            {
                var entry = db.HoursEntries.FirstOrDefault(h => h.Id == id && !h.IsDeleted);
                if (entry == null) return null;
                
                var volunteer = userDb.Users.FirstOrDefault(u => u.Id == entry.VolunteerId);
                return MapToDto(entry, volunteer?.Name ?? "Unknown");
            }
        }

        protected ActionResponse CreateHoursEntryActionExecution(CreateHoursEntryDto dto)
        {
            using (var db = new HoursEntryContext())
            using (var userDb = new UserContext())
            {
                // Verifică dacă voluntarul există
                var volunteer = userDb.Users.FirstOrDefault(u => u.Id == dto.VolunteerId && !u.IsDeleted);
                if (volunteer == null)
                {
                    return new ActionResponse
                    {
                        IsSuccess = false,
                        Message = "Volunteer not found."
                    };
                }

                var entry = new HoursEntryData
                {
                    VolunteerId = dto.VolunteerId,
                    Date = dto.Date,
                    Hours = dto.Hours,
                    Description = dto.Description,
                    RelatedTaskId = dto.RelatedTaskId,
                    RelatedEventId = dto.RelatedEventId,
                    Status = "pending",
                    CreatedAt = DateTime.Now
                };

                db.HoursEntries.Add(entry);
                db.SaveChanges();

                return new ActionResponse
                {
                    IsSuccess = true,
                    Message = "Hours entry created successfully. Waiting for admin approval.",
                    Data = new { Id = entry.Id }
                };
            }
        }

        protected ActionResponse UpdateHoursStatusActionExecution(int id, UpdateHoursStatusDto dto)
        {
            using (var db = new HoursEntryContext())
            using (var userDb = new UserContext())
            {
                var entry = db.HoursEntries.FirstOrDefault(h => h.Id == id && !h.IsDeleted);
                if (entry == null)
                {
                    return new ActionResponse
                    {
                        IsSuccess = false,
                        Message = "Hours entry not found."
                    };
                }

                entry.Status = dto.Status;
                entry.AdminNote = dto.AdminNote;
                entry.UpdatedAt = DateTime.Now;
                db.SaveChanges();

                // Dacă orele sunt aprobate, actualizează TotalHours în UserData
                if (dto.Status == "approved")
                {
                    var volunteer = userDb.Users.FirstOrDefault(u => u.Id == entry.VolunteerId);
                    if (volunteer != null)
                    {
                        var totalHours = db.HoursEntries
                            .Where(h => h.VolunteerId == entry.VolunteerId && h.Status == "approved" && !h.IsDeleted)
                            .Sum(h => h.Hours);
                        
                        volunteer.TotalHours = (int)totalHours;
                        userDb.SaveChanges();
                    }
                }

                return new ActionResponse
                {
                    IsSuccess = true,
                    Message = dto.Status == "approved" ? "Hours approved successfully." : "Hours rejected successfully."
                };
            }
        }

        protected ActionResponse DeleteHoursEntryActionExecution(int id)
        {
            using (var db = new HoursEntryContext())
            {
                var entry = db.HoursEntries.FirstOrDefault(h => h.Id == id);
                if (entry == null)
                {
                    return new ActionResponse
                    {
                        IsSuccess = false,
                        Message = "Hours entry not found."
                    };
                }

                entry.IsDeleted = true;
                entry.UpdatedAt = DateTime.Now;
                db.SaveChanges();

                return new ActionResponse
                {
                    IsSuccess = true,
                    Message = "Hours entry deleted successfully."
                };
            }
        }

        private HoursEntryDto MapToDto(HoursEntryData entry, string volunteerName)
        {
            return new HoursEntryDto
            {
                Id = entry.Id,
                VolunteerId = entry.VolunteerId,
                VolunteerName = volunteerName,
                Date = entry.Date,
                Hours = entry.Hours,
                Description = entry.Description,
                RelatedTaskId = entry.RelatedTaskId,
                RelatedEventId = entry.RelatedEventId,
                Status = entry.Status,
                AdminNote = entry.AdminNote,
                CreatedAt = entry.CreatedAt
            };
        }
    }
}