using System.Globalization;
using System.Text;
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.DataSeed
{
    public static class CategoryProductSeeder
    {
        private static readonly CategorySeed[] Categories =
        {
            new("iPhone", "Dien thoai iPhone chinh hang"),
            new("MacBook", "May tinh MacBook"),
            new("iPad", "May tinh bang iPad"),
            new("AirPods", "Tai nghe AirPods"),
            new("OPPO", "Dien thoai OPPO")
        };

        private static readonly ProductSeed[] Products =
        {
            new("iPhone 15 Pro", "iPhone 15 Pro chinh hang VN/A, hieu nang manh, camera sac net.", 28990000m, 12, "iPhone", "/uploads/vn-11134207-7r98o-lllv9z75ute769.jfif"),
            new("iPhone 15 Plus", "iPhone 15 Plus man hinh lon, pin tot, phu hop hoc tap va lam viec.", 32790000m, 9, "iPhone", "/uploads/vn-11134207-7r98o-lllv9z75ute769.jfif"),
            new("iPhone 12 cu", "iPhone 12 da qua su dung, kiem tra ngoai hinh va chuc nang truoc khi ban.", 8990000m, 5, "iPhone", "/uploads/iPhone 12 cũ.jfif"),

            new("MacBook Air M2", "MacBook Air M2 mong nhe, pin lau, phu hop hoc tap va van phong.", 23990000m, 8, "MacBook", "/uploads/tải xuống (3).jfif"),
            new("MacBook Pro 14 inch", "MacBook Pro 14 inch hieu nang cao cho cong viec do hoa va lap trinh.", 44990000m, 6, "MacBook", "/uploads/tải xuống (3).jfif"),
            new("MacBook Air M1", "MacBook Air M1 gia tot, pin lau, thich hop hoc tap va lam viec.", 18990000m, 10, "MacBook", "/uploads/tải xuống (3).jfif"),

            new("iPad 10.9 inch", "iPad 10.9 inch phu hop ghi chu, hoc online va giai tri.", 10990000m, 9, "iPad", "/uploads/iPad 10.9 inch.webp"),
            new("iPad Air 5", "iPad Air 5 man hinh dep, hieu nang tot cho hoc tap va sang tao.", 16990000m, 8, "iPad", "/uploads/iPad 10.9 inch.webp"),
            new("iPad Pro 11 inch", "iPad Pro 11 inch hieu nang cao, man hinh muot va ho tro Apple Pencil.", 22990000m, 5, "iPad", "/uploads/iPad 10.9 inch.webp"),

            new("AirPods Pro 2", "AirPods Pro 2 chong on, am thanh ro va ket noi nhanh.", 5490000m, 11, "AirPods", "/uploads/images (2).jfif"),
            new("AirPods 3", "AirPods 3 thiet ke gon, am thanh tot va pin on dinh.", 3990000m, 12, "AirPods", "/uploads/images (2).jfif"),
            new("AirPods 2", "AirPods 2 de dung, ket noi nhanh voi thiet bi Apple.", 2990000m, 15, "AirPods", "/uploads/images (2).jfif"),

            new("OPPO Reno11", "OPPO Reno11 thiet ke mong, chup anh chan dung tot.", 8990000m, 20, "OPPO", "/uploads/vn-11134207-81ztc-mkd8fmg9clc094.jfif"),
            new("OPPO A58", "OPPO A58 pin tot, man hinh lon, phu hop nhu cau pho thong.", 4990000m, 18, "OPPO", "/uploads/vn-11134207-81ztc-mkd8fmg9clc094.jfif"),
            new("OPPO Find X5", "OPPO Find X5 camera dep, hieu nang cao va thiet ke cao cap.", 13990000m, 7, "OPPO", "/uploads/vn-11134207-81ztc-mkd8fmg9clc094.jfif")
        };

        private static readonly string[] OldSeededCategoryNames =
        {
            "Dien thoai",
            "Laptop, PC, Man hinh",
            "Tablet",
            "Am thanh",
            "Dong ho",
            "Nha thong minh",
            "Phu kien",
            "Thu cu",
            "Hang cu",
            "Sim the",
            "Tin cong nghe",
            "Khuyen mai",
            "May in",
            "Samsung",
            "Watch",
            "Mac",
            "iPhone 15 Series",
            "iPhone 14 Series",
            "iPhone 13",
            "iPhone 12",
            "iPhone 11",
            "MacBook Air",
            "MacBook Pro",
            "MacBook M Series",
            "iPad Pro",
            "iPad Air",
            "iPad Gen 10",
            "iPad Gen 9",
            "iPad mini",
            "AirPods Pro",
            "AirPods 3",
            "AirPods 2",
            "OPPO Reno",
            "OPPO A Series",
            "OPPO Find",
            "Galaxy S Series",
            "Galaxy A Series",
            "Galaxy Z Series",
            "Galaxy Tab",
            "Apple Watch Ultra",
            "Apple Watch S7",
            "Apple Watch SE",
            "Apple Watch S8",
            "Apple Watch S9",
            "Samsung Watch",
            "Dong ho pho thong",
            "Mac Studio",
            "iMac",
            "Mac mini",
            "Apple TV",
            "Laptop Windows",
            "Man hinh",
            "Loa",
            "Tai nghe",
            "Phu kien Apple",
            "Coc - Cap",
            "Sac du phong",
            "Bao da - Op lung",
            "Dan cuong luc",
            "Phu kien MacBook",
            "Ban phim - Chuot",
            "Balo - Tui chong shock",
            "Thu cu dien thoai",
            "Thu cu laptop",
            "Dien thoai cu",
            "Laptop cu",
            "Dong ho cu",
            "Sim 4G",
            "Sim data",
            "The cao",
            "Tin AI",
            "Tu van laptop",
            "Combo phu kien",
            "Voucher",
            "Flash sale",
            "Canon",
            "HP",
            "Epson"
        };

        private static readonly string[] OldSeededProductNames =
        {
            "Samsung Galaxy S24",
            "Samsung Galaxy Tab A9",
            "Samsung Galaxy Watch 6",
            "Dell Inspiron 15",
            "Man hinh LG 24 inch",
            "Lenovo Tab M10",
            "Loa Bluetooth JBL Go 4",
            "Tai nghe Sony WH-CH520",
            "Apple Watch Series 9",
            "Dong ho Casio MTP",
            "Camera Xiaomi C400",
            "Sac nhanh Anker 20W",
            "Cap Type-C Ugreen",
            "Op lung iPhone",
            "Thu cu dien thoai iPhone",
            "Thu cu laptop Windows",
            "Laptop Dell Latitude cu",
            "Apple Watch SE cu",
            "Sim 4G Viettel",
            "Sim data Mobifone",
            "The cao dien thoai",
            "Ban tin AI Phone",
            "Tu van chon laptop",
            "Combo phu kien giam gia",
            "Voucher mua hang",
            "San pham flash sale",
            "May in Canon LBP2900",
            "May in HP LaserJet",
            "May in Epson EcoTank"
        };

        public static async Task SeedAsync(IServiceProvider services)
        {
            using var scope = services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            await SeedCategoriesAsync(context);
            await SeedProductsAsync(context);
            await DeleteForcedOldCategoriesAsync(context);
            await DeleteOldSeedDataAsync(context);
        }

        private static async Task SeedCategoriesAsync(ApplicationDbContext context)
        {
            var categories = await context.CategoriesProducts.ToListAsync();

            foreach (var categorySeed in Categories)
            {
                var category = FindByName(categories, categorySeed.Name);

                if (category == null)
                {
                    category = new CategoryProduct { Name = categorySeed.Name };
                    context.CategoriesProducts.Add(category);
                    categories.Add(category);
                }

                category.Description = categorySeed.Description;
            }

            await context.SaveChangesAsync();
        }

        private static async Task SeedProductsAsync(ApplicationDbContext context)
        {
            var categories = await context.CategoriesProducts.ToListAsync();
            var existingProducts = await context.Products.ToListAsync();

            foreach (var productSeed in Products)
            {
                var targetCategory = FindByName(categories, productSeed.CategoryName);

                if (targetCategory == null)
                {
                    continue;
                }

                var product = existingProducts.FirstOrDefault(item =>
                    NormalizeName(item.Name) == NormalizeName(productSeed.Name));

                if (product == null)
                {
                    product = new Product { Name = productSeed.Name };
                    context.Products.Add(product);
                    existingProducts.Add(product);
                }

                product.Description = productSeed.Description;
                product.Price = productSeed.Price;
                product.StockQuantity = productSeed.StockQuantity;
                product.ImageUrl = productSeed.ImageUrl;
                product.CategoryProductId = targetCategory.Id;
            }

            await context.SaveChangesAsync();
        }

        private static async Task DeleteOldSeedDataAsync(ApplicationDbContext context)
        {
            var currentCategoryNames = Categories.Select(category => NormalizeName(category.Name)).ToHashSet();
            var currentProductNames = Products.Select(product => NormalizeName(product.Name)).ToHashSet();
            var oldSeededProductNames = OldSeededProductNames.Select(NormalizeName).ToHashSet();
            var seededCategoryNames = OldSeededCategoryNames
                .Select(NormalizeName)
                .Concat(currentCategoryNames)
                .ToHashSet();

            var products = await context.Products
                .Include(product => product.CategoryProduct)
                .ToListAsync();

            var oldProducts = products.Where(product =>
                !currentProductNames.Contains(NormalizeName(product.Name)) &&
                oldSeededProductNames.Contains(NormalizeName(product.Name)) &&
                product.CategoryProduct != null &&
                seededCategoryNames.Contains(NormalizeName(product.CategoryProduct.Name))).ToList();

            if (oldProducts.Count > 0)
            {
                context.Products.RemoveRange(oldProducts);
                await context.SaveChangesAsync();
            }

            var changed = true;

            while (changed)
            {
                changed = false;

                var categories = await context.CategoriesProducts
                    .Include(category => category.Products)
                    .ToListAsync();

                var oldCategories = categories.Where(category =>
                    !currentCategoryNames.Contains(NormalizeName(category.Name)) &&
                    seededCategoryNames.Contains(NormalizeName(category.Name)) &&
                    (category.Products == null || !category.Products.Any())).ToList();

                if (oldCategories.Count == 0)
                {
                    continue;
                }

                context.CategoriesProducts.RemoveRange(oldCategories);
                await context.SaveChangesAsync();
                changed = true;
            }
        }

        private static async Task DeleteForcedOldCategoriesAsync(ApplicationDbContext context)
        {
            var forcedDeleteNames = new HashSet<string>
            {
                NormalizeName("Điện thoại"),
                NormalizeName("\u0110i\u1ec7n tho\u1ea1i"),
                NormalizeName("Dien thoai"),
                NormalizeName("Nhà thông minh"),
                NormalizeName("Nh\u00e0 th\u00f4ng minh"),
                NormalizeName("Nha thong minh"),
                NormalizeName("Phụ kiện"),
                NormalizeName("Ph\u1ee5 ki\u1ec7n"),
                NormalizeName("Phu kien")
            };

            var categories = await context.CategoriesProducts.ToListAsync();
            var categoriesToDelete = categories
                .Where(category => forcedDeleteNames.Contains(NormalizeName(category.Name)))
                .ToList();

            if (categoriesToDelete.Count == 0)
            {
                return;
            }

            var deleteIds = categoriesToDelete.Select(category => category.Id).ToHashSet();

            var productsToDelete = await context.Products
                .Where(product => deleteIds.Contains(product.CategoryProductId))
                .ToListAsync();

            if (productsToDelete.Count > 0)
            {
                context.Products.RemoveRange(productsToDelete);
                await context.SaveChangesAsync();
            }

            context.CategoriesProducts.RemoveRange(categoriesToDelete);
            await context.SaveChangesAsync();
        }

        private static CategoryProduct? FindByName(IEnumerable<CategoryProduct> categories, string name)
        {
            return categories.FirstOrDefault(category => NormalizeName(category.Name) == NormalizeName(name));
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
                .Replace('\u0111', 'd')
                .Replace('\u0110', 'D')
                .Trim()
                .ToLowerInvariant();
        }

        private sealed record CategorySeed(string Name, string Description);

        private sealed record ProductSeed(
            string Name,
            string Description,
            decimal Price,
            int StockQuantity,
            string CategoryName,
            string ImageUrl);
    }
}
