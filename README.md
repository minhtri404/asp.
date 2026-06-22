# TriCMS - Hệ thống quản lý nội dung

TriCMS là bài thực hành môn Chuyên đề ASP.NET, gồm Backend ASP.NET Core và Frontend ReactJS.

## Thông tin sinh viên

- MSSV: 2123110137
- Họ tên: Trương Minh Trí
- Lớp: CCQ2311D

## Công nghệ sử dụng

- ASP.NET Core 8, Entity Framework Core 8
- SQL Server LocalDB
- React 19, Vite 8, Bootstrap 5
- Visual Studio 2022, Node.js và npm

## Chuẩn bị

1. Cài Visual Studio 2022 với workload **ASP.NET and web development**.
2. Cài .NET 8 SDK và SQL Server LocalDB.
3. Cài Node.js và npm.
4. Clone repository và chuyển sang nhánh cần chạy:

```bash
git clone https://github.com/minhtri404/asp..git
cd asp.
git checkout buoi7
```

## Chạy Backend bằng F5

1. Mở file `TriCMS_Solution.sln` bằng Visual Studio 2022.
2. Trong Solution Explorer, nhấn chuột phải vào `CMS.Backend` và chọn **Set as Startup Project**.
3. Kiểm tra chuỗi kết nối `DefaultConnection` trong `CMS.Backend/appsettings.json`. Cấu hình mặc định dùng SQL Server LocalDB với database `TriCMS_DB`.
4. Mở **Tools > NuGet Package Manager > Package Manager Console** và chạy migration nếu database chưa được tạo:

```powershell
Update-Database -Project CMS.data -StartupProject CMS.Backend
```

5. Nhấn **F5** để chạy Backend.

Backend mặc định chạy tại:

- HTTPS: `https://localhost:13766`
- HTTP: `http://localhost:13767`

Giữ Backend đang chạy trong lúc sử dụng Frontend.

## Chạy Frontend bằng npm start

Mở terminal mới tại thư mục gốc repository rồi chạy:

```bash
cd tricms-client
npm install
npm start
```

Mở địa chỉ Vite hiển thị trong terminal, thường là `http://localhost:5173`.

Frontend chuyển tiếp các request `/api` tới Backend tại `http://localhost:13767`. Có thể đổi địa chỉ Backend trước khi chạy Frontend:

```powershell
$env:VITE_API_ORIGIN="http://localhost:13767"
npm start
```

## Cấu trúc chính

```text
TriCMS_Solution
|-- CMS.Backend        # ASP.NET Core Backend/Web API
|-- CMS.data           # Entity, DbContext và migration
|-- tricms-client      # ReactJS Frontend
|-- TriCMS_Solution.sln
|-- .gitignore
`-- README.md
```

Các thư mục sinh tự động như `node_modules`, `bin`, `obj`, `dist` và `.vs` không được đưa lên Git.
