# TriCMS - Hệ thống quản lý nội dung ASP.NET Core MVC

## 1. Thông tin sinh viên

- MSSV: 2123110137
- Họ tên: Trương Minh Trí
- Lớp: CCQ2311D
- Ngày tạo: 16/5/2026

## 2. Giới thiệu dự án

TriCMS là dự án thực hành môn Chuyên đề ASP.NET, được xây dựng bằng ASP.NET Core MVC theo mô hình nhiều lớp.

Mục tiêu của dự án là xây dựng một hệ thống CMS cơ bản, có thể quản lý danh mục, bài viết, người dùng, sản phẩm, khách hàng và đơn hàng.

Ở buổi 1, dự án tập trung vào việc khởi tạo cấu trúc Solution, tạo lớp dữ liệu Entity, tạo Controller và View để hiển thị dữ liệu mẫu lên giao diện web.

## 3. Công nghệ sử dụng

- ASP.NET Core MVC
- C#
- Razor View
- Bootstrap 5
- .NET 8
- Visual Studio 2022
- Git và GitHub

## 4. Cấu trúc dự án

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