import { Link } from "react-router-dom";

function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="container site-footer__inner">
                <div className="site-footer__brand">
                    <h2>TriShop</h2>
                    <p>
                        Cửa hàng công nghệ mẫu chuyên điện thoại, laptop, tablet và phụ kiện.
                        Dữ liệu sản phẩm, danh mục, bài viết được quản lý từ hệ thống Admin.
                    </p>
                </div>

                <div className="site-footer__column">
                    <h3>Thông tin</h3>
                    <Link to="/about">Giới thiệu</Link>
                    <Link to="/news">Tin tức</Link>
                    <Link to="/contact">Liên hệ</Link>
                </div>

                <div className="site-footer__column">
                    <h3>Hỗ trợ</h3>
                    <span>Hotline: 1900 6750</span>
                    <span>Email: support@trishop.vn</span>
                    <span>Thời gian: 8:00 - 21:00</span>
                </div>

                <div className="site-footer__column">
                    <h3>Chính sách mẫu</h3>
                    <span>Bảo hành chính hãng 12 tháng</span>
                    <span>Đổi trả trong 30 ngày</span>
                    <span>Giao hàng toàn quốc</span>
                </div>
            </div>

            <div className="site-footer__bottom">
                <span>© 2026 TriShop. Website mẫu phục vụ bài ASP.NET.</span>
            </div>
        </footer>
    );
}

export default SiteFooter;
