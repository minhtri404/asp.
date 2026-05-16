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

---

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
