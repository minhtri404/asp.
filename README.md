# TriCMS - README Tổng quan sau 6 buổi

## 1. Giới thiệu dự án

**TriCMS** là hệ thống quản lý nội dung được xây dựng bằng **ASP.NET Core MVC**, **Entity Framework Core** và **SQL Server**. Dự án được phát triển theo từng buổi học của môn Chuyên đề ASP.NET, từ bước khởi tạo cấu trúc Solution, thiết kế Entity, kết nối database, truy vấn dữ liệu bằng LINQ, xây dựng giao diện quản trị MVC, xử lý CRUD, kiểm tra dữ liệu và chuẩn bị nền tảng cho bảo mật/API.

Mục tiêu của dự án là xây dựng một hệ thống CMS cơ bản có thể quản lý:

- Danh mục bài viết
- Bài viết
- Người dùng
- Danh mục sản phẩm
- Sản phẩm
- Khách hàng
- Đơn hàng
- Chi tiết đơn hàng

Sau 6 buổi, dự án đã có nền tảng Backend MVC tương đối đầy đủ, có database thật, có các bảng chính, có giao diện quản trị, có truy vấn LINQ, có chức năng thêm/sửa/xóa cơ bản và có định hướng phát triển tiếp sang Web API, ReactJS và phân quyền.

---

## 2. Thông tin sinh viên

| Nội dung | Thông tin |
|---|---|
| Họ và tên | Trương Minh Trí |
| MSSV | 2123110137 |
| Lớp | CCQ2311D |
| Môn học | Chuyên đề ASP.NET |
| Tên dự án | TriCMS |
| Công nghệ chính | ASP.NET Core MVC, Entity Framework Core, SQL Server |

---

## 3. Công nghệ sử dụng

| Công nghệ | Mục đích sử dụng |
|---|---|
| ASP.NET Core MVC | Xây dựng website theo mô hình Model - View - Controller |
| C# | Ngôn ngữ lập trình chính |
| Entity Framework Core | Kết nối và thao tác dữ liệu với SQL Server |
| SQL Server | Lưu trữ dữ liệu thật của hệ thống |
| SQL Server Management Studio | Quản lý database và nhập dữ liệu mẫu |
| LINQ | Truy vấn, lọc, tìm kiếm và sắp xếp dữ liệu |
| Bootstrap 5 | Thiết kế giao diện quản trị dễ nhìn |
| Git | Quản lý phiên bản mã nguồn |
| GitHub | Lưu trữ source code theo từng nhánh/buổi |

---

## 4. Cấu trúc Solution

```text
TriCMS_Solution
│
├── CMS.data
│   ├── Entities
│   │   ├── Category.cs
│   │   ├── Post.cs
│   │   ├── User.cs
│   │   ├── CategoryProduct.cs
│   │   ├── Product.cs
│   │   ├── Customer.cs
│   │   ├── Order.cs
│   │   └── OrderDetail.cs
│   │
│   ├── ApplicationDbContext.cs
│   └── Migrations
│
└── CMS.Backend
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
    │   ├── Category
    │   ├── Post
    │   ├── User
    │   ├── CategoryProduct
    │   ├── Product
    │   ├── Customer
    │   ├── Order
    │   ├── OrderDetail
    │   └── Shared
    │       └── _Layout.cshtml
    │
    ├── wwwroot
    │   └── img
    │
    ├── appsettings.json
    └── Program.cs
```

---

## 5. Kết quả đã làm được sau 6 buổi

## Buổi 1 - Khởi tạo cấu trúc dự án

### Mục tiêu

- Làm quen với ASP.NET Core MVC.
- Tạo Solution nhiều project.
- Tạo các Entity đầu tiên.
- Hiển thị dữ liệu mẫu trên giao diện.

### Đã hoàn thành

- Tạo Solution `TriCMS_Solution`.
- Tạo project `CMS.data` để chứa Entity.
- Tạo project `CMS.Backend` để làm Backend MVC.
- Kết nối `CMS.Backend` với `CMS.data` bằng Project Reference.
- Tạo các Entity chính:
  - `Category`
  - `Post`
  - `User`
  - `CategoryProduct`
  - `Product`
  - `Customer`
  - `Order`
  - `OrderDetail`
- Tạo Controller và View ban đầu cho một số đối tượng.
- Hiển thị dữ liệu mẫu trực tiếp trong Controller.

### Ý nghĩa

Buổi 1 giúp dự án có nền móng ban đầu, hiểu được cách chia project, cách tạo Entity, Controller và View trong ASP.NET Core MVC.

---

## Buổi 2 - Kết nối database bằng Entity Framework Core

### Mục tiêu

- Cài đặt Entity Framework Core.
- Tạo `ApplicationDbContext`.
- Kết nối SQL Server.
- Chạy Migration tạo database.
- Thay dữ liệu giả bằng dữ liệu thật.

### Đã hoàn thành

- Cài đặt các package Entity Framework Core:
  - `Microsoft.EntityFrameworkCore.SqlServer`
  - `Microsoft.EntityFrameworkCore.Tools`
  - `Microsoft.EntityFrameworkCore.Design`
- Tạo file `ApplicationDbContext.cs`.
- Cấu hình chuỗi kết nối trong `appsettings.json`.
- Đăng ký `ApplicationDbContext` trong `Program.cs`.
- Chạy Migration:

```powershell
Add-Migration InitialCreate -StartupProject CMS.Backend
Update-Database -StartupProject CMS.Backend
```

- Tạo database `TriCMS_DB` trong SQL Server.
- Sinh các bảng chính từ Entity.
- Nhập dữ liệu thật vào SQL Server.
- Sửa Controller để lấy dữ liệu từ database.
- Hiển thị dữ liệu thật lên giao diện MVC.

### Danh sách bảng đã tạo

| STT | Bảng | Chức năng |
|---:|---|---|
| 1 | `Categories` | Lưu danh mục bài viết |
| 2 | `Posts` | Lưu bài viết |
| 3 | `Users` | Lưu người dùng |
| 4 | `CategoriesProducts` | Lưu danh mục sản phẩm |
| 5 | `Products` | Lưu sản phẩm |
| 6 | `Customers` | Lưu khách hàng |
| 7 | `Orders` | Lưu đơn hàng |
| 8 | `OrderDetails` | Lưu chi tiết đơn hàng |
| 9 | `__EFMigrationsHistory` | Lưu lịch sử Migration |

### Ý nghĩa

Buổi 2 là bước chuyển quan trọng từ dữ liệu giả sang dữ liệu thật, giúp hệ thống có database và có thể phát triển thành ứng dụng thực tế.

---

## Buổi 3 - LINQ, Include và CRUD cơ bản

### Mục tiêu

- Sử dụng LINQ để truy vấn dữ liệu.
- Dùng `Where`, `OrderBy`, `FirstOrDefault`.
- Dùng `Include` và `ThenInclude` để lấy dữ liệu liên kết.
- Tạo CRUD cơ bản cho Category.

### Đã hoàn thành

- Nâng cấp `PostController`:
  - Dùng `Include(p => p.Category)` để lấy tên danh mục bài viết.
  - Tìm kiếm bài viết theo tiêu đề hoặc nội dung.
  - Sắp xếp bài viết mới nhất lên đầu.
  - Xem chi tiết bài viết bằng `FirstOrDefault()`.

- Nâng cấp `ProductController`:
  - Dùng `Include(p => p.CategoryProduct)`.
  - Tìm kiếm sản phẩm theo tên/mô tả.
  - Lọc sản phẩm theo giá.
  - Sắp xếp giá tăng dần/giảm dần.

- Nâng cấp `CustomerController`:
  - Tìm kiếm khách hàng theo họ tên, email, số điện thoại, địa chỉ.

- Nâng cấp `OrderController`:
  - Dùng `Include(o => o.Customer)` để hiện tên khách hàng.

- Nâng cấp `OrderDetailController`:
  - Dùng `Include(od => od.Order)`.
  - Dùng `ThenInclude(o => o.Customer)`.
  - Dùng `Include(od => od.Product)`.
  - Hiển thị tên khách hàng, tên sản phẩm và thành tiền.

- Hoàn thiện CRUD cho `Category`:
  - Thêm danh mục.
  - Sửa danh mục.
  - Xóa danh mục.
  - Tìm kiếm danh mục.
  - Thông báo thành công sau khi thêm/sửa/xóa.

### Các kỹ thuật LINQ đã dùng

| Kỹ thuật | Mục đích |
|---|---|
| `Where()` | Lọc, tìm kiếm dữ liệu |
| `OrderBy()` | Sắp xếp tăng dần |
| `OrderByDescending()` | Sắp xếp giảm dần |
| `FirstOrDefault()` | Lấy một bản ghi theo điều kiện |
| `Include()` | Lấy dữ liệu liên kết |
| `ThenInclude()` | Lấy dữ liệu liên kết nhiều cấp |

### Ý nghĩa

Buổi 3 giúp hệ thống không chỉ hiển thị dữ liệu mà còn biết xử lý dữ liệu linh hoạt hơn, có tìm kiếm, lọc, sắp xếp và CRUD cơ bản.

---

## Buổi 4 - Giao diện quản trị MVC

### Mục tiêu

- Nâng cấp giao diện quản trị.
- Tạo layout dùng chung.
- Tạo thanh điều hướng.
- Chuẩn hóa View cho các trang quản lý.

### Đã hoàn thành

- Tạo file layout dùng chung:

```text
Views/Shared/_Layout.cshtml
```

- Tạo thanh menu điều hướng trên website.
- Bổ sung Bootstrap để giao diện dễ nhìn hơn.
- Các trang có thể bấm chuyển nhanh:
  - `/Category`
  - `/Post`
  - `/User`
  - `/CategoryProduct`
  - `/Product`
  - `/Customer`
  - `/Order`
  - `/OrderDetail`
- Cải thiện giao diện bảng dữ liệu.
- Cải thiện giao diện card cho bài viết và sản phẩm.
- Thêm nút thao tác như:
  - Thêm
  - Sửa
  - Xóa
  - Tìm kiếm
  - Làm mới

### Ý nghĩa

Buổi 4 giúp hệ thống có giao diện quản trị rõ ràng hơn, dễ thao tác hơn, không cần gõ đường dẫn thủ công từng trang.

---

## Buổi 5 - Validation, thông báo và xử lý dữ liệu an toàn hơn

### Mục tiêu

- Bắt đầu kiểm soát dữ liệu nhập.
- Không hiển thị dữ liệu nhạy cảm.
- Thông báo kết quả sau khi thao tác.
- Chuẩn bị nền tảng cho bảo mật và phân quyền.

### Đã hoàn thành

- Không hiển thị mật khẩu ở giao diện `User` và `Customer`.
- Thêm thông báo bằng `TempData`.
- Sau khi thêm danh mục thành công, hiển thị:

```text
Thêm danh mục thành công!
```

- Sau khi sửa danh mục thành công, hiển thị:

```text
Sửa danh mục thành công!
```

- Sau khi xóa danh mục thành công, hiển thị:

```text
Xóa danh mục thành công!
```

- Tạo trang xác nhận xóa trước khi xóa dữ liệu.
- Lưu ý khóa ngoại khi xóa danh mục đang có bài viết liên kết.
- Bắt đầu hình thành thói quen kiểm tra dữ liệu trước khi thao tác.

### Ý nghĩa

Buổi 5 giúp hệ thống an toàn và thân thiện hơn với người dùng. Khi thao tác thêm/sửa/xóa, người dùng biết rõ hành động đã thành công hay chưa.

---

## Buổi 6 - Chuẩn bị Web API và hướng phát triển Full-stack

### Mục tiêu

- Chuẩn bị nền tảng để tách Backend và Frontend.
- Định hướng xây dựng API cho ReactJS.
- Chuẩn hóa dữ liệu trả về.
- Chuẩn bị cho các chức năng nâng cao.

### Định hướng đã chuẩn bị

Dự án hiện tại đã có nền Backend MVC và database đầy đủ, nên có thể tiếp tục phát triển Web API cho các đối tượng:

- API danh sách bài viết.
- API chi tiết bài viết.
- API danh sách danh mục.
- API danh sách sản phẩm.
- API chi tiết sản phẩm.
- API khách hàng.
- API đơn hàng.

Các API dự kiến có thể phát triển:

| API | Mục đích |
|---|---|
| `GET /api/posts` | Lấy danh sách bài viết |
| `GET /api/posts/{id}` | Lấy chi tiết bài viết |
| `GET /api/categories` | Lấy danh mục bài viết |
| `GET /api/products` | Lấy danh sách sản phẩm |
| `GET /api/products/{id}` | Lấy chi tiết sản phẩm |
| `GET /api/orders` | Lấy danh sách đơn hàng |
| `GET /api/orderdetails` | Lấy chi tiết đơn hàng |

### Ý nghĩa

Buổi 6 giúp dự án sẵn sàng mở rộng sang mô hình Full-stack, trong đó ASP.NET Core đóng vai trò Backend API và ReactJS đóng vai trò Frontend.

---

## 6. Chi tiết các bảng trong hệ thống

## 6.1. Bảng `Categories`

Dùng để quản lý danh mục bài viết.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã danh mục |
| Name | Tên danh mục |
| Description | Mô tả danh mục |

Chức năng đã làm:

- Hiển thị danh sách.
- Tìm kiếm danh mục.
- Thêm danh mục.
- Sửa danh mục.
- Xóa danh mục.
- Hiển thị thông báo sau thao tác.

---

## 6.2. Bảng `Posts`

Dùng để quản lý bài viết.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã bài viết |
| Title | Tiêu đề |
| Content | Nội dung |
| ImageUrl | Đường dẫn hình ảnh |
| CreatedDate | Ngày tạo |
| CategoryId | Mã danh mục |

Chức năng đã làm:

- Hiển thị danh sách bài viết.
- Hiển thị tên danh mục bằng `Include`.
- Tìm kiếm bài viết.
- Sắp xếp bài viết mới nhất.
- Xem chi tiết bài viết.
- Hiển thị hình ảnh bài viết.

---

## 6.3. Bảng `Users`

Dùng để quản lý người dùng hệ thống.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã người dùng |
| Username | Tên đăng nhập |
| PasswordHash | Mật khẩu |
| FullName | Họ tên |
| Role | Vai trò |

Chức năng đã làm:

- Hiển thị danh sách người dùng.
- Không hiển thị mật khẩu lên giao diện.
- Phân biệt vai trò bằng badge.

---

## 6.4. Bảng `CategoriesProducts`

Dùng để quản lý danh mục sản phẩm.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã danh mục sản phẩm |
| Name | Tên danh mục |
| Description | Mô tả |

Chức năng đã làm:

- Hiển thị danh sách danh mục sản phẩm.
- Làm dữ liệu liên kết cho bảng `Products`.

---

## 6.5. Bảng `Products`

Dùng để quản lý sản phẩm.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã sản phẩm |
| Name | Tên sản phẩm |
| Description | Mô tả |
| Price | Giá |
| StockQuantity | Tồn kho |
| ImageUrl | Ảnh sản phẩm |
| CategoryProductId | Mã danh mục sản phẩm |

Chức năng đã làm:

- Hiển thị sản phẩm dạng card.
- Hiển thị hình ảnh sản phẩm.
- Hiển thị tên danh mục sản phẩm bằng `Include`.
- Tìm kiếm sản phẩm.
- Lọc sản phẩm theo khoảng giá.
- Sắp xếp giá tăng dần/giảm dần.

---

## 6.6. Bảng `Customers`

Dùng để quản lý khách hàng.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã khách hàng |
| FullName | Họ tên |
| Email | Email |
| Phone | Số điện thoại |
| Address | Địa chỉ |
| Password | Mật khẩu |

Chức năng đã làm:

- Hiển thị danh sách khách hàng.
- Tìm kiếm khách hàng.
- Không hiển thị mật khẩu lên giao diện.

---

## 6.7. Bảng `Orders`

Dùng để quản lý đơn hàng.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã đơn hàng |
| OrderDate | Ngày đặt |
| CustomerId | Mã khách hàng |
| Status | Trạng thái |
| Notes | Ghi chú |

Quy ước trạng thái:

| Status | Ý nghĩa |
|---:|---|
| 0 | Chờ duyệt |
| 1 | Đang giao |
| 2 | Đã xong |

Chức năng đã làm:

- Hiển thị danh sách đơn hàng.
- Hiển thị tên khách hàng bằng `Include`.
- Hiển thị trạng thái đơn hàng bằng badge màu.
- Sắp xếp đơn hàng theo ngày đặt mới nhất.

---

## 6.8. Bảng `OrderDetails`

Dùng để quản lý chi tiết đơn hàng.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã chi tiết |
| OrderId | Mã đơn hàng |
| ProductId | Mã sản phẩm |
| Quantity | Số lượng |
| UnitPrice | Đơn giá |

Chức năng đã làm:

- Hiển thị chi tiết đơn hàng.
- Hiển thị ngày đặt hàng.
- Hiển thị tên khách hàng.
- Hiển thị tên sản phẩm.
- Tính thành tiền bằng công thức:

```text
Thành tiền = Quantity x UnitPrice
```

---

## 7. Các Controller đã hoàn thành

| Controller | Chức năng |
|---|---|
| `CategoryController` | Danh sách, tìm kiếm, thêm, sửa, xóa danh mục |
| `PostController` | Danh sách, tìm kiếm, chi tiết bài viết |
| `UserController` | Danh sách người dùng |
| `CategoryProductController` | Danh sách danh mục sản phẩm |
| `ProductController` | Danh sách, tìm kiếm, lọc, sắp xếp sản phẩm |
| `CustomerController` | Danh sách và tìm kiếm khách hàng |
| `OrderController` | Danh sách đơn hàng, hiển thị tên khách hàng |
| `OrderDetailController` | Chi tiết đơn hàng, hiển thị khách hàng và sản phẩm |

---

## 8. Các View đã hoàn thành

| View | Chức năng |
|---|---|
| `Views/Category/Index.cshtml` | Danh sách, tìm kiếm, thao tác danh mục |
| `Views/Category/Create.cshtml` | Form thêm danh mục |
| `Views/Category/Edit.cshtml` | Form sửa danh mục |
| `Views/Category/Delete.cshtml` | Xác nhận xóa danh mục |
| `Views/Post/Index.cshtml` | Danh sách và tìm kiếm bài viết |
| `Views/Post/Details.cshtml` | Chi tiết bài viết |
| `Views/User/Index.cshtml` | Danh sách người dùng |
| `Views/CategoryProduct/Index.cshtml` | Danh mục sản phẩm |
| `Views/Product/Index.cshtml` | Danh sách, tìm kiếm, lọc sản phẩm |
| `Views/Customer/Index.cshtml` | Danh sách và tìm kiếm khách hàng |
| `Views/Order/Index.cshtml` | Danh sách đơn hàng |
| `Views/OrderDetail/Index.cshtml` | Chi tiết đơn hàng |
| `Views/Shared/_Layout.cshtml` | Layout chung và thanh menu điều hướng |

---

## 9. Đường dẫn kiểm tra nhanh

| Chức năng | Đường dẫn |
|---|---|
| Danh mục | `/Category` |
| Thêm danh mục | `/Category/Create` |
| Sửa danh mục | `/Category/Edit/{id}` |
| Xóa danh mục | `/Category/Delete/{id}` |
| Bài viết | `/Post` |
| Chi tiết bài viết | `/Post/Details/{id}` |
| Người dùng | `/User` |
| Danh mục sản phẩm | `/CategoryProduct` |
| Sản phẩm | `/Product` |
| Khách hàng | `/Customer` |
| Đơn hàng | `/Order` |
| Chi tiết đơn hàng | `/OrderDetail` |

---

## 10. Các lỗi đã gặp và cách xử lý

### 10.1. Lỗi EF Core version không tương thích

Lỗi:

```text
Package Microsoft.EntityFrameworkCore.SqlServer 10.x is not compatible with net8.0
```

Cách xử lý:

- Vì project dùng `.NET 8`, cần cài EF Core bản `8.0.x`.

---

### 10.2. Lỗi hai project dùng EF Core khác version

Cách xử lý:

- Đồng bộ `CMS.data` và `CMS.Backend` về cùng phiên bản EF Core.

---

### 10.3. Lỗi Add-Migration bị Build failed

Cách xử lý:

- Kiểm tra Error List.
- Sửa lỗi build.
- Chạy lại Migration.

---

### 10.4. Lỗi không tìm thấy View

Cách xử lý:

- Tạo đúng folder View theo tên Controller.
- Ví dụ:

```text
CustomerController -> Views/Customer/Index.cshtml
```

---

### 10.5. Lỗi khóa ngoại khi nhập dữ liệu

Cách xử lý:

- Kiểm tra Id thật trong bảng cha trước khi nhập bảng con.

Ví dụ:

```sql
SELECT Id, Name FROM Products;
SELECT Id, Name FROM CategoriesProducts;
SELECT Id, Notes FROM Orders;
```

---

### 10.6. Lỗi không thêm được Category khi dùng ModelState

Cách xử lý:

- Nhận dữ liệu thủ công từ form bằng `string Name, string Description`.
- Tạo object `Category`.
- Lưu bằng `_context.Categories.Add(category)` và `_context.SaveChanges()`.

---

## 11. Hướng dẫn chạy Backend và Frontend

### 11.1. Chuẩn bị

- Visual Studio 2022 với workload **ASP.NET and web development**.
- .NET 8 SDK và SQL Server LocalDB.
- Node.js và npm để chạy Frontend.

Clone source code:

```bash
git clone https://github.com/minhtri404/asp..git
cd asp.
```

### 11.2. Chạy Backend bằng F5

1. Mở `TriCMS_Solution.sln` bằng Visual Studio 2022.
2. Trong Solution Explorer, nhấn chuột phải vào `CMS.Backend` và chọn **Set as Startup Project**.
3. Kiểm tra `DefaultConnection` trong `CMS.Backend/appsettings.json`. Cấu hình mặc định dùng SQL Server LocalDB với database `TriCMS_DB`.
4. Nếu database chưa được tạo, mở **Tools > NuGet Package Manager > Package Manager Console** và chạy:

```powershell
Update-Database -Project CMS.data -StartupProject CMS.Backend
```

5. Nhấn **F5** để chạy Backend.

Backend mặc định chạy tại `https://localhost:13766` hoặc `http://localhost:13767`. Giữ Backend đang chạy trong lúc sử dụng Frontend.

### 11.3. Chạy Frontend bằng npm start

Frontend ReactJS nằm trên nhánh `buoi7`. Chuyển sang nhánh này trước khi chạy:

```bash
git checkout buoi7
cd tricms-client
npm install
npm start
```

Mở địa chỉ Vite hiển thị trong terminal, thường là `http://localhost:5173`.

Frontend chuyển tiếp request `/api` tới Backend tại `http://localhost:13767`. Có thể đổi địa chỉ Backend bằng biến môi trường:

```powershell
$env:VITE_API_ORIGIN="http://localhost:13767"
npm start
```

---

## 12. Các nhánh GitHub nên có

| Nhánh | Nội dung |
|---|---|
| `main` | Nhánh tổng của dự án |
| `buoi-1` | Khởi tạo cấu trúc Solution, Entity, Controller, View mẫu |
| `buoi-2` | EF Core, Migration, SQL Server, dữ liệu thật |
| `buoi-3` | LINQ, Include, Search, CRUD Category |
| `buoi-4` | Giao diện quản trị MVC, Layout, Menu |
| `buoi-5` | Validation, thông báo, xử lý dữ liệu an toàn hơn |
| `buoi-6` | Chuẩn bị Web API và hướng phát triển Full-stack |
| `buoi7` | Hoàn thiện Backend Web API và Frontend ReactJS |

---

## 13. Lệnh Git cơ bản

```bash
git status
git add .
git commit -m "Cap nhat du an TriCMS"
git push
```

Tạo nhánh mới:

```bash
git checkout -b ten-nhanh
git push -u origin ten-nhanh
```

Chuyển nhánh:

```bash
git checkout ten-nhanh
```

---

## 14. Định hướng phát triển tiếp theo

Dự án có thể tiếp tục phát triển thêm:

- Hoàn thiện CRUD cho `Post`.
- Hoàn thiện CRUD cho `Product`.
- Dùng dropdown chọn danh mục khi thêm/sửa bài viết.
- Dùng dropdown chọn danh mục khi thêm/sửa sản phẩm.
- Thêm validation form.
- Thêm đăng nhập quản trị.
- Thêm phân quyền Admin, Editor, User.
- Xây dựng Web API.
- Kết nối ReactJS làm Frontend.
- Tối ưu giao diện Admin.
- Tách layout quản trị và layout người dùng.
- Bổ sung upload ảnh.
- Bổ sung dashboard thống kê.
