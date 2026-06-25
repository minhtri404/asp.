using CMS.Backend.Models;
using CMS.Backend.Services;
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin,Editor")]
    public class AdvertisementController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public AdvertisementController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public async Task<IActionResult> Index(string? keyword, string? status, int page = 1, int pageSize = 10)
        {
            var query = _context.Set<Advertisement>().AsQueryable();

            if (!string.IsNullOrWhiteSpace(keyword))
            {
                query = query.Where(item =>
                    item.Title.Contains(keyword) ||
                    (item.Subtitle != null && item.Subtitle.Contains(keyword)) ||
                    (item.Description != null && item.Description.Contains(keyword)));
            }

            if (status == "active")
            {
                query = query.Where(item => item.IsActive);
            }
            else if (status == "inactive")
            {
                query = query.Where(item => !item.IsActive);
            }

            query = query.OrderBy(item => item.DisplayOrder).ThenByDescending(item => item.CreatedDate);

            ViewBag.Keyword = keyword;
            ViewBag.Status = status;
            ViewBag.PageSize = pageSize;

            var advertisements = await PaginatedList<Advertisement>.CreateAsync(query.AsNoTracking(), page, pageSize);
            return View(advertisements);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var maxOrder = await _context.Set<Advertisement>().MaxAsync(item => (int?)item.DisplayOrder) ?? 0;

            return View(new Advertisement
            {
                DisplayOrder = maxOrder + 1,
                IsActive = true
            });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Advertisement model, IFormFile? uploadImage)
        {
            ModelState.Remove(nameof(Advertisement.ImageUrl));

            ValidateDateRange(model);

            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var imageResult = await ImageUploadService.SaveImageAsync(uploadImage, _environment);
            if (!string.IsNullOrEmpty(imageResult.ErrorMessage))
            {
                ModelState.AddModelError(nameof(Advertisement.ImageUrl), imageResult.ErrorMessage);
                return View(model);
            }

            model.ImageUrl = imageResult.Url;
            model.CreatedDate = DateTime.Now;

            _context.Set<Advertisement>().Add(model);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Thêm banner quảng cáo thành công";
            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var advertisement = await _context.Set<Advertisement>().FindAsync(id);

            if (advertisement == null)
            {
                return NotFound();
            }

            return View(advertisement);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Advertisement model, IFormFile? uploadImage)
        {
            if (id != model.Id)
            {
                return NotFound();
            }

            ModelState.Remove(nameof(Advertisement.ImageUrl));
            ValidateDateRange(model);

            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var oldAdvertisement = await _context.Set<Advertisement>().AsNoTracking().FirstOrDefaultAsync(item => item.Id == id);
            if (oldAdvertisement == null)
            {
                return NotFound();
            }

            var imageResult = await ImageUploadService.SaveImageAsync(uploadImage, _environment);
            if (!string.IsNullOrEmpty(imageResult.ErrorMessage))
            {
                ModelState.AddModelError(nameof(Advertisement.ImageUrl), imageResult.ErrorMessage);
                return View(model);
            }

            model.ImageUrl = string.IsNullOrWhiteSpace(imageResult.Url) ? oldAdvertisement.ImageUrl : imageResult.Url;
            model.CreatedDate = oldAdvertisement.CreatedDate;

            _context.Set<Advertisement>().Update(model);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Cập nhật banner quảng cáo thành công";
            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var advertisement = await _context.Set<Advertisement>().FindAsync(id);

            if (advertisement == null)
            {
                return NotFound();
            }

            return View(advertisement);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var advertisement = await _context.Set<Advertisement>().FindAsync(id);

            if (advertisement == null)
            {
                return NotFound();
            }

            _context.Set<Advertisement>().Remove(advertisement);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Xóa banner quảng cáo thành công";
            return RedirectToAction(nameof(Index));
        }

        private void ValidateDateRange(Advertisement model)
        {
            if (model.StartDate.HasValue && model.EndDate.HasValue && model.StartDate > model.EndDate)
            {
                ModelState.AddModelError(nameof(Advertisement.EndDate), "Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.");
            }
        }
    }
}
