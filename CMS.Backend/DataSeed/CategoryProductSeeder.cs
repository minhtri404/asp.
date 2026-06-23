using System.Globalization;
using System.Text;
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.DataSeed
{
    public static class CategoryProductSeeder
    {
        private static readonly string[] DefaultCategoryNames =
        {
            "Điện thoại",
            "Laptop, PC, Màn hình",
            "Tablet",
            "Âm thanh",
            "Đồng hồ",
            "Nhà thông minh",
            "Phụ kiện",
            "Thu cũ",
            "Hàng cũ",
            "Sim thẻ",
            "Tin công nghệ",
            "Khuyến mại",
            "Máy in"
        };

        public static async Task SeedAsync(IServiceProvider services)
        {
            using var scope = services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            var existingNames = await context.CategoriesProducts
                .Select(category => category.Name)
                .ToListAsync();

            var normalizedExistingNames = existingNames
                .Select(NormalizeName)
                .ToHashSet();

            foreach (var categoryName in DefaultCategoryNames)
            {
                if (normalizedExistingNames.Contains(NormalizeName(categoryName)))
                {
                    continue;
                }

                context.CategoriesProducts.Add(new CategoryProduct
                {
                    Name = categoryName,
                    Description = $"Danh mục {categoryName}"
                });
            }

            await context.SaveChangesAsync();
        }

        private static string NormalizeName(string value)
        {
            var normalized = value.Normalize(NormalizationForm.FormD);
            var builder = new StringBuilder();

            foreach (var character in normalized)
            {
                if (CharUnicodeInfo.GetUnicodeCategory(character) != UnicodeCategory.NonSpacingMark)
                {
                    builder.Append(character);
                }
            }

            return builder
                .ToString()
                .Replace('đ', 'd')
                .Replace('Đ', 'D')
                .Trim()
                .ToLowerInvariant();
        }
    }
}
