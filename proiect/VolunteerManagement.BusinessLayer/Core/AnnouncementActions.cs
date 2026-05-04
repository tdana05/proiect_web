using VolunteerManagement.Domain.Entities;
using VolunteerManagement.Domain.Models;
using VolunteerManagement.Domain.Models.Responces;
using VolunteerManagement.DataAccess.Context;

namespace VolunteerManagement.BusinessLayer.Core
{
    public class AnnouncementActions
    {
        protected AnnouncementActions() { }

        protected List<AnnouncementDto> GetAllAnnouncementsActionExecution()
        {
            var data = new List<AnnouncementDto>();
            List<AnnouncementData> announcements;

            using (var db = new VolunteerManagementContext())
            {
                announcements = db.Announcements
                    .Where(x => !x.IsDeleted)
                    .OrderByDescending(x => x.Pinned)
                    .ThenByDescending(x => x.CreatedAt)
                    .ToList();
            }

            if (announcements.Count <= 0) return data;

            foreach (var item in announcements)
            {
                data.Add(new AnnouncementDto
                {
                    Id = item.Id,
                    Title = item.Title,
                    Content = item.Content,
                    CreatedBy = item.CreatedBy,
                    CreatedAt = item.CreatedAt.ToString("o"),
                    Priority = item.Priority,
                    Pinned = item.Pinned
                });
            }

            return data;
        }

        protected AnnouncementDto? GetAnnouncementByIdActionExecution(int id)
        {
            AnnouncementData? announcement;

            using (var db = new VolunteerManagementContext())
            {
                announcement = db.Announcements
                    .FirstOrDefault(x => x.Id == id && !x.IsDeleted);
            }

            if (announcement == null) return null;

            return new AnnouncementDto
            {
                Id = announcement.Id,
                Title = announcement.Title,
                Content = announcement.Content,
                CreatedBy = announcement.CreatedBy,
                CreatedAt = announcement.CreatedAt.ToString("o"),
                Priority = announcement.Priority,
                Pinned = announcement.Pinned
            };
        }

        protected ActionResponse CreateAnnouncementActionExecution(AnnouncementDto data)
        {
            using (var db = new VolunteerManagementContext())
            {
                var announcement = new AnnouncementData
                {
                    Title = data.Title,
                    Content = data.Content,
                    CreatedBy = data.CreatedBy,
                    Priority = data.Priority,
                    Pinned = data.Pinned,
                    CreatedAt = DateTime.Now
                };

                db.Announcements.Add(announcement);
                db.SaveChanges();
            }

            return new ActionResponse
            {
                IsSuccess = true,
                Message = "Announcement created successfully."
            };
        }

        protected ActionResponse UpdateAnnouncementActionExecution(AnnouncementDto data)
        {
            var localData = GetAnnouncementByIdInternal(data.Id);
            if (localData == null)
            {
                return new ActionResponse
                {
                    IsSuccess = false,
                    Message = "Announcement not found."
                };
            }

            localData.Title = data.Title;
            localData.Content = data.Content;
            localData.Priority = data.Priority;
            localData.Pinned = data.Pinned;
            localData.UpdatedAt = DateTime.Now;

            using (var db = new VolunteerManagementContext())
            {
                db.Announcements.Update(localData);
                db.SaveChanges();
            }

            return new ActionResponse
            {
                IsSuccess = true,
                Message = "Announcement updated successfully."
            };
        }

        protected ActionResponse DeleteAnnouncementActionExecution(int id)
        {
            var localData = GetAnnouncementByIdInternal(id);
            if (localData == null)
            {
                return new ActionResponse
                {
                    IsSuccess = false,
                    Message = "Announcement not found."
                };
            }

            localData.IsDeleted = true;
            localData.UpdatedAt = DateTime.Now;

            using (var db = new VolunteerManagementContext())
            {
                db.Announcements.Update(localData);
                db.SaveChanges();
            }

            return new ActionResponse
            {
                IsSuccess = true,
                Message = "Announcement deleted successfully."
            };
        }

        private AnnouncementData? GetAnnouncementByIdInternal(int id)
        {
            AnnouncementData? localData;
            using (var db = new VolunteerManagementContext())
            {
                localData = db.Announcements
                    .FirstOrDefault(x => x.Id == id);
            }
            return localData;
        }
    }
}