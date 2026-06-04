# BUỔI 6 - XÂY DỰNG WEB API CHO FRONTEND CLIENT REACTJS

## 1. Thông tin bài thực hành

- **Môn học:** Chuyên đề ASP.NET
- **Nội dung:** Tổng hợp Web API dành cho Frontend Client ReactJS
- **Công nghệ sử dụng:** ASP.NET Core MVC, Entity Framework Core, SQL Server, Web API
- **Định dạng dữ liệu trao đổi:** JSON
- **Nhánh GitHub:** `buoi-6`

---

## 2. Mục tiêu buổi 6

Buổi 6 tập trung xây dựng các API phục vụ cho giao diện Frontend ReactJS. Các API được thiết kế để ReactJS có thể lấy dữ liệu danh mục, sản phẩm, bài viết, xử lý tài khoản khách hàng và thực hiện đặt hàng.

Các chức năng chính gồm:

- Xây dựng API lấy danh sách danh mục sản phẩm.
- Xây dựng API lấy danh sách và chi tiết bài viết.
- Xây dựng API lấy danh sách, lọc và xem chi tiết sản phẩm.
- Xây dựng API đăng ký và đăng nhập khách hàng.
- Xây dựng API đặt hàng và xem lịch sử mua hàng.
- Cấu hình CORS để Frontend ReactJS có thể gọi API từ Backend ASP.NET Core.

---

## 3. Cấu trúc API đã xây dựng

### 3.1. API danh mục sản phẩm

| Phương thức | Đường dẫn | Mô tả |
|---|---|---|
| GET | `/api/CategoriesProducts` | Lấy danh sách danh mục sản phẩm |

API này dùng để hiển thị danh mục sản phẩm trên giao diện Frontend, ví dụ thanh menu danh mục hoặc bộ lọc sản phẩm.

---

### 3.2. API bài viết

| Phương thức | Đường dẫn | Mô tả |
|---|---|---|
| GET | `/api/Posts` | Lấy danh sách bài viết |
| GET | `/api/Posts/{id}` | Lấy chi tiết bài viết theo ID |

API bài viết phục vụ cho giao diện tin tức, bài viết mới nhất hoặc trang chi tiết bài viết.

---

### 3.3. API sản phẩm

| Phương thức | Đường dẫn | Mô tả |
|---|---|---|
| GET | `/api/Products` | Lấy danh sách toàn bộ sản phẩm |
| GET | `/api/Products/category/{categoryProductId}` | Lọc sản phẩm theo danh mục |
| GET | `/api/Products/{id}` | Lấy chi tiết sản phẩm theo ID |

API sản phẩm là nhóm API chính phục vụ cho trang chủ, trang cửa hàng và trang chi tiết sản phẩm trong ReactJS.

Dữ liệu trả về gồm các thông tin quan trọng như:

- Mã sản phẩm
- Tên sản phẩm
- Giá bán
- Mô tả
- Số lượng tồn kho
- Hình ảnh
- Danh mục sản phẩm

---

### 3.4. API tài khoản khách hàng

| Phương thức | Đường dẫn | Mô tả |
|---|---|---|
| POST | `/api/Auth/CustomerRegister` | Đăng ký tài khoản khách hàng |
| POST | `/api/Auth/CustomerLogin` | Đăng nhập tài khoản khách hàng |

API tài khoản dùng để khách hàng đăng ký và đăng nhập trên giao diện Frontend. Khi đăng nhập thành công, hệ thống trả về thông tin khách hàng để ReactJS lưu và sử dụng trong quá trình mua hàng.

Ví dụ dữ liệu đăng ký:

```json
{
  "fullName": "Nguyen Van A",
  "email": "a@gmail.com",
  "password": "123456",
  "phone": "0909000000",
  "address": "TPHCM"
}
```

Ví dụ dữ liệu đăng nhập:

```json
{
  "email": "a@gmail.com",
  "password": "123456"
}
```

---

### 3.5. API xử lý đặt hàng

| Phương thức | Đường dẫn | Mô tả |
|---|---|---|
| POST | `/api/Orders` | Tạo đơn hàng mới |
| GET | `/api/Orders/customer/{customerId}` | Lấy lịch sử mua hàng của khách hàng |

API đặt hàng là phần quan trọng nhất của buổi 6. Frontend ReactJS gửi thông tin giỏ hàng lên Backend, Backend sẽ xử lý:

1. Tạo bản ghi đơn hàng mới trong bảng `Order`.
2. Tự động gán ngày đặt hàng.
3. Gán trạng thái mặc định là `0` - chờ duyệt.
4. Duyệt qua danh sách sản phẩm trong giỏ hàng.
5. Thêm từng sản phẩm vào bảng `OrderDetail`.
6. Lấy đúng giá sản phẩm hiện tại để lưu vào `UnitPrice`.
7. Trừ số lượng tồn kho trong bảng `Product`.

Ví dụ dữ liệu đặt hàng:

```json
{
  "customerId": 1,
  "notes": "Giao giờ hành chính",
  "items": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ]
}
```

---

## 4. Các file chính đã thực hiện

Các API được đặt trong thư mục:

```text
CMS.Backend/Controllers/Api
```

Danh sách file đã thêm hoặc chỉnh sửa:

```text
CMS.Backend/Controllers/Api/CategoriesProductsApiController.cs
CMS.Backend/Controllers/Api/ProductsApiController.cs
CMS.Backend/Controllers/Api/PostsApiController.cs
CMS.Backend/Controllers/Api/AuthApiController.cs
CMS.Backend/Controllers/Api/OrdersApiController.cs
CMS.Backend/Program.cs
```

---

## 5. Cấu hình trong Program.cs

Trong buổi 6, file `Program.cs` được cấu hình thêm để hỗ trợ Web API và Frontend ReactJS.

Các phần quan trọng:

- Thêm `MapControllers()` để hệ thống nhận các API Controller.
- Thêm CORS để ReactJS có thể gọi API từ địa chỉ khác cổng.
- Giữ lại cấu hình MVC và Authentication đã làm ở các buổi trước.

Ví dụ cấu hình CORS:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
```

Ví dụ cấu hình API Controller:

```csharp
app.UseCors("ReactPolicy");
app.MapControllers();
```

---

## 6. Kiểm thử API

Có thể kiểm thử API bằng trình duyệt hoặc Postman.

Một số đường dẫn kiểm thử:

```text
GET  /api/CategoriesProducts
GET  /api/Products
GET  /api/Products/1
GET  /api/Products/category/1
GET  /api/Posts
GET  /api/Posts/1
GET  /api/Orders/customer/1
```

Các API dùng phương thức POST nên kiểm thử bằng Postman:

```text
POST /api/Auth/CustomerRegister
POST /api/Auth/CustomerLogin
POST /api/Orders
```

Khi API hoạt động đúng, dữ liệu trả về sẽ có định dạng JSON.

---

## 7. Kết quả đạt được

Sau khi hoàn thành buổi 6, hệ thống đã có đầy đủ API cơ bản để phục vụ Frontend ReactJS:

- ReactJS có thể lấy danh mục sản phẩm để hiển thị menu hoặc bộ lọc.
- ReactJS có thể lấy danh sách sản phẩm và chi tiết sản phẩm.
- ReactJS có thể lấy danh sách bài viết và chi tiết bài viết.
- Khách hàng có thể đăng ký và đăng nhập tài khoản.
- Khách hàng có thể đặt hàng từ giỏ hàng.
- Hệ thống tự động lưu đơn hàng, chi tiết đơn hàng và cập nhật tồn kho.
- Khách hàng có thể xem lại lịch sử mua hàng.

---

## 8. Ý nghĩa của buổi 6

Buổi 6 giúp hệ thống CMS không chỉ hoạt động ở giao diện quản trị ASP.NET Core MVC mà còn có khả năng cung cấp dữ liệu cho một ứng dụng Frontend riêng như ReactJS.

Đây là bước quan trọng để tách rõ vai trò giữa Backend và Frontend:

- **Backend ASP.NET Core:** xử lý dữ liệu, nghiệp vụ, database và API.
- **Frontend ReactJS:** hiển thị giao diện, gọi API và tương tác với người dùng.

Nhờ đó, dự án có cấu trúc rõ ràng hơn, dễ mở rộng và phù hợp với hướng phát triển ứng dụng web hiện đại.


---

## 10. Kết luận

Buổi 6 đã hoàn thiện phần Web API cơ bản cho hệ thống CMS. Các API được xây dựng theo đúng định dạng JSON, có thể kết nối với ReactJS để hiển thị dữ liệu sản phẩm, bài viết, danh mục, xử lý đăng nhập khách hàng và đặt hàng.

Nội dung buổi 6 là nền tảng để phát triển tiếp phần Frontend Client bằng ReactJS và hoàn thiện luồng mua hàng cho hệ thống.
