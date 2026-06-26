import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../../services/orderService";
import { formatMoney } from "../../utils/formatters";

function validateCheckoutForm(form) {
    const errors = {};
    const phonePattern = /^(0|\+84)[0-9]{9,10}$/;

    if (!form.fullName.trim()) {
        errors.fullName = "Vui lòng nhập họ và tên.";
    } else if (form.fullName.trim().length < 2) {
        errors.fullName = "Họ và tên phải có ít nhất 2 ký tự.";
    }

    if (!form.phone.trim()) {
        errors.phone = "Vui lòng nhập số điện thoại.";
    } else if (!phonePattern.test(form.phone.trim().replace(/\s/g, ""))) {
        errors.phone = "Số điện thoại không hợp lệ.";
    }

    if (!form.address.trim()) {
        errors.address = "Vui lòng nhập địa chỉ giao hàng.";
    } else if (form.address.trim().length < 8) {
        errors.address = "Địa chỉ giao hàng phải rõ ràng hơn.";
    }

    return errors;
}

function Checkout() {
    const [cart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });
    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        address: "",
        notes: ""
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const totalAmount = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const updateForm = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value
        }));

        setErrors((current) => ({
            ...current,
            [field]: ""
        }));
    };

    const handleOrder = async (event) => {
        event.preventDefault();
        const customerId = localStorage.getItem("customerId");
        const nextErrors = validateCheckoutForm(form);

        setErrors(nextErrors);
        setMessage("");

        if (Object.keys(nextErrors).length > 0) {
            setMessage("Vui lòng kiểm tra lại thông tin giao hàng.");
            return;
        }

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

        const contactNotes = [
            `Họ tên: ${form.fullName.trim()}`,
            `Số điện thoại: ${form.phone.trim()}`,
            `Địa chỉ: ${form.address.trim()}`,
            form.notes.trim() ? `Ghi chú: ${form.notes.trim()}` : ""
        ].filter(Boolean).join("\n");

        const orderData = {
            customerId: Number(customerId),
            notes: contactNotes,
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

            if (error.response?.data?.message) {
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
        <form className="checkout-page" onSubmit={handleOrder} noValidate>
            <h2 className="fw-bold mb-4">Thanh toán</h2>

            {message && (
                <div className={`alert ${Object.keys(errors).length > 0 ? "alert-warning" : "alert-info"}`}>
                    {message}
                </div>
            )}

            <div className="row">
                <div className="col-md-8">
                    <div className="card shadow-sm mb-3">
                        <div className="card-header bg-primary text-white">
                            Thông tin giao hàng
                        </div>

                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label" htmlFor="fullName">
                                        Họ và tên <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="fullName"
                                        className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                                        value={form.fullName}
                                        onChange={(event) => updateForm("fullName", event.target.value)}
                                        placeholder="Nguyễn Văn A"
                                    />
                                    {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label" htmlFor="phone">
                                        Số điện thoại <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="phone"
                                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                        value={form.phone}
                                        onChange={(event) => updateForm("phone", event.target.value)}
                                        placeholder="0901234567"
                                    />
                                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="address">
                                    Địa chỉ giao hàng <span className="text-danger">*</span>
                                </label>
                                <textarea
                                    id="address"
                                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                                    rows="3"
                                    value={form.address}
                                    onChange={(event) => updateForm("address", event.target.value)}
                                    placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                                />
                                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                            </div>

                            <div className="mb-0">
                                <label className="form-label" htmlFor="notes">Ghi chú giao hàng</label>
                                <textarea
                                    id="notes"
                                    className="form-control"
                                    rows="3"
                                    value={form.notes}
                                    onChange={(event) => updateForm("notes", event.target.value)}
                                    placeholder="Ví dụ: giao giờ hành chính, gọi trước khi giao..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-header bg-light fw-bold">
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
                                            <td>{formatMoney(item.price)}</td>
                                            <td>{item.quantity}</td>
                                            <td className="text-danger fw-bold">
                                                {formatMoney(item.price * item.quantity)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                                Hệ thống sẽ kiểm tra thông tin bắt buộc trước khi gửi đơn hàng lên API.
                            </p>

                            <button className="btn btn-primary w-100" type="submit">
                                Đặt hàng
                            </button>

                            <Link to="/cart" className="btn btn-outline-secondary w-100 mt-2">
                                Quay lại giỏ hàng
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Checkout;
