# TriCMS - Báo cáo tiến độ Buổi 3

## 1. Thông tin dự án

- Tên dự án: TriCMS
- Solution: `TriCMS_Solution`
- Project dữ liệu: `CMS.data`
- Project Backend: `CMS.Backend`
- Database: `TriCMS_DB`
- Nhánh GitHub: `buoi-3`
- Công nghệ sử dụng: ASP.NET Core MVC, Entity Framework Core, SQL Server, Bootstrap, GitHub

---

## 2. Mục tiêu Buổi 3

Buổi 3 tập trung vào phần **truy vấn LINQ và thao tác dữ liệu chuyên sâu** trong ASP.NET Core MVC.

Các nội dung đã thực hiện:

- Sử dụng `Where()` để tìm kiếm dữ liệu.
- Sử dụng `OrderBy()` và `OrderByDescending()` để sắp xếp dữ liệu.
- Sử dụng `FirstOrDefault()` để lấy một bản ghi theo Id.
- Sử dụng `Include()` để lấy dữ liệu liên kết giữa các bảng.
- Sử dụng `ThenInclude()` để lấy dữ liệu liên kết nhiều cấp.
- Tạo chức năng tìm kiếm cho nhiều trang.
- Nâng cấp giao diện hiển thị dữ liệu liên kết.
- Làm CRUD cơ bản cho bảng `Category`.
- Thêm thông báo thành công sau khi thêm, sửa, xóa dữ liệu.

---

## 3. Nội dung đã hoàn thành ở Buổi 3

| STT | Chức năng | Trạng thái |
|---:|---|---|
| 1 | Nâng cấp Post dùng `Include()` lấy tên danh mục | Hoàn thành |
| 2 | Tìm kiếm bài viết bằng LINQ `Where()` | Hoàn thành |
| 3 | Lọc và sắp xếp sản phẩm theo tên, giá | Hoàn thành |
| 4 | Tìm kiếm khách hàng theo tên, email, số điện thoại, địa chỉ | Hoàn thành |
| 5 | Nâng cấp Order dùng `Include()` lấy tên khách hàng | Hoàn thành |
| 6 | Nâng cấp OrderDetail dùng `Include()` và `ThenInclude()` | Hoàn thành |
| 7 | CRUD Category: thêm danh mục | Hoàn thành |
| 8 | CRUD Category: sửa danh mục | Hoàn thành |
| 9 | CRUD Category: xóa danh mục | Hoàn thành |
| 10 | Thêm thông báo thành công khi thêm, sửa, xóa | Hoàn thành |
| 11 | Tìm kiếm Category bằng LINQ | Hoàn thành |

---

## 4. Các kỹ thuật LINQ đã áp dụng

### 4.1. `Where()`

Dùng để lọc dữ liệu theo điều kiện.

Áp dụng trong:

- Tìm kiếm bài viết theo tiêu đề hoặc nội dung.
- Tìm kiếm sản phẩm theo tên hoặc mô tả.
- Lọc sản phẩm theo khoảng giá.
- Tìm kiếm khách hàng theo họ tên, email, số điện thoại, địa chỉ.
- Tìm kiếm danh mục theo tên hoặc mô tả.

Ví dụ:

```csharp
query = query.Where(p =>
    p.Title.Contains(keyword) ||
    p.Content.Contains(keyword));
```

---

### 4.2. `OrderBy()` và `OrderByDescending()`

Dùng để sắp xếp dữ liệu.

Áp dụng trong:

- Sắp xếp danh mục theo tên.
- Sắp xếp bài viết theo ngày mới nhất.
- Sắp xếp sản phẩm theo giá tăng dần hoặc giảm dần.
- Sắp xếp đơn hàng theo ngày đặt mới nhất.

Ví dụ:

```csharp
var posts = query
    .OrderByDescending(p => p.CreatedDate)
    .ToList();
```

---

### 4.3. `FirstOrDefault()`

Dùng để lấy một bản ghi đầu tiên thỏa điều kiện.

Áp dụng trong:

- Lấy chi tiết bài viết theo Id.
- Lấy danh mục cần sửa.
- Lấy danh mục cần xóa.

Ví dụ:

```csharp
var category = _context.Categories.FirstOrDefault(c => c.Id == id);
```

---

### 4.4. `Include()`

Dùng để lấy dữ liệu liên kết từ bảng khác.

Áp dụng trong:

- `Post` lấy thêm thông tin `Category`.
- `Product` lấy thêm thông tin `CategoryProduct`.
- `Order` lấy thêm thông tin `Customer`.
- `OrderDetail` lấy thêm thông tin `Order` và `Product`.

Ví dụ:

```csharp
var posts = _context.Posts
    .Include(p => p.Category)
    .ToList();
```

---

### 4.5. `ThenInclude()`

Dùng để lấy dữ liệu liên kết nhiều cấp.

Áp dụng trong `OrderDetail`:

- Từ `OrderDetail` lấy `Order`.
- Từ `Order` lấy tiếp `Customer`.

Ví dụ:

```csharp
var orderDetails = _context.OrderDetails
    .Include(od => od.Order)
        .ThenInclude(o => o.Customer)
    .Include(od => od.Product)
    .ToList();
```

---

## 5. Chi tiết chức năng đã làm

### 5.1. Nâng cấp trang Post

Chức năng đã làm:

- Dùng `Include(p => p.Category)` để hiển thị tên danh mục của bài viết.
- Dùng `OrderByDescending(p => p.CreatedDate)` để bài viết mới nhất hiển thị trước.
- Dùng `FirstOrDefault()` trong trang chi tiết bài viết.
- Thêm ô tìm kiếm bài viết theo tiêu đề hoặc nội dung.

File đã sửa:

```text
CMS.Backend/Controllers/PostController.cs
Views/Post/Index.cshtml
Views/Post/Details.cshtml
```

Đường dẫn kiểm tra:

```text
/Post
/Post?keyword=AI
/Post/Details/{id}
```

---

### 5.2. Nâng cấp trang Product

Chức năng đã làm:

- Dùng `Include(p => p.CategoryProduct)` để hiển thị tên danh mục sản phẩm.
- Tìm kiếm sản phẩm theo tên hoặc mô tả.
- Lọc sản phẩm theo giá tối thiểu.
- Lọc sản phẩm theo giá tối đa.
- Sắp xếp sản phẩm theo giá tăng dần.
- Sắp xếp sản phẩm theo giá giảm dần.
- Hiển thị sản phẩm dạng card có hình ảnh.

File đã sửa:

```text
CMS.Backend/Controllers/ProductController.cs
Views/Product/Index.cshtml
```

Đường dẫn kiểm tra:

```text
/Product
/Product?keyword=iPhone
/Product?minPrice=500000&maxPrice=20000000
/Product?sortOrder=price_asc
/Product?sortOrder=price_desc
```

---

### 5.3. Nâng cấp trang Customer

Chức năng đã làm:

- Tìm kiếm khách hàng theo họ tên.
- Tìm kiếm khách hàng theo email.
- Tìm kiếm khách hàng theo số điện thoại.
- Tìm kiếm khách hàng theo địa chỉ.
- Sắp xếp khách hàng theo họ tên.

File đã sửa:

```text
CMS.Backend/Controllers/CustomerController.cs
Views/Customer/Index.cshtml
```

Đường dẫn kiểm tra:

```text
/Customer
/Customer?keyword=An
/Customer?keyword=gmail
/Customer?keyword=090
```

---

### 5.4. Nâng cấp trang Order

Chức năng đã làm:

- Dùng `Include(o => o.Customer)` để lấy tên khách hàng.
- Thay vì chỉ hiển thị `CustomerId`, trang đơn hàng đã hiển thị tên khách hàng.
- Sắp xếp đơn hàng theo ngày đặt mới nhất.
- Hiển thị trạng thái đơn hàng bằng badge màu.

File đã sửa:

```text
CMS.Backend/Controllers/OrderController.cs
Views/Order/Index.cshtml
```

Đường dẫn kiểm tra:

```text
/Order
```

---

### 5.5. Nâng cấp trang OrderDetail

Chức năng đã làm:

- Dùng `Include(od => od.Order)` để lấy thông tin đơn hàng.
- Dùng `ThenInclude(o => o.Customer)` để lấy tên khách hàng từ đơn hàng.
- Dùng `Include(od => od.Product)` để lấy tên sản phẩm.
- Hiển thị mã đơn, ngày đặt, khách hàng, sản phẩm, số lượng, đơn giá và thành tiền.
- Tính thành tiền bằng công thức: `Thành tiền = Số lượng x Đơn giá`.

File đã sửa:

```text
CMS.Backend/Controllers/OrderDetailController.cs
Views/OrderDetail/Index.cshtml
```

Đường dẫn kiểm tra:

```text
/OrderDetail
```

---

### 5.6. Hoàn thiện CRUD cho Category

Bảng `Categories` đã được bổ sung chức năng CRUD cơ bản:

| Chức năng | Đường dẫn | Trạng thái |
|---|---|---|
| Danh sách danh mục | `/Category` | Hoàn thành |
| Thêm danh mục | `/Category/Create` | Hoàn thành |
| Sửa danh mục | `/Category/Edit/{id}` | Hoàn thành |
| Xóa danh mục | `/Category/Delete/{id}` | Hoàn thành |
| Tìm kiếm danh mục | `/Category?keyword=công nghệ` | Hoàn thành |

File đã tạo hoặc sửa:

```text
CMS.Backend/Controllers/CategoryController.cs
Views/Category/Index.cshtml
Views/Category/Create.cshtml
Views/Category/Edit.cshtml
Views/Category/Delete.cshtml
```

---

## 6. Thông báo thành công sau thao tác

Dự án đã bổ sung thông báo thành công bằng `TempData`.

Khi thêm thành công:

```csharp
TempData["SuccessMessage"] = "Thêm danh mục thành công!";
```

Khi sửa thành công:

```csharp
TempData["SuccessMessage"] = "Sửa danh mục thành công!";
```

Khi xóa thành công:

```csharp
TempData["SuccessMessage"] = "Xóa danh mục thành công!";
```

Thông báo được hiển thị tại trang danh sách `Category`.

---

## 7. Các Controller đã cập nhật trong Buổi 3

| Controller | Nội dung cập nhật |
|---|---|
| `PostController` | Include Category, tìm kiếm bài viết, chi tiết bài viết |
| `ProductController` | Include CategoryProduct, tìm kiếm, lọc giá, sắp xếp |
| `CustomerController` | Tìm kiếm khách hàng |
| `OrderController` | Include Customer |
| `OrderDetailController` | Include Order, Customer, Product |
| `CategoryController` | Search, Create, Edit, Delete, TempData thông báo |

---

## 8. Các View đã cập nhật trong Buổi 3

| View | Nội dung cập nhật |
|---|---|
| `Views/Post/Index.cshtml` | Thêm tìm kiếm và hiện tên danh mục |
| `Views/Post/Details.cshtml` | Hiện tên danh mục trong chi tiết |
| `Views/Product/Index.cshtml` | Thêm tìm kiếm, lọc giá, sắp xếp, hiện danh mục |
| `Views/Customer/Index.cshtml` | Thêm tìm kiếm khách hàng |
| `Views/Order/Index.cshtml` | Hiện tên khách hàng |
| `Views/OrderDetail/Index.cshtml` | Hiện khách hàng, sản phẩm, thành tiền |
| `Views/Category/Index.cshtml` | Thêm tìm kiếm, nút thêm/sửa/xóa, thông báo |
| `Views/Category/Create.cshtml` | Form thêm danh mục |
| `Views/Category/Edit.cshtml` | Form sửa danh mục |
| `Views/Category/Delete.cshtml` | Trang xác nhận xóa danh mục |

---

## 9. Đường dẫn kiểm tra nhanh

| Chức năng | Đường dẫn |
|---|---|
| Danh mục | `/Category` |
| Thêm danh mục | `/Category/Create` |
| Sửa danh mục | `/Category/Edit/{id}` |
| Xóa danh mục | `/Category/Delete/{id}` |
| Tìm kiếm danh mục | `/Category?keyword=công nghệ` |
| Bài viết | `/Post` |
| Tìm kiếm bài viết | `/Post?keyword=AI` |
| Chi tiết bài viết | `/Post/Details/{id}` |
| Sản phẩm | `/Product` |
| Tìm sản phẩm | `/Product?keyword=iPhone` |
| Lọc sản phẩm theo giá | `/Product?minPrice=500000&maxPrice=20000000` |
| Sắp xếp giá tăng dần | `/Product?sortOrder=price_asc` |
| Sắp xếp giá giảm dần | `/Product?sortOrder=price_desc` |
| Khách hàng | `/Customer` |
| Tìm khách hàng | `/Customer?keyword=An` |
| Đơn hàng | `/Order` |
| Chi tiết đơn hàng | `/OrderDetail` |

---

## 10. Một số lỗi và lưu ý trong Buổi 3

### 10.1. Không lưu được Category khi dùng `ModelState.IsValid`

Nguyên nhân có thể do Entity `Category` có thuộc tính quan hệ `Posts`, trong khi form chỉ gửi `Name` và `Description`.

Cách xử lý tạm thời:

- Nhận dữ liệu bằng tham số `string Name, string Description`.
- Tạo object `Category` thủ công.
- Sau đó dùng `_context.Categories.Add(category)` và `_context.SaveChanges()`.

Ví dụ:

```csharp
[HttpPost]
public IActionResult Create(string Name, string Description)
{
    var category = new Category
    {
        Name = Name,
        Description = Description
    };

    _context.Categories.Add(category);
    _context.SaveChanges();

    TempData["SuccessMessage"] = "Thêm danh mục thành công!";

    return RedirectToAction("Index");
}
```

---

### 10.2. Khi xóa Category có thể bị lỗi khóa ngoại

Nếu danh mục đang được bài viết sử dụng, SQL Server có thể không cho xóa vì bảng `Posts` đang liên kết với bảng `Categories`.

Cách xử lý khi test:

- Chỉ xóa danh mục mới thêm, chưa có bài viết nào sử dụng.
- Hoặc xử lý dữ liệu liên kết trước khi xóa.

---

## 11. Kết quả đạt được sau Buổi 3

Sau Buổi 3, dự án đã đạt được:

- Biết sử dụng LINQ để truy vấn dữ liệu.
- Biết dùng `Where()` để tìm kiếm.
- Biết dùng `OrderBy()` và `OrderByDescending()` để sắp xếp.
- Biết dùng `FirstOrDefault()` để lấy dữ liệu theo Id.
- Biết dùng `Include()` để lấy dữ liệu liên kết.
- Biết dùng `ThenInclude()` để lấy dữ liệu liên kết nhiều cấp.
- Hoàn thiện CRUD cơ bản cho bảng `Category`.
- Có thông báo thành công sau thao tác thêm, sửa, xóa.
- Giao diện hiển thị dữ liệu rõ ràng và dễ sử dụng hơn.

---

## 12. Hướng dẫn chạy dự án

### Bước 1: Clone project

```bash
git clone https://github.com/minhtri404/asp..git
```

### Bước 2: Chuyển sang nhánh Buổi 3

```bash
git checkout buoi-3
```

### Bước 3: Mở Solution

Mở file:

```text
TriCMS_Solution.sln
```

bằng Visual Studio 2022.

### Bước 4: Kiểm tra database

Mở SQL Server Management Studio và kiểm tra database:

```text
TriCMS_DB
```

### Bước 5: Nếu chưa có database thì chạy Migration

Trong Package Manager Console chạy:

```powershell
Update-Database -StartupProject CMS.Backend
```

### Bước 6: Chạy dự án

Chọn `CMS.Backend` làm Startup Project, sau đó bấm `F5`.

---

## 13. Lệnh GitHub cho nhánh Buổi 3

Nếu tạo nhánh mới:

```bash
git checkout -b buoi-3
git add .
git commit -m "Hoan thanh buoi 3 LINQ Include Search va CRUD Category"
git push -u origin buoi-3
```

Nếu nhánh đã tồn tại:

```bash
git checkout buoi-3
git add .
git commit -m "Cap nhat noi dung buoi 3"
git push
```

---

## 14. Định hướng Buổi 4

Buổi tiếp theo có thể phát triển:

- Hoàn thiện CRUD cho `Post`.
- Hoàn thiện CRUD cho `Product`.
- Dùng dropdown chọn danh mục khi thêm/sửa bài viết hoặc sản phẩm.
- Tạo giao diện Admin chuyên nghiệp hơn.
- Tách layout quản trị.
- Bổ sung validation form.
- Tối ưu trải nghiệm người dùng.
