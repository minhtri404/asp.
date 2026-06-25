using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers.Api
{
    [Route("api/Advertisements")]
    [ApiController]
    public class AdvertisementsApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdvertisementsApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAdvertisements()
        {
            var now = DateTime.Now;

            var advertisements = await _context.Set<Advertisement>()
                .Where(item =>
                    item.IsActive &&
                    (!item.StartDate.HasValue || item.StartDate.Value <= now) &&
                    (!item.EndDate.HasValue || item.EndDate.Value >= now))
                .OrderBy(item => item.DisplayOrder)
                .ThenByDescending(item => item.CreatedDate)
                .Select(item => new
                {
                    item.Id,
                    item.Title,
                    item.Subtitle,
                    item.Description,
                    item.ImageUrl,
                    item.LinkUrl,
                    item.ButtonText,
                    item.DisplayOrder
                })
                .ToListAsync();

            return Ok(advertisements);
        }
    }
}
