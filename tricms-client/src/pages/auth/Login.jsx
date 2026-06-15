import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginCustomer } from "../../services/authService";

    function Login() {
        const [formData, setFormData] = useState({
            email: "",
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

        const handleLogin = async (e) => {
            e.preventDefault();

            try {
                const res = await loginCustomer(formData);

                localStorage.setItem("customerId", res.data.customer.id);
                localStorage.setItem("customerName", res.data.customer.fullName);
                localStorage.setItem("customerEmail", res.data.customer.email);

    
    window.dispatchEvent(new Event("loginSuccess"));

    setMessage("Đăng nhập thành công");

    setTimeout(() => {
        navigate("/");
    }, 800);
            } catch (error) {
                console.error("Lỗi đăng nhập:", error);

                if (error.response && error.response.data && error.response.data.message) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage("Email hoặc mật khẩu không đúng");
                }
            }
        };

        return (
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h4 className="mb-0">Đăng nhập khách hàng</h4>
                        </div>

                        <div className="card-body">
                            {message && (
                                <div className="alert alert-info">
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleLogin}>
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
                                    Đăng nhập
                                </button>
                            </form>

                            <div className="text-center mt-3">
                                Chưa có tài khoản?{" "}
                                <Link to="/register">Đăng ký ngay</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    export default Login;
