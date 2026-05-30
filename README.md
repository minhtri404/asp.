# TriCMS - README Buổi 4

## 1. Thông tin dự án

**Tên dự án:** TriCMS - Hệ thống quản lý nội dung ASP.NET Core MVC  
**Môn học:** Chuyên đề ASP.NET  
**Sinh viên:** Trương Minh Trí  
**MSSV:** 2123110137  
**Lớp:** CCQ2311D  

TriCMS là hệ thống quản lý nội dung được xây dựng bằng ASP.NET Core MVC, Entity Framework Core và SQL Server. Dự án được phát triển theo từng buổi học, trong đó Buổi 4 tập trung vào xây dựng giao diện quản trị Admin Panel và hoàn thiện các chức năng quản lý cơ bản.

---

## 2. Mục tiêu Buổi 4

Buổi 4 tập trung vào việc xây dựng giao diện quản trị cho hệ thống bằng ASP.NET Core MVC.

Mục tiêu chính:

- Xây dựng giao diện Admin Panel
- Tạo Layout dùng chung cho trang quản trị
- Tạo menu điều hướng giữa các chức năng
- Hiển thị dữ liệu bằng Razor View
- Hoàn thiện chức năng thêm, sửa, xóa dữ liệu cơ bản
- Áp dụng thông báo sau khi thao tác thành công
- Tổ chức giao diện quản trị rõ ràng, dễ sử dụng

---

## 3. Nội dung đã thực hiện trong Buổi 4

Trong Buổi 4, dự án đã hoàn thành các nội dung sau:

- Tạo file Layout Admin dùng chung
- Thiết kế giao diện quản trị bằng Bootstrap
- Tạo thanh menu điều hướng các chức năng quản lý
- Áp dụng Layout Admin cho các trang quản trị
- Hoàn thiện giao diện danh sách dữ liệu
- Tạo nút thêm mới, sửa và xóa
- Tạo form thêm mới dữ liệu
- Tạo form chỉnh sửa dữ liệu
- Xử lý xóa dữ liệu
- Hiển thị thông báo thao tác thành công bằng TempData

---

## 4. Công nghệ sử dụng

Các công nghệ được sử dụng trong Buổi 4:

- ASP.NET Core MVC
- Entity Framework Core
- SQL Server
- Razor View
- Bootstrap 5
- Bootstrap Icons
- HTML
- CSS
- C#
- Git và GitHub

---

## 5. Cấu trúc thư mục liên quan đến Buổi 4

```text
CMS.Backend
│
├── Controllers
│   ├── CategoryController.cs
│   ├── PostController.cs
│   ├── UserController.cs
│   ├── CategoryProductController.cs
│   ├── ProductController.cs
│   ├── CustomerController.cs
│   ├── OrderController.cs
│   └── OrderDetailController.cs
│
├── Views
│   ├── Shared
│   │   └── _LayoutAdmin.cshtml
│   │
│   ├── Category
│   │   ├── Index.cshtml
│   │   ├── Create.cshtml
│   │   └── Edit.cshtml
│   │
│   ├── Post
│   │   ├── Index.cshtml
│   │   ├── Create.cshtml
│   │   ├── Edit.cshtml
│   │   └── Details.cshtml
│   │
│   ├── User
│   │   ├── Index.cshtml
│   │   ├── Create.cshtml
│   │   └── Edit.cshtml
│   │
│   ├── CategoryProduct
│   │   └── Index.cshtml
│   │
│   ├── Product
│   │   └── Index.cshtml
│   │
│   ├── Customer
│   │   └── Index.cshtml
│   │
│   ├── Order
│   │   └── Index.cshtml
│   │
│   └── OrderDetail
│       └── Index.cshtml
│
├── Views
│   ├── _ViewImports.cshtml
│   └── _ViewStart.cshtml
│
└── wwwroot
```

---

## 6. Chức năng đã hoàn thành

## 6.1. Giao diện Admin Panel

Đã tạo giao diện quản trị riêng cho hệ thống.

Giao diện Admin Panel gồm:

- Khu vực menu điều hướng
- Khu vực nội dung chính
- Giao diện bảng dữ liệu
- Nút thao tác thêm, sửa, xóa
- Thông báo thao tác thành công

File Layout Admin:

```text
Views/Shared/_LayoutAdmin.cshtml
```

Layout Admin được sử dụng trong các trang quản trị bằng đoạn code:

```cshtml
@{
    Layout = "_LayoutAdmin";
}
```

---

## 6.2. Quản lý danh mục bài viết

Chức năng quản lý danh mục bài viết đã hoàn thành các thao tác cơ bản:

- Xem danh sách danh mục
- Thêm danh mục mới
- Sửa thông tin danh mục
- Xóa danh mục
- Hiển thị thông báo sau khi thêm, sửa, xóa

Các file liên quan:

```text
Controllers/CategoryController.cs
Views/Category/Index.cshtml
Views/Category/Create.cshtml
Views/Category/Edit.cshtml
```

Thông báo thao tác:

```csharp
TempData["SuccessMessage"] = "Thêm thành công";
TempData["SuccessMessage"] = "Sửa thành công";
TempData["SuccessMessage"] = "Xóa thành công";
```

---

## 6.3. Quản lý bài viết

Chức năng quản lý bài viết đã hoàn thành:

- Xem danh sách bài viết
- Xem chi tiết bài viết
- Thêm bài viết mới
- Sửa bài viết
- Xóa bài viết
- Chọn danh mục cho bài viết
- Hiển thị ngày đăng bài viết
- Hiển thị ảnh đại diện bài viết

Các file liên quan:

```text
Controllers/PostController.cs
Views/Post/Index.cshtml
Views/Post/Create.cshtml
Views/Post/Edit.cshtml
Views/Post/Details.cshtml
```

Trong chức năng bài viết có sử dụng `Include()` để lấy dữ liệu danh mục liên kết:

```csharp
var posts = _context.Posts
    .Include(p => p.Category)
    .OrderByDescending(p => p.CreatedDate)
    .ToList();
```

---

## 6.4. Quản lý người dùng

Chức năng quản lý người dùng đã hoàn thành:

- Xem danh sách người dùng
- Thêm người dùng mới
- Sửa thông tin người dùng
- Xóa người dùng
- Hiển thị quyền của người dùng
- Không hiển thị mật khẩu trực tiếp trên giao diện danh sách

Các file liên quan:

```text
Controllers/UserController.cs
Views/User/Index.cshtml
Views/User/Create.cshtml
Views/User/Edit.cshtml
```

---

## 6.5. Các trang danh sách khác

Ngoài các chức năng chính, hệ thống cũng đã có giao diện danh sách cho các phần:

- Danh mục sản phẩm
- Sản phẩm
- Khách hàng
- Đơn hàng
- Chi tiết đơn hàng

Các đường dẫn kiểm tra:

```text
/CategoryProduct
/Product
/Customer
/Order
/OrderDetail
```

---

## 7. Danh sách Controller

| STT | Controller | Chức năng |
|---|---|---|
| 1 | CategoryController | Quản lý danh mục bài viết |
| 2 | PostController | Quản lý bài viết |
| 3 | UserController | Quản lý người dùng |
| 4 | CategoryProductController | Quản lý danh mục sản phẩm |
| 5 | ProductController | Quản lý sản phẩm |
| 6 | CustomerController | Quản lý khách hàng |
| 7 | OrderController | Quản lý đơn hàng |
| 8 | OrderDetailController | Quản lý chi tiết đơn hàng |

---

## 8. Danh sách View chính

| Chức năng | View |
|---|---|
| Danh mục bài viết | Views/Category/Index.cshtml |
| Thêm danh mục | Views/Category/Create.cshtml |
| Sửa danh mục | Views/Category/Edit.cshtml |
| Bài viết | Views/Post/Index.cshtml |
| Thêm bài viết | Views/Post/Create.cshtml |
| Sửa bài viết | Views/Post/Edit.cshtml |
| Chi tiết bài viết | Views/Post/Details.cshtml |
| Người dùng | Views/User/Index.cshtml |
| Thêm người dùng | Views/User/Create.cshtml |
| Sửa người dùng | Views/User/Edit.cshtml |
| Khách hàng | Views/Customer/Index.cshtml |
| Đơn hàng | Views/Order/Index.cshtml |
| Chi tiết đơn hàng | Views/OrderDetail/Index.cshtml |
| Layout Admin | Views/Shared/_LayoutAdmin.cshtml |

---

## 9. Các đường dẫn kiểm tra chức năng

| Chức năng | Đường dẫn |
|---|---|
| Quản lý danh mục | /Category |
| Thêm danh mục | /Category/Create |
| Sửa danh mục | /Category/Edit/1 |
| Quản lý bài viết | /Post |
| Thêm bài viết | /Post/Create |
| Sửa bài viết | /Post/Edit/1 |
| Chi tiết bài viết | /Post/Details/1 |
| Quản lý người dùng | /User |
| Thêm người dùng | /User/Create |
| Sửa người dùng | /User/Edit/1 |
| Danh mục sản phẩm | /CategoryProduct |
| Sản phẩm | /Product |
| Khách hàng | /Customer |
| Đơn hàng | /Order |
| Chi tiết đơn hàng | /OrderDetail |

---

## 10. Một số kỹ thuật đã áp dụng

Trong Buổi 4, dự án đã áp dụng các kỹ thuật:

- Sử dụng Layout dùng chung trong Razor View
- Sử dụng Tag Helper với `asp-controller`, `asp-action`, `asp-route-id`
- Sử dụng form nhập liệu với phương thức POST
- Sử dụng Entity Framework Core để thêm, sửa, xóa dữ liệu
- Sử dụng `TempData` để hiển thị thông báo
- Sử dụng Bootstrap để thiết kế giao diện
- Sử dụng `Include()` để lấy dữ liệu liên kết
- Sử dụng `SelectList` để hiển thị danh sách chọn danh mục

---

## 11. Lỗi đã gặp và cách xử lý

## 11.1. Lỗi Tag Helper không hoạt động

Biểu hiện:

```html
<a asp-action="Create">
```

không tự sinh ra đường dẫn.

Cách xử lý:

Thêm dòng sau vào file `Views/_ViewImports.cshtml`:

```cshtml
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
```

---

## 11.2. Lỗi trang vẫn dùng giao diện cũ

Biểu hiện:

Trang vẫn hiển thị thanh menu ngang cũ, chưa dùng Admin Panel.

Cách xử lý:

Thêm vào đầu View:

```cshtml
@{
    Layout = "_LayoutAdmin";
}
```

---

## 11.3. Lỗi không hiển thị dữ liệu liên kết

Biểu hiện:

Trang bài viết không hiển thị tên danh mục.

Cách xử lý:

Thêm namespace:

```csharp
using Microsoft.EntityFrameworkCore;
```

và sử dụng:

```csharp
.Include(p => p.Category)
```

---

## 12. Kết quả đạt được sau Buổi 4

Sau khi hoàn thành Buổi 4, dự án đã đạt được:

- Có giao diện Admin Panel
- Có Layout Admin dùng chung
- Có menu quản trị rõ ràng
- Có danh sách dữ liệu cho các bảng chính
- Có chức năng thêm, sửa, xóa cho danh mục
- Có chức năng thêm, sửa, xóa cho bài viết
- Có chức năng thêm, sửa, xóa cho người dùng
- Có thông báo sau khi thao tác thành công
- Giao diện quản trị dễ sử dụng hơn
- Dự án sẵn sàng để tiếp tục phát triển Buổi 5

---

## 13. Hướng dẫn chạy dự án

Bước 1: Clone project từ GitHub:

```bash
git clone https://github.com/minhtri404/asp..git
```

Bước 2: Mở solution trong Visual Studio:

```text
TriCMS_Solution.sln
```

Bước 3: Kiểm tra file cấu hình kết nối database:

```text
CMS.Backend/appsettings.json
```

Bước 4: Chạy migration nếu máy chưa có database:

```bash
Update-Database
```

Bước 5: Chạy project:

```text
CMS.Backend
```

Bước 6: Truy cập trình duyệt:

```text
http://localhost:5000
```

hoặc địa chỉ localhost mà Visual Studio cung cấp.

---

## 14. Lệnh GitHub cho Buổi 4

Tạo nhánh Buổi 4:

```bash
git checkout -b buoi-4
```

Thêm toàn bộ thay đổi:

```bash
git add .
```

Commit code:

```bash
git commit -m "Hoan thien giao dien admin va CRUD co ban buoi 4"
```

Đẩy code lên GitHub:

```bash
git push -u origin buoi-4
```

---

## 15. Định hướng Buổi 5

Sau Buổi 4, dự án có thể tiếp tục phát triển Buổi 5 với các nội dung:

- Validation dữ liệu đầu vào
- Kiểm tra dữ liệu form
- Bắt lỗi khi người dùng nhập thiếu thông tin
- Xây dựng đăng nhập Admin
- Phân quyền người dùng
- Bảo mật trang quản trị
- Chặn truy cập khi người dùng chưa đăng nhập

---

## 16. Tác giả

```text
Trương Minh Trí
MSSV: 2123110137
Lớp: CCQ2311D
```
