import { Link } from "react-router-dom";
import { getStaticAssetUrl } from "../../utils/media";

const serviceHighlights = [
    {
        title: "Sản phẩm rõ nguồn gốc",
        description: "Danh mục được chọn lọc từ laptop, điện thoại đến phụ kiện, có thông tin giá và tồn kho minh bạch."
    },
    {
        title: "Tư vấn đúng nhu cầu",
        description: "Đội ngũ TriShop ưu tiên cấu hình, ngân sách và mục đích sử dụng thay vì chỉ bán sản phẩm đắt nhất."
    },
    {
        title: "Hỗ trợ sau mua",
        description: "Theo dõi đơn hàng, hỗ trợ bảo hành và giải đáp kỹ thuật trong suốt quá trình sử dụng."
    }
];

const faqItems = [
    {
        question: "TriShop bán những nhóm sản phẩm nào?",
        answer: "TriShop tập trung vào điện thoại, laptop, thiết bị âm thanh, phụ kiện công nghệ và các sản phẩm phục vụ học tập, làm việc."
    },
    {
        question: "Tôi có thể kiểm tra đơn hàng ở đâu?",
        answer: "Bạn có thể vào mục Tra cứu đơn hàng trên thanh menu để xem lịch sử và trạng thái đơn hàng sau khi đăng nhập."
    },
    {
        question: "TriShop có hỗ trợ tư vấn trước khi mua không?",
        answer: "Có. Bạn có thể gửi yêu cầu ở form bên dưới hoặc gọi hotline 1900 6750 để được tư vấn sản phẩm phù hợp."
    },
    {
        question: "Thông tin sản phẩm có cập nhật theo API không?",
        answer: "Có. Danh sách sản phẩm, bài viết và đơn hàng được lấy từ hệ thống API backend của TriCMS."
    }
];

function About() {
    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="about-hero__content">
                    <span className="about-eyebrow">Về TriShop</span>
                    <h1>Đồng hành cùng khách hàng trong từng lựa chọn công nghệ</h1>
                    <p>
                        TriShop là cửa hàng công nghệ xây dựng trên nền tảng TriCMS, hướng tới trải nghiệm mua sắm rõ ràng,
                        nhanh chóng và đáng tin cậy cho khách hàng cá nhân, sinh viên và nhân viên văn phòng.
                    </p>

                    <div className="about-hero__actions">
                        <Link to="/shop" className="btn btn-primary btn-lg fw-bold">
                            Khám phá sản phẩm
                        </Link>
                        <Link to="/contact" className="btn btn-outline-primary btn-lg fw-bold">
                            Liên hệ tư vấn
                        </Link>
                    </div>
                </div>

                <div className="about-hero__media">
                    <img src={getStaticAssetUrl("/img/laptop.jpg")} alt="Không gian tư vấn công nghệ TriShop" />
                </div>
            </section>

            <section className="about-stats" aria-label="Số liệu nổi bật">
                <div>
                    <strong>4+</strong>
                    <span>Nhóm sản phẩm chính</span>
                </div>
                <div>
                    <strong>24/7</strong>
                    <span>Tra cứu đơn hàng online</span>
                </div>
                <div>
                    <strong>1900</strong>
                    <span>Hotline hỗ trợ khách hàng</span>
                </div>
                <div>
                    <strong>100%</strong>
                    <span>Dữ liệu bán hàng qua API</span>
                </div>
            </section>

            <section className="about-section">
                <div className="about-section__heading">
                    <span className="about-eyebrow">Cam kết dịch vụ</span>
                    <h2>Mua sắm dễ hiểu, xử lý đơn hàng rõ ràng</h2>
                </div>

                <div className="row g-4">
                    {serviceHighlights.map((item) => (
                        <div className="col-md-4" key={item.title}>
                            <div className="about-card h-100">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="about-grid">
                <div className="about-panel">
                    <div className="about-section__heading">
                        <span className="about-eyebrow">Câu hỏi thường gặp</span>
                        <h2>Những điều khách hàng hay hỏi</h2>
                    </div>

                    <div className="about-faq">
                        {faqItems.map((item, index) => (
                            <details key={item.question} open={index === 0}>
                                <summary>{item.question}</summary>
                                <p>{item.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>

                <aside className="about-contact-card">
                    <h2>Nhận tư vấn nhanh</h2>
                    <p>
                        Để lại thông tin, TriShop sẽ hỗ trợ chọn sản phẩm phù hợp với nhu cầu học tập, làm việc hoặc giải trí.
                    </p>

                    <form>
                        <input type="text" className="form-control" placeholder="Họ và tên" required />
                        <input type="tel" className="form-control" placeholder="Điện thoại" required />
                        <input type="email" className="form-control" placeholder="Email" />
                        <textarea className="form-control" rows="4" placeholder="Nhu cầu tư vấn"></textarea>
                        <button
                            type="button"
                            className="btn btn-primary w-100 fw-bold"
                            onClick={() => alert("TriShop đã ghi nhận thông tin tư vấn của bạn.")}
                        >
                            Gửi thông tin
                        </button>
                    </form>
                </aside>
            </section>
        </div>
    );
}

export default About;
