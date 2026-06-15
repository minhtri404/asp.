import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerCustomer } from "../../services/authService";

function Register() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await registerCustomer(formData);

            setMessage(res.data.message || "Đăng ký thành công");

            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            console.error("Lỗi đăng ký:", error);

            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Có lỗi xảy ra khi đăng ký");
            }
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">Đăng ký khách hàng</h4>
                    </div>

                    <div className="card-body">
                        {message && (
                            <div className="alert alert-info">
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label className="form-label">Họ tên</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    className="form-control"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Số điện thoại</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Địa chỉ</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Mật khẩu</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Đăng ký
                            </button>
                        </form>

                        <div className="text-center mt-3">
                            Đã có tài khoản?{" "}
                            <Link to="/login">Đăng nhập</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
