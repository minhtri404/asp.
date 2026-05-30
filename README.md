# TriCMS - README Buổi 5

## 1. Thông tin dự án

**Tên dự án:** TriCMS - Hệ thống quản lý nội dung ASP.NET Core MVC  
**Môn học:** Chuyên đề ASP.NET  
**Sinh viên:** Trương Minh Trí  
**MSSV:** 2123110137  
**Lớp:** CCQ2311D  

TriCMS là hệ thống quản lý nội dung được xây dựng bằng ASP.NET Core MVC, Entity Framework Core và SQL Server. Sau Buổi 4, dự án đã có giao diện Admin Panel và CRUD cơ bản. Buổi 5 tiếp tục phát triển phần đăng nhập, phân quyền và validation dữ liệu cho trang quản trị.

---

## 2. Mục tiêu Buổi 5

Buổi 5 tập trung vào các nội dung chính:

- Xây dựng chức năng đăng nhập Admin
- Xây dựng chức năng đăng xuất
- Chặn truy cập trang quản trị nếu chưa đăng nhập
- Phân quyền người dùng theo Role
- Chỉ cho tài khoản có quyền phù hợp truy cập trang quản trị
- Thêm validation dữ liệu cho form
- Hiển thị thông báo lỗi khi nhập thiếu hoặc sai dữ liệu
- Hoàn thiện bảo mật cơ bản cho Admin Panel

---

## 3. Nội dung đã thực hiện trong Buổi 5

Trong Buổi 5, dự án đã hoàn thành các nội dung sau:

- Cấu hình Cookie Authentication trong `Program.cs`
- Tạo `AccountController` để xử lý đăng nhập và đăng xuất
- Tạo `LoginViewModel` dùng cho form đăng nhập
- Tạo giao diện đăng nhập Admin
- Tạo trang Access Denied khi người dùng không có quyền
- Gắn `[Authorize]` cho các Controller quản trị
- Gắn `[Authorize(Roles = "Admin")]` cho chức năng cần quyền Admin
- Chặn tài khoản Role `User` không được vào Admin Panel
- Thêm validation cho Entity
- Thêm kiểm tra `ModelState.IsValid` trong Controller
- Hiển thị thông báo lỗi validation trên giao diện

---

## 4. Công nghệ sử dụng

- ASP.NET Core MVC
- Cookie Authentication
- Authorization
- Claims
- Entity Framework Core
- SQL Server
- Razor View
- Data Annotations
- Bootstrap 5
- C#
- Git và GitHub

---

## 5. Cấu trúc thư mục liên quan đến Buổi 5

```text
CMS.Backend
│
├── Controllers
│   ├── AccountController.cs
│   ├── CategoryController.cs
│   ├── PostController.cs
│   ├── UserController.cs
│   ├── CategoryProductController.cs
│   ├── ProductController.cs
│   ├── CustomerController.cs
│   ├── OrderController.cs
│   └── OrderDetailController.cs
│
├── ViewModels
│   └── LoginViewModel.cs
│
├── Views
│   ├── Account
│   │   ├── Login.cshtml
│   │   └── AccessDenied.cshtml
│   │
│   ├── Category
│   │   ├── Create.cshtml
│   │   └── Edit.cshtml
│   │
│   ├── Post
│   │   ├── Create.cshtml
│   │   └── Edit.cshtml
│   │
│   ├── User
│   │   ├── Create.cshtml
│   │   └── Edit.cshtml
│   │
│   └── Shared
│       └── _LayoutAdmin.cshtml
│
└── Program.cs
```

---

## 6. Chức năng đăng nhập Admin

Buổi 5 đã tạo chức năng đăng nhập cho trang quản trị. Người dùng đăng nhập bằng tài khoản trong bảng `Users`.

Bảng `Users` gồm các cột chính:

| Cột | Ý nghĩa |
|---|---|
| Username | Tên đăng nhập |
| PasswordHash | Mật khẩu |
| FullName | Họ tên người dùng |
| Role | Quyền người dùng |

Ví dụ dữ liệu tài khoản:

| Username | PasswordHash | FullName | Role |
|---|---|---|---|
| admin | 123 | Quản trị viên hệ thống | Admin |
| editor01 | 123 | Biên tập viên nội dung | Editor |
| use01 | 123 | Nguyễn Văn A | User |

---

## 7. Chức năng đăng xuất

Sau khi đăng nhập thành công, người dùng có thể bấm **Đăng xuất** trên giao diện quản trị.

Khi đăng xuất:

- Cookie đăng nhập bị xóa
- Người dùng được chuyển về trang đăng nhập
- Nếu truy cập lại trang quản trị thì phải đăng nhập lại

---

## 8. Cấu hình Authentication trong Program.cs

Trong `Program.cs`, dự án đã cấu hình Cookie Authentication:

```csharp
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";
        options.AccessDeniedPath = "/Account/AccessDenied";
        options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
    });

builder.Services.AddAuthorization();
```

Thứ tự middleware trong `Program.cs`:

```csharp
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Account}/{action=Login}/{id?}");

app.Run();
```

Lưu ý:

- `UseAuthentication()` phải đặt trước `UseAuthorization()`
- Các dòng `builder.Services...` phải đặt trước `var app = builder.Build();`

---

## 9. AccountController

`AccountController` dùng để xử lý:

- Hiển thị form đăng nhập
- Kiểm tra tài khoản đăng nhập
- Tạo cookie đăng nhập
- Đăng xuất
- Hiển thị trang không có quyền truy cập

Các action chính:

```text
Login - GET
Login - POST
Logout
AccessDenied
```

Khi đăng nhập đúng, hệ thống tạo Claims:

```csharp
var claims = new List<Claim>
{
    new Claim(ClaimTypes.Name, user.Username),
    new Claim(ClaimTypes.Role, user.Role),
    new Claim("FullName", user.FullName)
};
```

---

## 10. Phân quyền người dùng

Dự án phân quyền theo cột `Role` trong bảng `Users`.

| Role | Ý nghĩa |
|---|---|
| Admin | Quản trị viên, có quyền cao nhất |
| Editor | Biên tập viên, được vào một số trang quản trị |
| User | Người dùng thường, không được vào Admin Panel |

---

## 11. Chặn truy cập trang quản trị

Các Controller quản trị được gắn `[Authorize]` hoặc `[Authorize(Roles = "...")]`.

Ví dụ chỉ cần đăng nhập:

```csharp
[Authorize]
public class CategoryController : Controller
{
}
```

Ví dụ chỉ cho Admin và Editor vào:

```csharp
[Authorize(Roles = "Admin,Editor")]
public class CategoryController : Controller
{
}
```

Ví dụ chỉ cho Admin vào phần quản lý người dùng:

```csharp
[Authorize(Roles = "Admin")]
public class UserController : Controller
{
}
```

---

## 12. Chặn tài khoản User vào Admin Panel

Trong `AccountController`, tài khoản có Role `User` bị chặn không cho vào trang quản trị.

Logic kiểm tra:

```csharp
if (user.Role != "Admin" && user.Role != "Editor")
{
    ModelState.AddModelError("", "Tài khoản này không có quyền truy cập trang quản trị");
    return View(model);
}
```

Kết quả:

- `admin / 123 / Admin` vào được Admin Panel
- `editor01 / 123 / Editor` vào được một số trang quản trị
- `use01 / 123 / User` không được vào Admin Panel

---

## 13. Validation dữ liệu

Buổi 5 đã thêm validation cho các form nhập liệu.

Các kỹ thuật đã dùng:

- `[Required]`
- `[StringLength]`
- `ModelState.IsValid`
- `asp-validation-for`
- `asp-validation-summary`

Ví dụ trong Entity `Category`:

```csharp
[Required(ErrorMessage = "Tên danh mục không được để trống")]
[StringLength(100, ErrorMessage = "Tên danh mục không được vượt quá 100 ký tự")]
public string Name { get; set; }

[StringLength(255, ErrorMessage = "Mô tả không được vượt quá 255 ký tự")]
public string? Description { get; set; }
```

Trong Controller:

```csharp
[HttpPost]
public IActionResult Create(Category model)
{
    if (!ModelState.IsValid)
    {
        return View(model);
    }

    if (string.IsNullOrWhiteSpace(model.Description))
    {
        model.Description = "";
    }

    _context.Categories.Add(model);
    _context.SaveChanges();

    TempData["SuccessMessage"] = "Thêm thành công";
    return RedirectToAction("Index");
}
```

---

## 14. Validation trên giao diện Razor View

Trong View, dự án sử dụng:

```cshtml
<div asp-validation-summary="All" class="text-danger mb-3"></div>
```

Ví dụ hiển thị lỗi cho trường `Name`:

```cshtml
<input asp-for="Name" class="form-control" />
<span asp-validation-for="Name" class="text-danger"></span>
```

Khi người dùng bỏ trống tên danh mục, hệ thống hiển thị lỗi:

```text
Tên danh mục không được để trống
```

---

## 15. Các chức năng đã test

| STT | Nội dung test | Kết quả mong muốn |
|---|---|---|
| 1 | Vào `/Category` khi chưa đăng nhập | Chuyển về `/Account/Login` |
| 2 | Vào `/Account/Login` | Hiện form đăng nhập |
| 3 | Đăng nhập sai | Báo lỗi tài khoản hoặc mật khẩu không đúng |
| 4 | Đăng nhập đúng bằng Admin | Vào được trang quản trị |
| 5 | Đăng xuất | Quay về trang đăng nhập |
| 6 | Đăng nhập bằng Role User | Không được vào Admin Panel |
| 7 | Bỏ trống tên danh mục | Báo lỗi validation |
| 8 | Thêm danh mục đúng dữ liệu | Thêm thành công |
| 9 | Editor vào trang User/Create | Bị chặn quyền |
| 10 | Admin vào User/Create | Vào được trang quản lý người dùng |

---

## 16. Một số lỗi đã gặp và cách xử lý

### 16.1. Lỗi service collection read-only

Lỗi:

```text
The service collection cannot be modified because it is read-only.
```

Nguyên nhân:

Đặt `builder.Services.AddAuthentication(...)` sau dòng:

```csharp
var app = builder.Build();
```

Cách xử lý:

Đưa toàn bộ `builder.Services...` lên trước:

```csharp
var app = builder.Build();
```

### 16.2. Lỗi Authorize đặt sai vị trí

Lỗi:

```text
Attribute 'Authorize' is not valid on this declaration type.
```

Nguyên nhân:

Đặt `[Authorize]` trên biến hoặc sai vị trí.

Cách xử lý:

Đặt `[Authorize]` ngay trên class Controller hoặc trên action:

```csharp
[Authorize]
public class OrderController : Controller
{
}
```

### 16.3. Lỗi lưu danh mục bị NULL Description

Lỗi:

```text
Cannot insert the value NULL into column 'Description'
```

Nguyên nhân:

Database không cho cột `Description` nhận giá trị NULL.

Cách xử lý nhanh:

```csharp
if (string.IsNullOrWhiteSpace(model.Description))
{
    model.Description = "";
}
```

---

## 17. Kết quả đạt được sau Buổi 5

Sau Buổi 5, dự án đã có:

- Trang đăng nhập Admin
- Chức năng đăng xuất
- Cookie Authentication
- Claims lưu thông tin người dùng
- Phân quyền theo Role
- Chặn người chưa đăng nhập vào trang quản trị
- Chặn tài khoản Role User vào Admin Panel
- Chặn quyền một số chức năng chỉ dành cho Admin
- Validation form nhập liệu
- Hiển thị lỗi validation trên giao diện
- Hệ thống quản trị an toàn và hoàn thiện hơn so với Buổi 4

---

## 18. Hướng dẫn chạy dự án

Bước 1: Clone project từ GitHub:

```bash
git clone https://github.com/minhtri404/asp..git
```

Bước 2: Mở Solution:

```text
TriCMS_Solution.sln
```

Bước 3: Kiểm tra chuỗi kết nối database trong:

```text
CMS.Backend/appsettings.json
```

Bước 4: Chạy database nếu cần:

```powershell
Update-Database
```

Bước 5: Chạy project:

```text
CMS.Backend
```

Bước 6: Truy cập:

```text
http://localhost:5000/Account/Login
```

---

## 19. Tài khoản test

```text
Admin:
Username: admin
Password: 123
Role: Admin

Editor:
Username: editor01
Password: 123
Role: Editor

User:
Username: use01
Password: 123
Role: User
```

Lưu ý: mật khẩu nhập vào phải giống giá trị trong cột `PasswordHash` của bảng `Users`.

---

## 20. Lệnh GitHub cho Buổi 5

```bash
git checkout buoi-5
git add .
git commit -m "Hoan thien dang nhap phan quyen va validation buoi 5"
git push -u origin buoi-5
```

Nếu nhánh đã có upstream:

```bash
git push
```

---

## 21. Định hướng Buổi 6

Sau Buổi 5, dự án có thể tiếp tục phát triển Buổi 6 với các nội dung:

- Xây dựng WebAPI RESTful Service
- Tạo API lấy danh sách bài viết
- Tạo API lấy chi tiết bài viết
- Tạo API thêm, sửa, xóa dữ liệu bằng HTTP Method
- Trả dữ liệu dạng JSON
- Kiểm tra API bằng Postman
- Chuẩn bị kết nối Frontend ReactJS với Backend API

---

## 22. Tác giả

```text
Trương Minh Trí
MSSV: 2123110137
Lớp: CCQ2311D
```
