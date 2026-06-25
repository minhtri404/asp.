using CMS.Data;
using CMS.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.DataSeed
{
    public static class AdvertisementSeeder
    {
        public static async Task SeedAsync(IServiceProvider services)
        {
            using var scope = services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var advertisements = context.Set<Advertisement>();

            if (await advertisements.AnyAsync())
            {
                return;
            }

            advertisements.AddRange(
                new Advertisement
                {
                    Title = "iPhone 15 Pro Max",
                    Subtitle = "TriShop công nghệ",
                    Description = "Titan bền nhẹ, camera sắc nét, ưu đãi trả góp và thu cũ lên đời cho khách hàng TriShop.",
                    ImageUrl = "/img/iphone.jpg",
                    LinkUrl = "/shop?category=2",
                    ButtonText = "Xem điện thoại",
                    DisplayOrder = 1,
                    IsActive = true
                },
                new Advertisement
                {
                    Title = "Laptop học tập và văn phòng",
                    Subtitle = "Laptop, PC, Màn hình",
                    Description = "Chọn laptop mỏng nhẹ, pin lâu, cấu hình ổn định cho học tập và làm việc.",
                    ImageUrl = "/img/laptop.jpg",
                    LinkUrl = "/shop?category=1",
                    ButtonText = "Xem laptop",
                    DisplayOrder = 2,
                    IsActive = true
                },
                new Advertisement
                {
                    Title = "Phụ kiện công nghệ",
                    Subtitle = "Âm thanh và phụ kiện",
                    Description = "Tai nghe, loa Bluetooth, sạc nhanh và phụ kiện cần thiết cho thiết bị của bạn.",
                    ImageUrl = "/img/headphone.jpg",
                    LinkUrl = "/shop?category=4",
                    ButtonText = "Xem phụ kiện",
                    DisplayOrder = 3,
                    IsActive = true
                });

            await context.SaveChangesAsync();
        }
    }
}
