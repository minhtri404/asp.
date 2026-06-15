import { useState } from "react";
import { Link } from "react-router-dom";
import { formatMoney } from "../../utils/formatters";
import { getImageUrl } from "../../utils/media";

function Cart() {
    const [cart, setCart] = useState(() => {
        const data = JSON.parse(localStorage.getItem("cart")) || [];
        return data;
    });

    const saveCart = (newCart) => {
        localStorage.setItem("cart", JSON.stringify(newCart));
        setCart(newCart);
    };

    const increaseQuantity = (productId) => {
        const newCart = cart.map((item) => {
            if (item.productId === productId) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }

            return item;
        });

        saveCart(newCart);
    };

    const decreaseQuantity = (productId) => {
        const newCart = cart.map((item) => {
            if (item.productId === productId && item.quantity > 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                };
            }

            return item;
        });

        saveCart(newCart);
    };

    const removeItem = (productId) => {
        const newCart = cart.filter((item) => item.productId !== productId);
        saveCart(newCart);
    };

    const clearCart = () => {
        localStorage.removeItem("cart");
        setCart([]);
    };

    const totalAmount = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    if (cart.length === 0) {
        return (
            <div>
                <h2 className="fw-bold mb-4">Giỏ hàng</h2>

                <div className="alert alert-warning">
                    Giỏ hàng của bạn đang trống.
                </div>

                <Link to="/shop" className="btn btn-primary">
                    Tiếp tục mua hàng
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h2 className="fw-bold mb-4">Giỏ hàng</h2>

            <div className="table-responsive">
                <table className="table table-bordered align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.productId}>
                                <td style={{ width: "120px" }}>
                                    <img
                                        src={getImageUrl(item.imageUrl, "https://via.placeholder.com/100x100?text=No+Image")}
                                        alt={item.name}
                                        style={{
                                            width: "90px",
                                            height: "90px",
                                            objectFit: "cover"
                                        }}
                                    />
                                </td>

                                <td>{item.name}</td>

                                <td>
                                    {formatMoney(item.price)}
                                </td>

                                <td style={{ width: "160px" }}>
                                    <div className="d-flex align-items-center gap-2">
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => decreaseQuantity(item.productId)}
                                        >
                                            -
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => increaseQuantity(item.productId)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>

                                <td className="fw-bold text-danger">
                                    {formatMoney(item.price * item.quantity)}
                                </td>

                                <td>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => removeItem(item.productId)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
                <button className="btn btn-outline-danger" onClick={clearCart}>
                    Xóa toàn bộ giỏ hàng
                </button>

                <div className="text-end">
                    <h4>
                        Tổng tiền:{" "}
                        <span className="text-danger">
                            {formatMoney(totalAmount)}
                        </span>
                    </h4>

                    <Link to="/checkout" className="btn btn-primary mt-2">
                        Tiến hành thanh toán
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Cart;
