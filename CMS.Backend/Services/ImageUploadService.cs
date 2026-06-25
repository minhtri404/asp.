using Microsoft.AspNetCore.Hosting;

namespace CMS.Backend.Services
{
    public static class ImageUploadService
    {
        private static readonly HashSet<string> AllowedExtensions = new(StringComparer.OrdinalIgnoreCase)
        {
            ".jpg",
            ".jpeg",
            ".jfif",
            ".png",
            ".gif",
            ".webp"
        };

        public static string GetUploadRootPath(IWebHostEnvironment environment)
        {
            return Path.Combine(environment.WebRootPath, "uploads");
        }

        public static async Task<ImageUploadResult> SaveImageAsync(IFormFile? uploadImage, IWebHostEnvironment environment)
        {
            if (uploadImage == null || uploadImage.Length == 0)
            {
                return new ImageUploadResult(null, null);
            }

            var extension = Path.GetExtension(uploadImage.FileName);
            if (string.IsNullOrWhiteSpace(extension) || !AllowedExtensions.Contains(extension))
            {
                return new ImageUploadResult(null, "Chỉ cho phép tải lên file ảnh JPG, PNG, GIF hoặc WEBP.");
            }

            try
            {
                var folder = GetUploadRootPath(environment);
                Directory.CreateDirectory(folder);

                var fileName = $"{Guid.NewGuid():N}{extension.ToLowerInvariant()}";
                var filePath = Path.Combine(folder, fileName);

                await using var stream = new FileStream(filePath, FileMode.CreateNew);
                await uploadImage.CopyToAsync(stream);

                return new ImageUploadResult("/uploads/" + fileName, null);
            }
            catch (Exception ex)
            {
                return new ImageUploadResult(null, "Không thể lưu ảnh: " + ex.Message);
            }
        }
    }

    public sealed record ImageUploadResult(string? Url, string? ErrorMessage);
}
