import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const customerId = localStorage.getItem("customerId");

            if (!customerId) return;

            const res = await axiosClient.get(
                `/Orders/customer/${customerId}`
            );

            setOrders(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getStatus = (status) => {
        switch (status) {
            case 0:
                return "Chờ xử lý";
            case 1:
                return "Đã xác nhận";
            case 2:
                return "Đang giao";
            case 3:
                return "Hoàn thành";
            case 4:
                return "Đã hủy";
            default:
                return "Không xác định";
        }
    };

    return (
        <div className="container">
            <h2 className="mb-4">
                Đơn hàng của tôi
            </h2>

            {orders.length === 0 ? (
                <div className="alert alert-warning">
                    Chưa có đơn hàng nào
                </div>
            ) : (
                orders.map((order) => (
                    <div
                        key={order.id}
                        className="card mb-4 shadow-sm"
                    >
                        <div className="card-header">
                            <strong>Mã đơn:</strong> #{order.id}
                            <br />

                            <strong>Ngày đặt:</strong>{" "}
                            {new Date(
                                order.orderDate
                            ).toLocaleDateString("vi-VN")}

                            <br />

                            <strong>Trạng thái:</strong>{" "}
                            {getStatus(order.status)}

                            <br />

                            <strong>Tổng tiền:</strong>{" "}
                            {Number(
                                order.totalAmount
                            ).toLocaleString("vi-VN")} đ
                        </div>

                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>SL</th>
                                        <th>Đơn giá</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {order.items.map((item) => (
                                        <tr key={item.productId}>
                                            <td>
                                                {item.productName}
                                            </td>

                                            <td>
                                                {item.quantity}
                                            </td>

                                            <td>
                                                {Number(
                                                    item.unitPrice
                                                ).toLocaleString("vi-VN")} đ
                                            </td>

                                            <td>
                                                {Number(
                                                    item.total
                                                ).toLocaleString("vi-VN")} đ
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {order.notes && (
                                <div>
                                    <strong>Ghi chú:</strong>{" "}
                                    {order.notes}
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Orders;