import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../../services/orderService";
import { formatMoney } from "../../utils/formatters";

function Checkout() {
    const [cart] = useState(() => {
        const data = JSON.parse(localStorage.getItem("cart")) || [];
        return data;
    });
    const [notes, setNotes] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const totalAmount = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const handleOrder = async () => {
        const customerId = localStorage.getItem("customerId");

        if (!customerId) {
            alert("Bạn cần đăng nhập khách hàng trước khi đặt hàng");
            navigate("/login");
            return;
        }

        if (cart.length === 0) {
            alert("Giỏ hàng đang trống");
            navigate("/shop");
            return;
        }

        const orderData = {
            customerId: Number(customerId),
            notes: notes,
            items: cart.map((item) => ({
                productId: item.productId,
                quantity: item.quantity
            }))
        };

        try {
            const res = await createOrder(orderData);

            setMessage(res.data.message || "Đặt hàng thành công");

            localStorage.removeItem("cart");

            setTimeout(() => {
                navigate("/orders");
            }, 1200);
        } catch (error) {
            console.error("Lỗi đặt hàng:", error);

            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Có lỗi xảy ra khi đặt hàng");
            }
        }
    };

    if (cart.length === 0) {
        return (
            <div>
                <h2 className="fw-bold mb-4">Thanh toán</h2>

                <div className="alert alert-warning">
                    Giỏ hàng đang trống, không thể thanh toán.
                </div>

                <Link to="/shop" className="btn btn-primary">
                    Quay lại cửa hàng
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h2 className="fw-bold mb-4">Thanh toán</h2>

            {message && (
                <div className="alert alert-info">
                    {message}
                </div>
            )}

            <div className="row">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            Thông tin đơn hàng
                        </div>

                        <div className="card-body">
                            <table className="table table-bordered align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {cart.map((item) => (
                                        <tr key={item.productId}>
                                            <td>{item.name}</td>
                                            <td>
                                                {formatMoney(item.price)}
                                            </td>
                                            <td>{item.quantity}</td>
                                            <td className="text-danger fw-bold">
                                                {formatMoney(item.price * item.quantity)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="mb-3">
                                <label className="form-label">Ghi chú giao hàng</label>
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao..."
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-light fw-bold">
                            Tổng thanh toán
                        </div>

                        <div className="card-body">
                            <h4 className="text-danger">
                                {formatMoney(totalAmount)}
                            </h4>

                            <p className="text-muted">
                                Sau khi bấm đặt hàng, dữ liệu sẽ được gửi lên API
                                <strong> POST /api/Orders</strong>.
                            </p>

                            <button
                                className="btn btn-primary w-100"
                                onClick={handleOrder}
                            >
                                Đặt hàng
                            </button>

                            <Link to="/cart" className="btn btn-outline-secondary w-100 mt-2">
                                Quay lại giỏ hàng
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
