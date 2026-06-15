import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCustomer } from "../../services/authService";

function MemberCreate() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await registerCustomer(formData);

            setMessage(res.data.message || "Thêm thành viên thành công");

            setFormData({
                fullName: "",
                email: "",
                phone: "",
                address: "",
                password: ""
            });

            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            console.error("Lỗi thêm thành viên:", error);

            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Có lỗi xảy ra khi thêm thành viên");
            }
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-7">
                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">Thêm thành viên mới</h4>
                    </div>

                    <div className="card-body">
                        {message && (
                            <div className="alert alert-info">
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
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
                                Lưu thành viên
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MemberCreate;
