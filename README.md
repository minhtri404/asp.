# TriCMS - Hệ thống quản lý nội dung ASP.NET Core MVC

## 1. Thông tin sinh viên

- **MSSV:** 2123110137
- **Họ tên:** Trương Minh Trí
- **Lớp:** CCQ2311D
- **Ngày tạo:** 16/5/2026
- **Môn học:** Chuyên đề ASP.NET

---

## 2. Giới thiệu dự án

**TriCMS** là dự án thực hành xây dựng hệ thống quản lý nội dung bằng **ASP.NET Core MVC**.

Dự án được tổ chức theo hướng nhiều lớp, trong đó:

- `CMS.data` dùng để lưu các lớp dữ liệu Entity.
- `CMS.Backend` dùng để xử lý Controller, View và giao diện quản trị.
- Dữ liệu hiện tại là dữ liệu mẫu được tạo trực tiếp trong Controller.
- Dự án đã chạy được trên trình duyệt thông qua `localhost`.

Mục tiêu của buổi 1 là khởi tạo cấu trúc dự án, tạo các Entity cơ bản, tạo Controller và View để hiển thị dữ liệu mẫu lên giao diện web.

---

## 3. Công nghệ sử dụng

- ASP.NET Core MVC
- C#
- Razor View
- Bootstrap 5
- .NET 8
- Visual Studio 2022
- Git và GitHub

------

## 4. Cấu trúc thư mục dự án

```text
TriCMS_Solution
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
│   └── CMS.data.csproj
│
├── CMS.Backend
│   ├── Controllers
│   │   ├── CategoryController.cs
│   │   ├── PostController.cs
│   │   └── UserController.cs
│   │
│   ├── Views
│   │   ├── Category
│   │   │   └── Index.cshtml
│   │   ├── Post
│   │   │   ├── Index.cshtml
│   │   │   └── Details.cshtml
│   │   └── User
│   │       └── Index.cshtml
│   │
│   ├── Program.cs
│   └── CMS.Backend.csproj
│
├── TriCMS_Solution.sln
├── .gitignore
└── README.md
```
---

## 5. Các Entity đã tạo

| Entity | Chức năng |
|---|---|
| `Category.cs` | Lưu thông tin danh mục bài viết |
| `Post.cs` | Lưu thông tin bài viết |
| `User.cs` | Lưu thông tin người dùng quản trị |
| `CategoryProduct.cs` | Lưu thông tin danh mục sản phẩm |
| `Product.cs` | Lưu thông tin sản phẩm |
| `Customer.cs` | Lưu thông tin khách hàng |
| `Order.cs` | Lưu thông tin đơn hàng |
| `OrderDetail.cs` | Lưu thông tin chi tiết đơn hàng |

---

## 6. Các chức năng đã hoàn thành trong buổi 1

### 6.1. Quản lý danh mục bài viết

Đã tạo:

```text
CMS.Backend/Controllers/CategoryController.cs
CMS.Backend/Views/Category/Index.cshtml
```

```
6.2. Quản lý bài viết

Đã tạo:

CMS.Backend/Controllers/PostController.cs
CMS.Backend/Views/Post/Index.cshtml
CMS.Backend/Views/Post/Details.cshtml

Chức năng đã làm:

Tạo danh sách bài viết mẫu trong Controller.
Hiển thị danh sách bài viết dạng Card.
Hiển thị tiêu đề, nội dung rút gọn, hình ảnh và ngày đăng.
Có nút Xem chi tiết.
Tạo trang chi tiết bài viết theo ID.
Có nút quay lại danh sách bài viết.

Dữ liệu mẫu:

ID	Tiêu đề
1	Lộ trình học ASP.NET Core cho người mới
2	ReactJS và WebAPI: Xu hướng Fullstack 2026
3	Hướng dẫn cài đặt môi trường Visual Studio
6.3. Quản lý người dùng

Đã tạo:

CMS.Backend/Controllers/UserController.cs
CMS.Backend/Views/User/Index.cshtml

Chức năng đã làm:

Tạo danh sách người dùng mẫu trong Controller.
Hiển thị danh sách thành viên quản trị.
Hiển thị vai trò người dùng.
Dùng Badge Bootstrap để phân biệt quyền hạn.
Có nút giao diện mẫu: Thêm, Sửa, Xóa.

Dữ liệu mẫu:

ID	Username	Họ tên	Quyền
1	admin_thai	Nguyen Cao Thai	Administrator
2	editor_01	Tran Van Bien Tap	Editor
3	author_minh	Le Quang Minh	Author
7. Đường dẫn chạy web trên localhost

Sau khi chạy project CMS.Backend, có thể kiểm tra các trang sau:

Chức năng	Đường dẫn
Trang danh mục	http://localhost:5000/Category
Trang danh mục đầy đủ Action	http://localhost:5000/Category/Index
Trang bài viết	http://localhost:5000/Post
Trang chi tiết bài viết ID = 1	http://localhost:5000/Post/Details/1
Trang chi tiết bài viết ID = 2	http://localhost:5000/Post/Details/2
Trang người dùng	http://localhost:5000/User
Trang người dùng đầy đủ Action	http://localhost:5000/User/Index

Lưu ý: Nếu Visual Studio chạy ở port khác, thay 5000 bằng port thật đang hiển thị trên trình duyệt.

Ví dụ:

http://localhost:7111/Category
http://localhost:7111/Post
http://localhost:7111/User
