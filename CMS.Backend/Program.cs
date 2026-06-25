using CMS.Data;
using Microsoft.EntityFrameworkCore;
using CMS.Backend.DataSeed;
using CMS.Backend.Services;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(60);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";
        options.AccessDeniedPath = "/Account/AccessDenied";
        options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
    });

// Thêm CORS cho ReactJS
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    await context.Database.MigrateAsync();
}

await CategoryProductSeeder.SeedAsync(app.Services);
await AdvertisementSeeder.SeedAsync(app.Services);
var uploadRootPath = ImageUploadService.GetUploadRootPath(app.Environment);
Directory.CreateDirectory(uploadRootPath);

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}
app.UseStaticFiles();

app.UseRouting();
app.UseSession();
// Dùng CORS trước Authentication/Authorization
app.UseCors("ReactPolicy");

app.UseAuthentication();
app.UseAuthorization();

// Thêm dòng này để chạy API Controller
app.MapControllers();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Account}/{action=Login}/{id?}");

app.Lifetime.ApplicationStopping.Register(() =>
    app.Logger.LogWarning("TriCMS backend is stopping."));

app.Lifetime.ApplicationStopped.Register(() =>
    app.Logger.LogWarning("TriCMS backend has stopped."));

try
{
    app.Run();
}
catch (Exception ex)
{
    app.Logger.LogCritical(ex, "TriCMS backend stopped because of an unhandled exception.");
    throw;
}
