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

        private static readonly Dictionary<string, ProductSeed[]> DefaultProductsByCategory = new()
        {
            ["Điện thoại"] = new[]
            {
                new ProductSeed("iPhone 15 Pro", "Điện thoại Apple hiệu năng cao, phù hợp nhu cầu học tập và làm việc.", 28990000m, 12),
                new ProductSeed("Samsung Galaxy S24", "Điện thoại Android màn hình đẹp, camera rõ và pin ổn định.", 21990000m, 15),
                new ProductSeed("OPPO Reno11", "Điện thoại tầm trung thiết kế mỏng, chụp ảnh chân dung tốt.", 8990000m, 20)
            },
            ["Laptop, PC, Màn hình"] = new[]
            {
                new ProductSeed("MacBook Air M2", "Laptop mỏng nhẹ, pin lâu, phù hợp học tập và văn phòng.", 23990000m, 8),
                new ProductSeed("Dell Inspiron 15", "Laptop Windows màn hình 15 inch, cấu hình ổn cho công việc hằng ngày.", 14990000m, 10),
                new ProductSeed("Màn hình LG 24 inch", "Màn hình Full HD dùng cho học tập, làm việc và giải trí.", 3290000m, 18)
            },
            ["Tablet"] = new[]
            {
                new ProductSeed("iPad 10.9 inch", "Máy tính bảng Apple phù hợp ghi chú, học online và giải trí.", 10990000m, 9),
                new ProductSeed("Samsung Galaxy Tab A9", "Tablet Android nhỏ gọn, dễ dùng cho học tập và xem phim.", 4990000m, 14),
                new ProductSeed("Lenovo Tab M10", "Máy tính bảng giá tốt, màn hình lớn và pin bền.", 3990000m, 16)
            },
            ["Âm thanh"] = new[]
            {
                new ProductSeed("AirPods Pro 2", "Tai nghe không dây chống ồn, âm thanh rõ và kết nối nhanh.", 5490000m, 11),
                new ProductSeed("Loa Bluetooth JBL Go 4", "Loa di động nhỏ gọn, âm lượng tốt cho nhu cầu hằng ngày.", 990000m, 25),
                new ProductSeed("Tai nghe Sony WH-CH520", "Tai nghe chụp tai pin lâu, phù hợp học online và nghe nhạc.", 1290000m, 17)
            },
            ["Đồng hồ"] = new[]
            {
                new ProductSeed("Apple Watch Series 9", "Đồng hồ thông minh theo dõi sức khỏe và thông báo nhanh.", 9990000m, 7),
                new ProductSeed("Samsung Galaxy Watch 6", "Đồng hồ Android thiết kế hiện đại, nhiều chế độ luyện tập.", 6490000m, 9),
                new ProductSeed("Đồng hồ Casio MTP", "Đồng hồ thời trang bền, dễ phối đồ và dùng hằng ngày.", 1290000m, 20)
            },
            ["Nhà thông minh"] = new[]
            {
                new ProductSeed("Camera Xiaomi C400", "Camera trong nhà độ phân giải cao, hỗ trợ theo dõi từ xa.", 1090000m, 13),
                new ProductSeed("Ổ cắm TP-Link Tapo P100", "Ổ cắm thông minh điều khiển bằng điện thoại.", 290000m, 30),
                new ProductSeed("Google Nest Mini", "Loa thông minh hỗ trợ điều khiển nhà thông minh bằng giọng nói.", 890000m, 12)
            },
            ["Phụ kiện"] = new[]
            {
                new ProductSeed("Sạc nhanh Anker 20W", "Củ sạc nhanh nhỏ gọn cho điện thoại và tablet.", 390000m, 40),
                new ProductSeed("Cáp Type-C Ugreen", "Cáp sạc và truyền dữ liệu bền, tương thích nhiều thiết bị.", 190000m, 50),
                new ProductSeed("Ốp lưng iPhone", "Ốp lưng bảo vệ máy, thiết kế đơn giản dễ dùng.", 150000m, 60)
            },
            ["Thu cũ"] = new[]
            {
                new ProductSeed("Thu cũ điện thoại iPhone", "Dịch vụ thu cũ điện thoại iPhone, định giá theo tình trạng máy.", 0m, 100),
                new ProductSeed("Thu cũ laptop Windows", "Dịch vụ thu cũ laptop Windows còn hoạt động.", 0m, 100)
            },
            ["Hàng cũ"] = new[]
            {
                new ProductSeed("iPhone 12 cũ", "Điện thoại đã qua sử dụng, kiểm tra ngoại hình và chức năng trước khi bán.", 8990000m, 5),
                new ProductSeed("Laptop Dell Latitude cũ", "Laptop văn phòng đã qua sử dụng, phù hợp học tập và làm việc.", 6990000m, 6),
                new ProductSeed("Apple Watch SE cũ", "Đồng hồ Apple đã qua sử dụng, còn hoạt động ổn định.", 3990000m, 4)
            },
            ["Sim thẻ"] = new[]
            {
                new ProductSeed("Sim 4G Viettel", "Sim data 4G dùng cho điện thoại và thiết bị phát wifi.", 150000m, 80),
                new ProductSeed("Sim data Mobifone", "Sim data dung lượng cao, phù hợp học tập và làm việc online.", 120000m, 70),
                new ProductSeed("Thẻ cào điện thoại", "Thẻ nạp điện thoại nhiều mệnh giá.", 50000m, 200)
            },
            ["Tin công nghệ"] = new[]
            {
                new ProductSeed("Bản tin AI Phone", "Nội dung cập nhật xu hướng điện thoại tích hợp AI.", 0m, 999),
                new ProductSeed("Tư vấn chọn laptop", "Nội dung gợi ý chọn laptop theo nhu cầu học tập và văn phòng.", 0m, 999)
            },
            ["Khuyến mại"] = new[]
            {
                new ProductSeed("Combo phụ kiện giảm giá", "Gói phụ kiện gồm sạc, cáp và ốp lưng với giá ưu đãi.", 499000m, 35),
                new ProductSeed("Voucher mua hàng", "Mã ưu đãi dùng khi mua sản phẩm tại cửa hàng.", 100000m, 100),
                new ProductSeed("Sản phẩm flash sale", "Sản phẩm khuyến mại số lượng giới hạn trong ngày.", 990000m, 10)
            },
            ["Máy in"] = new[]
            {
                new ProductSeed("Máy in Canon LBP2900", "Máy in laser trắng đen phổ biến cho văn phòng nhỏ.", 3290000m, 8),
                new ProductSeed("Máy in HP LaserJet", "Máy in laser tốc độ tốt, phù hợp in tài liệu thường xuyên.", 3890000m, 7),
                new ProductSeed("Máy in Epson EcoTank", "Máy in phun tiết kiệm mực, phù hợp gia đình và văn phòng.", 4590000m, 6)
            }
        };

        public static async Task SeedAsync(IServiceProvider services)
        {
            using var scope = services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            await SeedCategoriesAsync(context);
            await SeedProductsAsync(context);
        }

        private static async Task SeedCategoriesAsync(ApplicationDbContext context)
        {
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

        private static async Task SeedProductsAsync(ApplicationDbContext context)
        {
            var categories = await context.CategoriesProducts.ToListAsync();
            var categoriesByName = categories
                .GroupBy(category => NormalizeName(category.Name))
                .ToDictionary(group => group.Key, group => group.First());

            var existingProductNames = await context.Products
                .Select(product => product.Name)
                .ToListAsync();

            var normalizedExistingProductNames = existingProductNames
                .Select(NormalizeName)
                .ToHashSet();

            foreach (var categoryProducts in DefaultProductsByCategory)
            {
                if (!categoriesByName.TryGetValue(NormalizeName(categoryProducts.Key), out var category))
                {
                    continue;
                }

                foreach (var productSeed in categoryProducts.Value)
                {
                    if (normalizedExistingProductNames.Contains(NormalizeName(productSeed.Name)))
                    {
                        continue;
                    }

                    context.Products.Add(new Product
                    {
                        Name = productSeed.Name,
                        Description = productSeed.Description,
                        Price = productSeed.Price,
                        StockQuantity = productSeed.StockQuantity,
                        ImageUrl = null,
                        CategoryProductId = category.Id
                    });
                }
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

        private sealed record ProductSeed(
            string Name,
            string Description,
            decimal Price,
            int StockQuantity);
    }
}
