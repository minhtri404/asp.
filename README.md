# TriCMS - Hệ thống quản lý nội dung ASP.NET Core MVC

## 1. Giới thiệu dự án

TriCMS là hệ thống quản lý nội dung được xây dựng bằng **ASP.NET Core MVC** theo mô hình nhiều lớp. Dự án được phát triển theo từng buổi học, bắt đầu từ việc xây dựng cấu trúc Solution, tạo Entity, sau đó kết nối database thật bằng Entity Framework Core và SQL Server.

Dự án hướng đến mục tiêu xây dựng một hệ thống CMS cơ bản, có khả năng quản lý:

- Danh mục bài viết
- Bài viết
- Người dùng
- Danh mục sản phẩm
- Sản phẩm
- Khách hàng
- Đơn hàng
- Chi tiết đơn hàng

Đây là README tổng dùng cho nhánh chính của dự án, trình bày tổng quan cấu trúc, công nghệ, chức năng đã làm và định hướng phát triển tiếp theo.

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
| ASP.NET Core MVC | Xây dựng ứng dụng web theo mô hình Model - View - Controller |
| C# | Ngôn ngữ lập trình chính |
| Entity Framework Core | Kết nối và thao tác với cơ sở dữ liệu |
| SQL Server | Lưu trữ dữ liệu của hệ thống |
| SQL Server Management Studio | Quản lý database và nhập dữ liệu mẫu |
| Bootstrap 5 | Hỗ trợ xây dựng giao diện đẹp và dễ nhìn |
| Git | Quản lý phiên bản mã nguồn |
| GitHub | Lưu trữ và nộp bài theo từng nhánh |

---

## 4. Cấu trúc Solution

Dự án được tổ chức theo hướng tách lớp rõ ràng:

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

## 5. Ý nghĩa các project

### 5.1. Project `CMS.data`

Project `CMS.data` là lớp dữ liệu của hệ thống, chứa các Entity đại diện cho bảng trong database.

Các thành phần chính:

- `Entities`: chứa các class mô tả bảng dữ liệu.
- `ApplicationDbContext.cs`: lớp trung tâm kết nối Entity Framework Core với SQL Server.
- `Migrations`: chứa lịch sử tạo và cập nhật database.

### 5.2. Project `CMS.Backend`

Project `CMS.Backend` là lớp xử lý và giao diện quản trị, sử dụng ASP.NET Core MVC.

Các thành phần chính:

- `Controllers`: xử lý request và lấy dữ liệu từ database.
- `Views`: hiển thị dữ liệu ra giao diện.
- `wwwroot`: chứa file tĩnh như hình ảnh, CSS, JavaScript.
- `appsettings.json`: cấu hình chuỗi kết nối database.
- `Program.cs`: cấu hình dịch vụ và route cho ứng dụng.

---

## 6. Database sử dụng

Database của dự án:

```text
TriCMS_DB
```

Chuỗi kết nối trong `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=TriCMS_DB;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True"
  }
}
```

---

## 7. Entity Framework Core

Dự án sử dụng Entity Framework Core để làm việc với SQL Server theo hướng Code First.

Các package đã dùng:

| Package | Công dụng |
|---|---|
| Microsoft.EntityFrameworkCore.SqlServer | Kết nối SQL Server |
| Microsoft.EntityFrameworkCore.Tools | Chạy lệnh Migration |
| Microsoft.EntityFrameworkCore.Design | Hỗ trợ thiết kế database |

Các lệnh Migration đã sử dụng:

```powershell
Add-Migration InitialCreate -StartupProject CMS.Backend
```

```powershell
Update-Database -StartupProject CMS.Backend
```

---

## 8. Danh sách bảng trong database

| STT | Bảng | Chức năng |
|---:|---|---|
| 1 | `Categories` | Lưu danh mục bài viết |
| 2 | `Posts` | Lưu thông tin bài viết |
| 3 | `Users` | Lưu người dùng quản trị |
| 4 | `CategoriesProducts` | Lưu danh mục sản phẩm |
| 5 | `Products` | Lưu thông tin sản phẩm |
| 6 | `Customers` | Lưu thông tin khách hàng |
| 7 | `Orders` | Lưu thông tin đơn hàng |
| 8 | `OrderDetails` | Lưu chi tiết đơn hàng |
| 9 | `__EFMigrationsHistory` | Lưu lịch sử Migration |

---

## 9. Các bảng đã triển khai

### 9.1. Bảng `Categories`

Dùng để quản lý danh mục bài viết.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã danh mục |
| Name | Tên danh mục |
| Description | Mô tả danh mục |

Chức năng đã làm:

- Tạo Entity `Category`.
- Tạo bảng `Categories`.
- Nhập dữ liệu danh mục.
- Hiển thị danh sách danh mục tại `/Category`.

---

### 9.2. Bảng `Posts`

Dùng để quản lý bài viết.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã bài viết |
| Title | Tiêu đề bài viết |
| Content | Nội dung bài viết |
| ImageUrl | Đường dẫn hình ảnh |
| CreatedDate | Ngày tạo bài viết |
| CategoryId | Mã danh mục bài viết |

Chức năng đã làm:

- Tạo Entity `Post`.
- Tạo bảng `Posts`.
- Nhập dữ liệu bài viết.
- Gắn hình ảnh cho bài viết.
- Hiển thị danh sách bài viết tại `/Post`.
- Hiển thị chi tiết bài viết tại `/Post/Details/{id}`.

---

### 9.3. Bảng `Users`

Dùng để quản lý người dùng quản trị hệ thống.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã người dùng |
| Username | Tên đăng nhập |
| PasswordHash | Mật khẩu |
| FullName | Họ tên |
| Role | Vai trò |

Chức năng đã làm:

- Tạo Entity `User`.
- Tạo bảng `Users`.
- Nhập dữ liệu người dùng.
- Hiển thị danh sách người dùng tại `/User`.
- Không hiển thị mật khẩu trên giao diện.

---

### 9.4. Bảng `CategoriesProducts`

Dùng để quản lý danh mục sản phẩm.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã danh mục sản phẩm |
| Name | Tên danh mục sản phẩm |
| Description | Mô tả |

Chức năng đã làm:

- Tạo Entity `CategoryProduct`.
- Tạo bảng `CategoriesProducts`.
- Nhập dữ liệu danh mục sản phẩm.
- Hiển thị danh mục sản phẩm tại `/CategoryProduct`.

---

### 9.5. Bảng `Products`

Dùng để quản lý sản phẩm.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã sản phẩm |
| Name | Tên sản phẩm |
| Description | Mô tả sản phẩm |
| Price | Giá sản phẩm |
| StockQuantity | Số lượng tồn kho |
| ImageUrl | Đường dẫn ảnh sản phẩm |
| CategoryProductId | Mã danh mục sản phẩm |

Chức năng đã làm:

- Tạo Entity `Product`.
- Tạo bảng `Products`.
- Nhập dữ liệu sản phẩm.
- Gắn hình ảnh sản phẩm.
- Hiển thị sản phẩm dạng card tại `/Product`.

---

### 9.6. Bảng `Customers`

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

- Tạo Entity `Customer`.
- Tạo bảng `Customers`.
- Nhập dữ liệu khách hàng.
- Hiển thị danh sách khách hàng tại `/Customer`.
- Không hiển thị mật khẩu trên giao diện.

---

### 9.7. Bảng `Orders`

Dùng để quản lý đơn hàng.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã đơn hàng |
| OrderDate | Ngày đặt hàng |
| CustomerId | Mã khách hàng |
| Status | Trạng thái đơn hàng |
| Notes | Ghi chú |

Quy ước trạng thái:

| Status | Ý nghĩa |
|---:|---|
| 0 | Chờ duyệt |
| 1 | Đang giao |
| 2 | Đã xong |

Chức năng đã làm:

- Tạo Entity `Order`.
- Tạo bảng `Orders`.
- Nhập dữ liệu đơn hàng.
- Hiển thị danh sách đơn hàng tại `/Order`.
- Hiển thị trạng thái bằng badge màu.

---

### 9.8. Bảng `OrderDetails`

Dùng để quản lý chi tiết sản phẩm trong từng đơn hàng.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã chi tiết đơn hàng |
| OrderId | Mã đơn hàng |
| ProductId | Mã sản phẩm |
| Quantity | Số lượng |
| UnitPrice | Đơn giá |

Chức năng đã làm:

- Tạo Entity `OrderDetail`.
- Tạo bảng `OrderDetails`.
- Nhập dữ liệu chi tiết đơn hàng.
- Hiển thị chi tiết đơn hàng tại `/OrderDetail`.
- Tính thành tiền bằng công thức `Quantity * UnitPrice`.

---

## 10. Controller đã hoàn thành

| Controller | Chức năng |
|---|---|
| `CategoryController` | Hiển thị danh sách danh mục bài viết |
| `PostController` | Hiển thị danh sách và chi tiết bài viết |
| `UserController` | Hiển thị danh sách người dùng |
| `CategoryProductController` | Hiển thị danh mục sản phẩm |
| `ProductController` | Hiển thị danh sách sản phẩm |
| `CustomerController` | Hiển thị danh sách khách hàng |
| `OrderController` | Hiển thị danh sách đơn hàng |
| `OrderDetailController` | Hiển thị chi tiết đơn hàng |

---

## 11. View đã hoàn thành

| View | Chức năng |
|---|---|
| `Views/Category/Index.cshtml` | Trang danh sách danh mục |
| `Views/Post/Index.cshtml` | Trang danh sách bài viết |
| `Views/Post/Details.cshtml` | Trang chi tiết bài viết |
| `Views/User/Index.cshtml` | Trang danh sách người dùng |
| `Views/CategoryProduct/Index.cshtml` | Trang danh mục sản phẩm |
| `Views/Product/Index.cshtml` | Trang danh sách sản phẩm |
| `Views/Customer/Index.cshtml` | Trang danh sách khách hàng |
| `Views/Order/Index.cshtml` | Trang danh sách đơn hàng |
| `Views/OrderDetail/Index.cshtml` | Trang chi tiết đơn hàng |
| `Views/Shared/_Layout.cshtml` | Layout chung và thanh menu điều hướng |

---

## 12. Thanh điều hướng

Dự án đã tạo thanh menu điều hướng dùng chung trong file:

```text
Views/Shared/_Layout.cshtml
```

Các đường dẫn trên thanh menu:

| Chức năng | Đường dẫn |
|---|---|
| Danh mục bài viết | `/Category` |
| Bài viết | `/Post` |
| Người dùng | `/User` |
| Danh mục sản phẩm | `/CategoryProduct` |
| Sản phẩm | `/Product` |
| Khách hàng | `/Customer` |
| Đơn hàng | `/Order` |
| Chi tiết đơn hàng | `/OrderDetail` |

---

## 13. Các chức năng đã hoàn thành

- Khởi tạo Solution nhiều lớp.
- Tạo các Entity chính cho hệ thống.
- Kết nối SQL Server bằng Entity Framework Core.
- Tạo database bằng Migration.
- Tạo đủ các bảng chính.
- Nhập dữ liệu thật vào database.
- Hiển thị dữ liệu thật lên giao diện.
- Tạo danh sách danh mục bài viết.
- Tạo danh sách bài viết.
- Tạo trang chi tiết bài viết.
- Tạo danh sách người dùng.
- Tạo danh mục sản phẩm.
- Tạo danh sách sản phẩm có hình ảnh.
- Tạo danh sách khách hàng.
- Tạo danh sách đơn hàng.
- Tạo danh sách chi tiết đơn hàng.
- Tạo thanh menu điều hướng chung.
- Sử dụng Bootstrap để giao diện dễ nhìn hơn.

---

## 14. Một số lỗi đã gặp và cách xử lý

### 14.1. Lỗi EF Core không tương thích version

Nguyên nhân:

- Project dùng `.NET 8`.
- NuGet tự chọn Entity Framework Core phiên bản `10.x`.

Cách xử lý:

- Cài lại Entity Framework Core phiên bản `8.0.x`.

---

### 14.2. Lỗi hai project dùng EF Core khác version

Nguyên nhân:

- `CMS.data` và `CMS.Backend` dùng version EF Core khác nhau.

Cách xử lý:

- Đồng bộ cả hai project về cùng version `8.0.22`.

---

### 14.3. Lỗi `Build failed` khi chạy Migration

Nguyên nhân:

- Project còn lỗi build.
- Package chưa đồng bộ.
- Cấu hình `ApplicationDbContext` hoặc `Program.cs` chưa đúng.

Cách xử lý:

- Kiểm tra Error List.
- Sửa lỗi build.
- Chạy lại Migration.

---

### 14.4. Lỗi không tìm thấy View

Nguyên nhân:

- Chưa tạo đúng folder View.
- Tên folder không trùng tên Controller.

Cách xử lý:

- Tạo đúng cấu trúc, ví dụ:

```text
Views/Customer/Index.cshtml
```

---

### 14.5. Lỗi khóa ngoại khi nhập dữ liệu

Nguyên nhân:

- Nhập sai Id liên kết, ví dụ `CategoryProductId`, `CustomerId`, `OrderId`, `ProductId`.

Cách xử lý:

- Kiểm tra Id thật trong bảng cha trước khi nhập dữ liệu.

Ví dụ:

```sql
SELECT Id, Name FROM CategoriesProducts;
SELECT Id, Name FROM Products;
SELECT Id, Notes FROM Orders;
```

---

## 15. Hướng dẫn chạy dự án

### Bước 1: Clone source code

```bash
git clone https://github.com/minhtri404/asp..git
```

### Bước 2: Mở Solution

Mở file:

```text
TriCMS_Solution.sln
```

bằng Visual Studio 2022.

### Bước 3: Kiểm tra chuỗi kết nối

Mở file:

```text
CMS.Backend/appsettings.json
```

Kiểm tra chuỗi kết nối `DefaultConnection`.

### Bước 4: Tạo database nếu chưa có

Mở Package Manager Console và chạy:

```powershell
Update-Database -StartupProject CMS.Backend
```

### Bước 5: Chạy dự án

Chọn `CMS.Backend` làm Startup Project, sau đó bấm `F5`.

---

## 16. Các đường dẫn kiểm tra nhanh

| Trang | Đường dẫn |
|---|---|
| Danh mục bài viết | `/Category` |
| Bài viết | `/Post` |
| Người dùng | `/User` |
| Danh mục sản phẩm | `/CategoryProduct` |
| Sản phẩm | `/Product` |
| Khách hàng | `/Customer` |
| Đơn hàng | `/Order` |
| Chi tiết đơn hàng | `/OrderDetail` |

---

## 17. Định hướng phát triển tiếp theo

Trong các buổi tiếp theo, dự án có thể phát triển thêm:

- Dùng LINQ để lọc, tìm kiếm và sắp xếp dữ liệu.
- Dùng `.Include()` để hiển thị tên khách hàng, tên sản phẩm thay vì chỉ hiển thị Id.
- Xây dựng chức năng thêm, sửa, xóa dữ liệu.
- Hoàn thiện giao diện Admin.
- Thêm đăng nhập và phân quyền.
- Xây dựng Web API.
- Kết nối ReactJS ở phần Frontend.
- Tối ưu giao diện và trải nghiệm người dùng.
