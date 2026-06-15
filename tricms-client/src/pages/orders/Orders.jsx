import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrdersByCustomer } from "../../services/orderService";
import { formatDateTime, formatMoney } from "../../utils/formatters";

const statusMap = {
    0: {
        label: "Chờ duyệt",
        className: "text-bg-warning"
    },
    1: {
        label: "Đang giao",
        className: "text-bg-primary"
    },
    2: {
        label: "Đã xong",
        className: "text-bg-success"
    }
};

function getStatus(status) {
    return statusMap[Number(status)] || {
        label: "Không xác định",
        className: "text-bg-secondary"
    };
}

function Orders() {
    const customerId = localStorage.getItem("customerId");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(Boolean(customerId));
    const [message, setMessage] = useState("");

    const loadOrders = useCallback(async () => {
        if (!customerId) {
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const res = await getOrdersByCustomer(customerId);
            setOrders(res.data || []);
        } catch (error) {
            console.error("Lỗi tải lịch sử đơn hàng:", error);
            setMessage("Không thể tải lịch sử đơn hàng. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    }, [customerId]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadOrders();
    }, [loadOrders]);

    if (!customerId) {
        return (
            <div>
                <h2 className="fw-bold mb-4">Lịch sử đơn hàng</h2>

                <div className="alert alert-warning">
                    Bạn cần đăng nhập để xem lịch sử đơn hàng.
                </div>

                <Link to="/login" className="btn btn-primary">
                    Đăng nhập
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Lịch sử đơn hàng</h2>
                    <p className="text-muted">Theo dõi các đơn hàng bạn đã đặt tại TriShop.</p>
                </div>

                <button className="btn btn-outline-primary" onClick={loadOrders} disabled={loading}>
                    {loading ? "Đang tải..." : "Tải lại"}
                </button>
            </div>

            {message && (
                <div className="alert alert-danger">
                    {message}
                </div>
            )}

            {loading && (
                <div className="alert alert-info">
                    Đang tải lịch sử đơn hàng...
                </div>
            )}

            {!loading && orders.length === 0 && !message && (
                <div className="card shadow-sm">
                    <div className="card-body text-center py-5">
                        <h5 className="fw-bold">Bạn chưa có đơn hàng nào</h5>
                        <p className="text-muted mb-4">Các đơn hàng sau khi thanh toán sẽ xuất hiện tại đây.</p>
                        <Link to="/shop" className="btn btn-primary">
                            Mua hàng ngay
                        </Link>
                    </div>
                </div>
            )}

            <div className="d-flex flex-column gap-3">
                {orders.map((order) => {
                    const status = getStatus(order.status);
                    const items = order.items || [];

                    return (
                        <div className="card shadow-sm" key={order.id}>
                            <div className="card-header bg-light">
                                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                                    <div>
                                        <h5 className="mb-1">Đơn hàng #{order.id}</h5>
                                        <div className="text-muted small">
                                            Ngày đặt: {formatDateTime(order.orderDate)}
                                        </div>
                                    </div>

                                    <div className="text-end">
                                        <span className={`badge ${status.className} mb-2`}>
                                            {status.label}
                                        </span>
                                        <div className="fw-bold text-danger">
                                            {formatMoney(order.totalAmount)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                {order.notes && (
                                    <div className="alert alert-secondary py-2">
                                        <strong>Ghi chú:</strong> {order.notes}
                                    </div>
                                )}

                                <div className="table-responsive">
                                    <table className="table table-bordered align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Sản phẩm</th>
                                                <th className="text-end">Giá</th>
                                                <th className="text-center">Số lượng</th>
                                                <th className="text-end">Thành tiền</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {items.map((item) => (
                                                <tr key={`${order.id}-${item.productId}`}>
                                                    <td>{item.productName}</td>
                                                    <td className="text-end">{formatMoney(item.unitPrice)}</td>
                                                    <td className="text-center">{item.quantity}</td>
                                                    <td className="text-end fw-bold">
                                                        {formatMoney(item.total)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Orders;
