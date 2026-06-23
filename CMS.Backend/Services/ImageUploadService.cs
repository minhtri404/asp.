using Microsoft.AspNetCore.Hosting;

namespace CMS.Backend.Services
{
    public static class ImageUploadService
    {
        private static readonly HashSet<string> AllowedExtensions = new(StringComparer.OrdinalIgnoreCase)
        {
            ".jpg",
            ".jpeg",
            ".png",
            ".gif",
            ".webp"
        };

        public static string GetUploadRootPath(IWebHostEnvironment environment)
        {
            var localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            return Path.Combine(localAppData, "TriCMS", "Uploads");
        }

        public static async Task<string?> SaveImageAsync(IFormFile? uploadImage, IWebHostEnvironment environment)
        {
            if (uploadImage == null || uploadImage.Length == 0)
            {
                return null;
            }

            var extension = Path.GetExtension(uploadImage.FileName);
            if (string.IsNullOrWhiteSpace(extension) || !AllowedExtensions.Contains(extension))
            {
                throw new InvalidOperationException("Chỉ cho phép tải lên file ảnh JPG, PNG, GIF hoặc WEBP.");
            }

            var folder = GetUploadRootPath(environment);
            Directory.CreateDirectory(folder);

            var fileName = $"{Guid.NewGuid():N}{extension.ToLowerInvariant()}";
            var filePath = Path.Combine(folder, fileName);

            await using var stream = new FileStream(filePath, FileMode.CreateNew);
            await uploadImage.CopyToAsync(stream);

            return "/uploads/" + fileName;
        }
    }
}
