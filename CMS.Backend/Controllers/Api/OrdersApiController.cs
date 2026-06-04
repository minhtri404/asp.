//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:04/06/2026
//Mo ta: API xu ly dat hang va xem lich su don hang cua khach hang

using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers.Api
{
    [Route("api/Orders")]
    [ApiController]
    public class OrdersApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(CreateOrderRequest request)
        {
            var customer = await _context.Customers.FindAsync(request.CustomerId);

            if (customer == null)
            {
                return BadRequest(new
                {
                    message = "Khách hàng không tồn tại"
                });
            }

            if (request.Items == null || request.Items.Count == 0)
            {
                return BadRequest(new
                {
                    message = "Giỏ hàng không có sản phẩm"
                });
            }

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var order = new Order
                {
                    CustomerId = request.CustomerId,
                    OrderDate = DateTime.Now,
                    Status = 0,
                    Notes = request.Notes
                };

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                foreach (var item in request.Items)
                {
                    var product = await _context.Products.FindAsync(item.ProductId);

                    if (product == null)
                    {
                        return BadRequest(new
                        {
                            message = $"Sản phẩm ID {item.ProductId} không tồn tại"
                        });
                    }

                    if (product.StockQuantity < item.Quantity)
                    {
                        return BadRequest(new
                        {
                            message = $"Sản phẩm {product.Name} không đủ số lượng tồn kho"
                        });
                    }

                    var orderDetail = new OrderDetail
                    {
                        OrderId = order.Id,
                        ProductId = product.Id,
                        Quantity = item.Quantity,
                        UnitPrice = product.Price
                    };

                    _context.OrderDetails.Add(orderDetail);

                    product.StockQuantity -= item.Quantity;
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new
                {
                    message = "Đặt hàng thành công",
                    orderId = order.Id
                });
            }
            catch
            {
                await transaction.RollbackAsync();

                return StatusCode(500, new
                {
                    message = "Có lỗi xảy ra khi đặt hàng"
                });
            }
        }

        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> GetOrdersByCustomer(int customerId)
        {
            var orders = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.Product)
                .Where(o => o.CustomerId == customerId)
                .OrderByDescending(o => o.OrderDate)
                .Select(o => new
                {
                    o.Id,
                    o.OrderDate,
                    o.Status,
                    o.Notes,
                    CustomerName = o.Customer.FullName,
                    TotalAmount = o.OrderDetails.Sum(od => od.Quantity * od.UnitPrice),
                    Items = o.OrderDetails.Select(od => new
                    {
                        od.ProductId,
                        ProductName = od.Product.Name,
                        od.Quantity,
                        od.UnitPrice,
                        Total = od.Quantity * od.UnitPrice
                    })
                })
                .ToListAsync();

            return Ok(orders);
        }
    }

    public class CreateOrderRequest
    {
        public int CustomerId { get; set; }
        public string? Notes { get; set; }
        public List<CreateOrderItemRequest> Items { get; set; }
    }

    public class CreateOrderItemRequest
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}