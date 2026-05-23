# TriCMS - Báo cáo tiến độ Buổi 2

## 1. Thông tin dự án

- Tên dự án: TriCMS
- Mô hình: ASP.NET Core MVC nhiều lớp
- Solution: `TriCMS_Solution`
- Project dữ liệu: `CMS.data`
- Project xử lý giao diện: `CMS.Backend`
- Database: `TriCMS_DB`
- Nhánh GitHub: `buoi-2`
- Công nghệ chính: ASP.NET Core MVC, Entity Framework Core, SQL Server, Bootstrap, GitHub

---

## 2. Mục tiêu đã thực hiện ở Buổi 2

Ở Buổi 2, dự án đã chuyển từ dữ liệu mẫu viết trực tiếp trong Controller sang dữ liệu thật lưu trong SQL Server.

Các nội dung đã hoàn thành:

- Cài đặt Entity Framework Core cho dự án.
- Tạo `ApplicationDbContext.cs`.
- Cấu hình chuỗi kết nối trong `appsettings.json`.
- Đăng ký `ApplicationDbContext` trong `Program.cs`.
- Chạy Migration để tạo database.
- Tạo database `TriCMS_DB` trong SQL Server.
- Tạo đủ các bảng chính của hệ thống.
- Nhập dữ liệu thật vào từng bảng.
- Sửa Controller để lấy dữ liệu từ database.
- Tạo View để hiển thị dữ liệu.
- Gắn hình ảnh cho bài viết và sản phẩm.
- Tạo thanh menu điều hướng trên website để bấm qua các trang dễ hơn.

---

## 3. Cấu trúc project hiện tại

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

## 4. Package đã sử dụng

Dự án dùng `.NET 8`, vì vậy Entity Framework Core được cài ở phiên bản `8.0.x`.

| Package | Mục đích |
|---|---|
| Microsoft.EntityFrameworkCore.SqlServer | Kết nối ASP.NET Core với SQL Server |
| Microsoft.EntityFrameworkCore.Tools | Hỗ trợ chạy lệnh Migration |
| Microsoft.EntityFrameworkCore.Design | Hỗ trợ thiết kế và tạo database |

---

## 5. Cấu hình database

File `appsettings.json` đã cấu hình chuỗi kết nối:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=TriCMS_DB;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True"
  }
}
```

Database đã tạo:

```text
TriCMS_DB
```

---

## 6. Lệnh Migration đã chạy

```powershell
Add-Migration InitialCreate -StartupProject CMS.Backend
```

```powershell
Update-Database -StartupProject CMS.Backend
```

Sau khi chạy Migration, SQL Server đã tạo các bảng trong database `TriCMS_DB`.

---

## 7. Danh sách bảng hiện có trong database

| STT | Bảng | Chức năng |
|---:|---|---|
| 1 | `Categories` | Lưu danh mục bài viết |
| 2 | `Posts` | Lưu bài viết |
| 3 | `Users` | Lưu người dùng quản trị |
| 4 | `CategoriesProducts` | Lưu danh mục sản phẩm |
| 5 | `Products` | Lưu sản phẩm |
| 6 | `Customers` | Lưu khách hàng |
| 7 | `Orders` | Lưu đơn hàng |
| 8 | `OrderDetails` | Lưu chi tiết đơn hàng |
| 9 | `__EFMigrationsHistory` | Lưu lịch sử Migration của EF Core |

---

## 8. Chi tiết dữ liệu các bảng đã làm

### 8.1. Bảng `Categories`

Bảng này quản lý danh mục bài viết.

| Id | Name | Description |
|---:|---|---|
| 1 | Tin tức Công nghệ | Cập nhật xu hướng AI, IoT và lập trình |
| 2 | Đời sống du lịch | Kinh nghiệm phượt và các điểm đến hấp dẫn |
| 3 | Sức khỏe Thể thao | Các bài tập và chế độ ăn uống lành mạnh |

Đã làm:

- Tạo bảng bằng Migration.
- Nhập dữ liệu thật trong SQL Server.
- Sửa `CategoryController` để lấy dữ liệu từ `_context.Categories`.
- Tạo View hiển thị danh sách danh mục.
- Truy cập tại đường dẫn `/Category`.

---

### 8.2. Bảng `Posts`

Bảng này quản lý bài viết của hệ thống.

| Id | Title | Content | ImageUrl | CategoryId |
|---:|---|---|---|---:|
| 1 | Lộ trình học ASP.NET | Hướng dẫn chi tiết cho người mới bắt đầu học ASP.NET Core. | `/img/dotnet.jpg` | 1 |
| 2 | AI và tương lai | Trí tuệ nhân tạo đang thay đổi cuộc sống và công việc. | `/img/ai.jpg` | 1 |
| 3 | Kỹ năng Teamwork | Cách phối hợp hiệu quả trong nhóm đồ án. | `/img/team.jpg` | 2 |

Đã làm:

- Tạo bảng `Posts`.
- Nhập dữ liệu bài viết.
- Gắn hình ảnh bài viết thông qua cột `ImageUrl`.
- Sửa `PostController` để lấy dữ liệu từ `_context.Posts`.
- Tạo trang danh sách bài viết dạng card.
- Tạo chức năng xem chi tiết bài viết bằng `Details(int id)`.
- Truy cập danh sách tại `/Post`.
- Truy cập chi tiết tại `/Post/Details/{id}`.

---

### 8.3. Bảng `Users`

Bảng này quản lý người dùng trong hệ thống.

| Id | Username | FullName | Role |
|---:|---|---|---|
| 1 | admin | Quản trị viên hệ thống | Admin |
| 2 | editor01 | Biên tập viên nội dung | Editor |
| 3 | user01 | Nguyễn Văn A | User |

Đã làm:

- Tạo bảng `Users`.
- Nhập dữ liệu người dùng.
- Sửa `UserController` để lấy dữ liệu từ `_context.Users`.
- Tạo giao diện danh sách thành viên.
- Không hiển thị mật khẩu trên giao diện.
- Truy cập tại `/User`.

---

### 8.4. Bảng `CategoriesProducts`

Bảng này quản lý danh mục sản phẩm.

| Id | Name | Description |
|---:|---|---|
| 1 | Laptop | Các dòng laptop học tập, văn phòng và gaming |
| 2 | Điện thoại | Các mẫu điện thoại thông minh mới nhất |
| 3 | Phụ kiện | Chuột, bàn phím, tai nghe và phụ kiện công nghệ |

Đã làm:

- Tạo bảng `CategoriesProducts`.
- Nhập dữ liệu danh mục sản phẩm.
- Tạo `CategoryProductController`.
- Tạo View hiển thị danh mục sản phẩm.
- Truy cập tại `/CategoryProduct`.

---

### 8.5. Bảng `Products`

Bảng này quản lý sản phẩm.

Dữ liệu hiện tại đã làm trong database:

| Id | Name | Description | Price | StockQuantity | ImageUrl | CategoryProductId |
|---:|---|---|---:|---:|---|---:|
| 1 | Laptop Dell Inspiron | Laptop học tập và văn phòng | 15000000 | 10 | Link ảnh Laptop hoặc `/img/laptop.jpg` | 1 |
| 2 | iPhone 15 | Điện thoại thông minh cao cấp | 22000000 | 8 | Link ảnh iPhone hoặc `/img/iphone.jpg` | 2 |
| 9 | Tai nghe Bluetooth | Tai nghe không dây tiện lợi | 550000 | 25 | Link ảnh Headphone hoặc `/img/headphone.jpg` | 3 |

Ghi chú:

- Trong quá trình nhập dữ liệu có phát sinh lỗi khóa ngoại do `CategoryProductId` không tồn tại.
- Đã xử lý bằng cách kiểm tra Id thật trong bảng `CategoriesProducts`.
- Sản phẩm `Tai nghe Bluetooth` được dùng với `ProductId = 9` trong bảng `OrderDetails`.

Đã làm:

- Tạo bảng `Products`.
- Nhập dữ liệu sản phẩm.
- Gắn hình ảnh sản phẩm.
- Tạo `ProductController`.
- Tạo giao diện sản phẩm dạng card.
- Truy cập tại `/Product`.

---

### 8.6. Bảng `Customers`

Bảng này quản lý khách hàng.

| Id | FullName | Email | Phone | Address |
|---:|---|---|---|---|
| 1 | Nguyễn Văn An | an@gmail.com | 0901234567 | Hồ Chí Minh |
| 2 | Trần Thị Bình | binh@gmail.com | 0912345678 | Hà Nội |
| 3 | Lê Văn Cường | cuong@gmail.com | 0923456789 | Đà Nẵng |

Đã làm:

- Tạo bảng `Customers`.
- Nhập dữ liệu khách hàng.
- Tạo `CustomerController`.
- Tạo View `Views/Customer/Index.cshtml`.
- Không hiển thị mật khẩu trên giao diện.
- Truy cập tại `/Customer`.

---

### 8.7. Bảng `Orders`

Bảng này quản lý đơn hàng.

| Id | OrderDate | CustomerId | Status | Notes |
|---:|---|---:|---:|---|
| 1 | 2026-05-01 | 1 | 0 | Khách mới đặt hàng, chờ xác nhận |
| 2 | 2026-05-02 | 2 | 1 | Đơn hàng đang giao |
| 3 | 2026-05-03 | 3 | 2 | Đơn hàng đã hoàn thành |

Quy ước trạng thái:

| Status | Ý nghĩa |
|---:|---|
| 0 | Chờ duyệt |
| 1 | Đang giao |
| 2 | Đã xong |

Đã làm:

- Tạo bảng `Orders`.
- Nhập dữ liệu đơn hàng.
- Tạo `OrderController`.
- Tạo View hiển thị danh sách đơn hàng.
- Hiển thị trạng thái bằng badge màu.
- Truy cập tại `/Order`.

---

### 8.8. Bảng `OrderDetails`

Bảng này quản lý chi tiết đơn hàng.

| Id | OrderId | ProductId | Quantity | UnitPrice | Thành tiền |
|---:|---:|---:|---:|---:|---:|
| 1 | 1 | 1 | 1 | 15000000 | 15000000 |
| 2 | 2 | 2 | 1 | 22000000 | 22000000 |
| 3 | 3 | 9 | 2 | 550000 | 1100000 |

Đã làm:

- Tạo bảng `OrderDetails`.
- Nhập dữ liệu chi tiết đơn hàng.
- Dùng đúng `ProductId = 9` cho sản phẩm Tai nghe Bluetooth.
- Tạo `OrderDetailController`.
- Tạo View `Views/OrderDetail/Index.cshtml`.
- Tính thành tiền bằng công thức `Quantity * UnitPrice`.
- Truy cập tại `/OrderDetail`.

---

## 9. Các Controller đã hoàn thành

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

## 10. Các View đã hoàn thành

| View | Chức năng |
|---|---|
| `Views/Category/Index.cshtml` | Danh sách danh mục bài viết |
| `Views/Post/Index.cshtml` | Danh sách bài viết |
| `Views/Post/Details.cshtml` | Chi tiết bài viết |
| `Views/User/Index.cshtml` | Danh sách người dùng |
| `Views/CategoryProduct/Index.cshtml` | Danh mục sản phẩm |
| `Views/Product/Index.cshtml` | Danh sách sản phẩm |
| `Views/Customer/Index.cshtml` | Danh sách khách hàng |
| `Views/Order/Index.cshtml` | Danh sách đơn hàng |
| `Views/OrderDetail/Index.cshtml` | Chi tiết đơn hàng |
| `Views/Shared/_Layout.cshtml` | Layout chung và thanh menu điều hướng |

---

## 11. Thanh menu điều hướng

Dự án đã tạo thanh menu trong file:

```text
Views/Shared/_Layout.cshtml
```

Menu giúp người dùng bấm nhanh đến các trang:

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

## 12. Các lỗi đã gặp và đã xử lý

### 12.1. Lỗi EF Core version không tương thích

Lỗi:

```text
Package Microsoft.EntityFrameworkCore.SqlServer 10.x is not compatible with net8.0
```

Nguyên nhân:

- Project dùng `.NET 8`.
- NuGet tự chọn EF Core phiên bản `10.x`.

Cách xử lý:

- Cài lại EF Core phiên bản `8.0.x`.

---

### 12.2. Lỗi hai project dùng EF Core khác version

Lỗi:

```text
CMS.data uses Microsoft.EntityFrameworkCore 8.0.22
CMS.Backend references Microsoft.EntityFrameworkCore 8.0.8
```

Cách xử lý:

- Đồng bộ `CMS.data` và `CMS.Backend` về cùng EF Core `8.0.22`.

---

### 12.3. Lỗi Add-Migration bị Build failed

Nguyên nhân:

- Project còn lỗi build.
- Package chưa đồng bộ.
- Cấu hình `ApplicationDbContext` hoặc `Program.cs` chưa đúng.

Cách xử lý:

- Kiểm tra Error List.
- Sửa lỗi build.
- Chạy lại `Add-Migration`.

---

### 12.4. Lỗi không tìm thấy View

Lỗi:

```text
The view 'Index' was not found
```

Cách xử lý:

- Tạo đúng folder View theo tên Controller.
- Ví dụ `CustomerController` cần file:

```text
Views/Customer/Index.cshtml
```

---

### 12.5. Lỗi khóa ngoại khi thêm dữ liệu

Lỗi:

```text
The INSERT statement conflicted with the FOREIGN KEY constraint
```

Nguyên nhân:

- Nhập `CategoryProductId`, `CustomerId`, `OrderId` hoặc `ProductId` không tồn tại trong bảng cha.

Cách xử lý:

- Kiểm tra Id thật bằng lệnh:

```sql
SELECT Id, Name FROM CategoriesProducts;
SELECT Id, Name FROM Products;
SELECT Id, Notes FROM Orders;
```

- Sau đó nhập đúng Id thật đang có trong database.

---

## 13. Kết quả đạt được sau Buổi 2

Sau Buổi 2, dự án đã hoàn thành:

- Kết nối thành công ASP.NET Core MVC với SQL Server.
- Tạo thành công database `TriCMS_DB`.
- Tạo đủ bảng bằng Entity Framework Core Migration.
- Nhập dữ liệu thật vào database.
- Thay thế dữ liệu giả trong Controller bằng dữ liệu thật.
- Hiển thị dữ liệu lên giao diện MVC.
- Tạo đầy đủ Controller và View cho các bảng chính.
- Gắn hình ảnh cho bài viết và sản phẩm.
- Tạo thanh menu điều hướng giúp thao tác nhanh hơn.
- Xử lý được lỗi package, lỗi Migration, lỗi View và lỗi khóa ngoại.

---

## 14. Hướng dẫn chạy dự án

### Bước 1: Clone project

```bash
git clone https://github.com/minhtri404/asp..git
```

### Bước 2: Chuyển sang nhánh Buổi 2

```bash
git checkout buoi-2
```

### Bước 3: Mở Solution

Mở file:

```text
TriCMS_Solution.sln
```

bằng Visual Studio 2022.

### Bước 4: Kiểm tra chuỗi kết nối

Mở file:

```text
CMS.Backend/appsettings.json
```

Kiểm tra `DefaultConnection`.

### Bước 5: Tạo database nếu máy chưa có

Mở Package Manager Console và chạy:

```powershell
Update-Database -StartupProject CMS.Backend
```

### Bước 6: Chạy dự án

Chọn `CMS.Backend` làm Startup Project, sau đó bấm `F5`.

---

## 15. Định hướng Buổi 3

Ở Buổi 3, dự án có thể phát triển tiếp:

- Dùng LINQ để lọc, tìm kiếm và sắp xếp dữ liệu.
- Dùng `.Include()` để hiển thị tên khách hàng, tên sản phẩm thay vì chỉ hiển thị Id.
- Làm chức năng thêm, sửa, xóa dữ liệu.
- Hoàn thiện giao diện Admin.
- Xây dựng API để chuẩn bị kết nối với ReactJS.
