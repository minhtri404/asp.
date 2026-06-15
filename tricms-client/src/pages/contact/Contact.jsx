function Contact() {
    return (
        <div>
            <div className="mb-4">
                <h2 className="fw-bold mb-1">Liên hệ</h2>
                <p className="text-muted mb-0">TriShop luôn sẵn sàng hỗ trợ tư vấn sản phẩm, đơn hàng và bảo hành.</p>
            </div>

            <div className="row g-4">
                <div className="col-lg-5">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="fw-bold mb-3">Thông tin liên hệ</h5>

                            <div className="d-flex flex-column gap-3">
                                <div>
                                    <div className="fw-bold">Hotline</div>
                                    <a href="tel:19006750" className="text-decoration-none">1900 6750</a>
                                </div>

                                <div>
                                    <div className="fw-bold">Email</div>
                                    <a href="mailto:support@trishop.vn" className="text-decoration-none">support@trishop.vn</a>
                                </div>

                                <div>
                                    <div className="fw-bold">Địa chỉ</div>
                                    <div className="text-muted">123 Công Nghệ, Quận 1, TP. Hồ Chí Minh</div>
                                </div>

                                <div>
                                    <div className="fw-bold">Giờ làm việc</div>
                                    <div className="text-muted">08:00 - 21:00, Thứ 2 đến Chủ nhật</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-7">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="fw-bold mb-3">Gửi yêu cầu hỗ trợ</h5>

                            <form>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Họ tên</label>
                                        <input type="text" className="form-control" required />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Số điện thoại</label>
                                        <input type="tel" className="form-control" required />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Nội dung</label>
                                    <textarea className="form-control" rows="5" required></textarea>
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => alert("TriShop đã ghi nhận yêu cầu của bạn.")}
                                >
                                    Gửi liên hệ
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
