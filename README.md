# TriCMS - Hệ thống quản lý nội dung ASP.NET Core MVC

## 1. Thông tin sinh viên

- Họ và tên: Trương Minh Trí
- MSSV: 2123110137
- Lớp: CCQ2311D
- Môn học: Chuyên đề ASP.NET
- Công nghệ sử dụng: ASP.NET Core MVC, Entity Framework Core, SQL Server
- Nhánh hiện tại: `buoi-2`

---

## 2. Giới thiệu dự án

TriCMS là hệ thống quản lý nội dung được xây dựng bằng ASP.NET Core MVC theo mô hình nhiều lớp. Dự án mô phỏng một hệ thống CMS cơ bản, có thể quản lý danh mục, bài viết, người dùng, sản phẩm, khách hàng, đơn hàng và chi tiết đơn hàng.

Ở Buổi 1, dữ liệu chủ yếu được tạo trực tiếp trong Controller. Đến Buổi 2, dự án đã được nâng cấp để kết nối với cơ sở dữ liệu thật bằng Entity Framework Core và SQL Server.

---

## 3. Mục tiêu Buổi 2

Buổi 2 tập trung vào các nội dung chính:

- Cài đặt Entity Framework Core cho dự án.
- Tạo lớp `ApplicationDbContext` để quản lý kết nối dữ liệu.
- Cấu hình chuỗi kết nối trong `appsettings.json`.
- Đăng ký `DbContext` trong `Program.cs`.
- Sử dụng Code First Migration để tạo database tự động.
- Tạo database `TriCMS_DB` trong SQL Server.
- Sinh các bảng dữ liệu từ các Entity đã tạo ở Buổi 1.
- Thay dữ liệu giả trong Controller bằng dữ liệu thật lấy từ SQL Server.
- Hiển thị dữ liệu thật lên giao diện MVC.

---

## 4. Công nghệ sử dụng

| Công nghệ | Mục đích sử dụng |
|---|---|
| ASP.NET Core MVC | Xây dựng ứng dụng web theo mô hình MVC |
| C# | Ngôn ngữ lập trình chính |
| Entity Framework Core | Kết nối và thao tác dữ liệu với SQL Server |
| SQL Server | Lưu trữ dữ liệu thật của hệ thống |
| SQL Server Management Studio | Quản lý database và nhập dữ liệu mẫu |
| Bootstrap 5 | Thiết kế giao diện bảng, card, nút và badge |
| Git & GitHub | Quản lý mã nguồn theo từng nhánh |

---

## 5. Cấu trúc Solution

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
    │   └── OrderDetail
    │
    ├── wwwroot
    │   └── img
    │
    ├── appsettings.json
    └── Program.cs
```

---

## 6. Các package đã cài đặt

Dự án sử dụng Entity Framework Core phiên bản 8.x để tương thích với `.NET 8`.

| Package | Mục đích |
|---|---|
| Microsoft.EntityFrameworkCore.SqlServer | Kết nối ASP.NET Core với SQL Server |
| Microsoft.EntityFrameworkCore.Tools | Hỗ trợ chạy lệnh Migration |
| Microsoft.EntityFrameworkCore.Design | Hỗ trợ thiết kế và tạo database |

Lưu ý: Dự án dùng `.NET 8`, vì vậy các package EF Core phải dùng phiên bản `8.0.x`, không dùng phiên bản `10.x`.

---

## 7. Cấu hình cơ sở dữ liệu

Trong file `appsettings.json`, dự án đã cấu hình chuỗi kết nối đến SQL Server LocalDB:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=TriCMS_DB;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True"
  }
}
```

Database được tạo ra:

```text
TriCMS_DB
```

---

## 8. ApplicationDbContext

Dự án đã tạo file `ApplicationDbContext.cs` trong project `CMS.data`.

File này có nhiệm vụ kết nối các Entity với SQL Server thông qua Entity Framework Core.

Các bảng được khai báo trong `ApplicationDbContext`:

```csharp
public DbSet<Category> Categories { get; set; }
public DbSet<Post> Posts { get; set; }
public DbSet<User> Users { get; set; }
public DbSet<CategoryProduct> CategoriesProducts { get; set; }
public DbSet<Product> Products { get; set; }
public DbSet<Customer> Customers { get; set; }
public DbSet<Order> Orders { get; set; }
public DbSet<OrderDetail> OrderDetails { get; set; }
```

---

## 9. Migration đã thực hiện

Dự án đã chạy thành công các lệnh Migration:

```powershell
Add-Migration InitialCreate -StartupProject CMS.Backend
```

```powershell
Update-Database -StartupProject CMS.Backend
```

Sau khi chạy Migration, SQL Server đã tạo database `TriCMS_DB` và sinh các bảng tương ứng với các Entity trong project.

---

## 10. Danh sách bảng đã tạo trong database

| STT | Tên bảng | Chức năng |
|---:|---|---|
| 1 | Categories | Lưu danh mục bài viết |
| 2 | Posts | Lưu thông tin bài viết |
| 3 | Users | Lưu thông tin người dùng quản trị |
| 4 | CategoriesProducts | Lưu danh mục sản phẩm |
| 5 | Products | Lưu thông tin sản phẩm |
| 6 | Customers | Lưu thông tin khách hàng |
| 7 | Orders | Lưu thông tin đơn hàng |
| 8 | OrderDetails | Lưu chi tiết từng sản phẩm trong đơn hàng |
| 9 | __EFMigrationsHistory | Lưu lịch sử Migration của Entity Framework Core |

---

## 11. Chi tiết các bảng đã làm

### 11.1. Bảng Categories

Bảng `Categories` dùng để quản lý danh mục bài viết.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã danh mục |
| Name | Tên danh mục |
| Description | Mô tả danh mục |

Dữ liệu mẫu đã nhập:

| Name | Description |
|---|---|
| Tin tức Công nghệ | Cập nhật xu hướng AI, IoT và lập trình |
| Đời sống du lịch | Kinh nghiệm phượt và các điểm đến hấp dẫn |
| Sức khỏe Thể thao | Các bài tập và chế độ ăn uống lành mạnh |

Chức năng đã làm:

- Tạo bảng `Categories` bằng Migration.
- Nhập dữ liệu thật trong SQL Server.
- Sửa `CategoryController` để lấy dữ liệu từ `_context.Categories`.
- Hiển thị danh sách danh mục tại đường dẫn `/Category`.

---

### 11.2. Bảng Posts

Bảng `Posts` dùng để quản lý bài viết.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã bài viết |
| Title | Tiêu đề bài viết |
| Content | Nội dung bài viết |
| ImageUrl | Đường dẫn hình ảnh |
| CreatedDate | Ngày tạo bài viết |
| CategoryId | Mã danh mục liên kết |

Dữ liệu mẫu đã nhập:

| Title | CategoryId | ImageUrl |
|---|---:|---|
| Lộ trình học ASP.NET | 1 | /img/dotnet.jpg |
| AI và tương lai | 1 | /img/ai.jpg |
| Kỹ năng Teamwork | 2 | /img/team.jpg |

Chức năng đã làm:

- Tạo bảng `Posts` bằng Migration.
- Nhập dữ liệu bài viết thật vào SQL Server.
- Sửa `PostController` để lấy dữ liệu từ `_context.Posts`.
- Tạo trang danh sách bài viết dạng card.
- Tạo chức năng xem chi tiết bài viết bằng `Details(int id)`.
- Gắn hình ảnh bài viết thông qua cột `ImageUrl`.
- Hiển thị danh sách bài viết tại `/Post`.
- Hiển thị chi tiết bài viết tại `/Post/Details/{id}`.

---

### 11.3. Bảng Users

Bảng `Users` dùng để quản lý người dùng trong hệ thống.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã người dùng |
| Username | Tên đăng nhập |
| PasswordHash | Mật khẩu |
| FullName | Họ tên |
| Role | Vai trò người dùng |

Dữ liệu mẫu đã nhập:

| Username | FullName | Role |
|---|---|---|
| admin | Quản trị viên hệ thống | Admin |
| editor01 | Biên tập viên nội dung | Editor |
| user01 | Nguyễn Văn A | User |

Chức năng đã làm:

- Tạo bảng `Users` bằng Migration.
- Nhập dữ liệu người dùng vào SQL Server.
- Sửa `UserController` để lấy dữ liệu từ `_context.Users`.
- Tạo giao diện danh sách thành viên.
- Không hiển thị mật khẩu trên giao diện.
- Hiển thị danh sách người dùng tại `/User`.

---

### 11.4. Bảng CategoriesProducts

Bảng `CategoriesProducts` dùng để quản lý danh mục sản phẩm.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã danh mục sản phẩm |
| Name | Tên danh mục sản phẩm |
| Description | Mô tả danh mục sản phẩm |

Dữ liệu mẫu đã nhập:

| Name | Description |
|---|---|
| Laptop | Các dòng laptop học tập, văn phòng và gaming |
| Điện thoại | Các mẫu điện thoại thông minh mới nhất |
| Phụ kiện | Chuột, bàn phím, tai nghe và phụ kiện công nghệ |

Chức năng đã làm:

- Tạo bảng `CategoriesProducts` bằng Migration.
- Nhập dữ liệu danh mục sản phẩm.
- Tạo `CategoryProductController`.
- Tạo View hiển thị danh sách danh mục sản phẩm.
- Hiển thị dữ liệu tại `/CategoryProduct`.

---

### 11.5. Bảng Products

Bảng `Products` dùng để quản lý sản phẩm.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã sản phẩm |
| Name | Tên sản phẩm |
| Description | Mô tả sản phẩm |
| Price | Giá sản phẩm |
| StockQuantity | Số lượng tồn kho |
| ImageUrl | Đường dẫn ảnh sản phẩm |
| CategoryProductId | Mã danh mục sản phẩm |

Dữ liệu mẫu đã nhập:

| Name | Price | StockQuantity | CategoryProductId |
|---|---:|---:|---:|
| Laptop Dell Inspiron | 15000000 | 10 | 1 |
| iPhone 15 | 22000000 | 8 | 2 |
| Tai nghe Bluetooth | 550000 | 25 | Theo Id danh mục Phụ kiện |

Chức năng đã làm:

- Tạo bảng `Products` bằng Migration.
- Nhập dữ liệu sản phẩm vào SQL Server.
- Xử lý lỗi khóa ngoại khi `CategoryProductId` không tồn tại.
- Gắn ảnh sản phẩm qua `ImageUrl`.
- Tạo `ProductController`.
- Tạo giao diện sản phẩm dạng card.
- Hiển thị danh sách sản phẩm tại `/Product`.

---

### 11.6. Bảng Customers

Bảng `Customers` dùng để lưu thông tin khách hàng.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã khách hàng |
| FullName | Họ tên khách hàng |
| Email | Email |
| Phone | Số điện thoại |
| Address | Địa chỉ |
| Password | Mật khẩu |

Dữ liệu mẫu đã nhập:

| FullName | Email | Phone | Address |
|---|---|---|---|
| Nguyễn Văn An | an@gmail.com | 0901234567 | Hồ Chí Minh |
| Trần Thị Bình | binh@gmail.com | 0912345678 | Hà Nội |
| Lê Văn Cường | cuong@gmail.com | 0923456789 | Đà Nẵng |

Chức năng đã làm:

- Tạo bảng `Customers` bằng Migration.
- Nhập dữ liệu khách hàng.
- Tạo `CustomerController`.
- Tạo View `Customer/Index.cshtml`.
- Không hiển thị mật khẩu trên giao diện.
- Hiển thị danh sách khách hàng tại `/Customer`.

---

### 11.7. Bảng Orders

Bảng `Orders` dùng để lưu thông tin đơn hàng.

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

Dữ liệu mẫu đã nhập:

| OrderDate | CustomerId | Status | Notes |
|---|---:|---:|---|
| 2026-05-01 | 1 | 0 | Khách mới đặt hàng, chờ xác nhận |
| 2026-05-02 | 2 | 1 | Đơn hàng đang giao |
| 2026-05-03 | 3 | 2 | Đơn hàng đã hoàn thành |

Chức năng đã làm:

- Tạo bảng `Orders` bằng Migration.
- Nhập dữ liệu đơn hàng.
- Tạo `OrderController`.
- Tạo giao diện hiển thị danh sách đơn hàng.
- Hiển thị trạng thái bằng badge màu.
- Hiển thị danh sách đơn hàng tại `/Order`.

---

### 11.8. Bảng OrderDetails

Bảng `OrderDetails` dùng để lưu chi tiết sản phẩm trong từng đơn hàng.

| Trường | Ý nghĩa |
|---|---|
| Id | Mã chi tiết đơn hàng |
| OrderId | Mã đơn hàng |
| ProductId | Mã sản phẩm |
| Quantity | Số lượng |
| UnitPrice | Đơn giá tại thời điểm mua |

Dữ liệu mẫu đã nhập:

| OrderId | ProductId | Quantity | UnitPrice |
|---:|---:|---:|---:|
| 1 | 1 | 1 | 15000000 |
| 2 | 2 | 1 | 22000000 |
| 3 | 9 | 2 | 550000 |

Chức năng đã làm:

- Tạo bảng `OrderDetails` bằng Migration.
- Nhập dữ liệu chi tiết đơn hàng.
- Xử lý ProductId theo Id thật trong bảng `Products`.
- Tạo `OrderDetailController`.
- Tạo View `OrderDetail/Index.cshtml`.
- Tính thành tiền bằng công thức: `Quantity * UnitPrice`.
- Hiển thị chi tiết đơn hàng tại `/OrderDetail`.

---

## 12. Các Controller đã hoàn thành

| Controller | Chức năng |
|---|---|
| CategoryController | Hiển thị danh sách danh mục bài viết |
| PostController | Hiển thị danh sách và chi tiết bài viết |
| UserController | Hiển thị danh sách người dùng |
| CategoryProductController | Hiển thị danh mục sản phẩm |
| ProductController | Hiển thị danh sách sản phẩm |
| CustomerController | Hiển thị danh sách khách hàng |
| OrderController | Hiển thị danh sách đơn hàng |
| OrderDetailController | Hiển thị chi tiết đơn hàng |

---

## 13. Các đường dẫn chạy thử

| Chức năng | Đường dẫn |
|---|---|
| Danh mục bài viết | `/Category` |
| Bài viết | `/Post` |
| Chi tiết bài viết | `/Post/Details/{id}` |
| Người dùng | `/User` |
| Danh mục sản phẩm | `/CategoryProduct` |
| Sản phẩm | `/Product` |
| Khách hàng | `/Customer` |
| Đơn hàng | `/Order` |
| Chi tiết đơn hàng | `/OrderDetail` |

---

## 14. Những lỗi đã gặp và cách xử lý

### Lỗi 1: EF Core version không tương thích

```text
Package Microsoft.EntityFrameworkCore.SqlServer 10.x is not compatible with net8.0
```

Nguyên nhân:

- Project dùng `.NET 8`.
- Nhưng NuGet tự chọn EF Core phiên bản `10.x`.

Cách xử lý:

- Cài lại các package EF Core phiên bản `8.0.x`.

---

### Lỗi 2: Hai project dùng EF Core khác version

```text
CMS.data uses Microsoft.EntityFrameworkCore 8.0.22
CMS.Backend references Microsoft.EntityFrameworkCore 8.0.8
```

Nguyên nhân:

- `CMS.data` và `CMS.Backend` dùng hai phiên bản EF Core khác nhau.

Cách xử lý:

- Đồng bộ cả hai project về cùng phiên bản `8.0.22`.

---

### Lỗi 3: Add-Migration bị Build failed

Nguyên nhân:

- Project còn lỗi build.
- Package chưa đồng bộ.
- `ApplicationDbContext` hoặc `Program.cs` chưa cấu hình đúng.

Cách xử lý:

- Kiểm tra Error List.
- Sửa lỗi build trước.
- Sau đó chạy lại Migration.

---

### Lỗi 4: Không tìm thấy View

```text
The view 'Index' was not found
```

Nguyên nhân:

- Chưa tạo đúng thư mục View.
- Tên folder không trùng với tên Controller.

Cách xử lý:

- Với `CustomerController`, phải có file `Views/Customer/Index.cshtml`.

---

### Lỗi 5: Lỗi khóa ngoại khi thêm dữ liệu

```text
The INSERT statement conflicted with the FOREIGN KEY constraint
```

Nguyên nhân:

- `CategoryProductId`, `CustomerId`, `OrderId` hoặc `ProductId` không tồn tại trong bảng cha.

Cách xử lý:

- Kiểm tra Id thật bằng lệnh `SELECT`.
- Sau đó nhập lại đúng Id đang tồn tại trong database.

Ví dụ:

```sql
SELECT Id, Name FROM CategoriesProducts;
SELECT Id, Name FROM Products;
SELECT Id, Notes FROM Orders;
```

---

## 15. Kết quả đạt được sau Buổi 2

Sau Buổi 2, dự án đã hoàn thành:

- Kết nối thành công ASP.NET Core MVC với SQL Server.
- Tạo thành công database `TriCMS_DB`.
- Tạo đủ các bảng bằng Entity Framework Core Migration.
- Thay thế dữ liệu giả bằng dữ liệu thật từ database.
- Hiển thị dữ liệu thật lên giao diện MVC.
- Tạo đầy đủ Controller và View cho các bảng chính.
- Biết xử lý lỗi package, lỗi Migration, lỗi View và lỗi khóa ngoại.
- Dự án đã sẵn sàng để chuyển sang Buổi 3: truy vấn LINQ và thao tác CRUD.

---

## 16. Hướng dẫn chạy dự án

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

kiểm tra `DefaultConnection`.

### Bước 5: Chạy Migration nếu máy chưa có database

Mở Package Manager Console và chạy:

```powershell
Update-Database -StartupProject CMS.Backend
```

### Bước 6: Chạy dự án

Chọn `CMS.Backend` làm Startup Project, sau đó bấm `F5`.

---

## 17. Định hướng phát triển tiếp theo

Ở các buổi tiếp theo, dự án có thể phát triển thêm:

- Thêm chức năng Create, Edit, Delete cho từng bảng.
- Sử dụng LINQ để lọc, tìm kiếm và sắp xếp dữ liệu.
- Dùng `.Include()` để hiển thị tên khách hàng, tên sản phẩm thay vì chỉ hiện Id.
- Làm trang Admin hoàn chỉnh.
- Thêm đăng nhập và phân quyền người dùng.
- Xây dựng API để kết nối với ReactJS.
- Hoàn thiện giao diện chuyên nghiệp hơn.
