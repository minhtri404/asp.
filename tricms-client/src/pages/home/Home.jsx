import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../../services/catalogService";
import { getPosts } from "../../services/postService";
import { addCartItem } from "../../utils/cartStorage";
import { formatDate, formatMoney } from "../../utils/formatters";
import { getImageUrl, getStaticAssetUrl } from "../../utils/media";

function Home() {
    const [products, setProducts] = useState([]);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const loadHomeData = useCallback(async () => {
        try {
            const productsRes = await getProducts();
            const postsRes = await getPosts();

            setProducts(productsRes.data);
            setPosts(postsRes.data);
        } catch (error) {
            console.error("Lỗi tải dữ liệu trang chủ:", error);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadHomeData();
    }, [loadHomeData]);

    const latestPosts = [...posts]
        .sort((first, second) => {
            return new Date(second.createdDate || 0) - new Date(first.createdDate || 0);
        })
        .slice(0, 3);

    const handleBuyNow = (product) => {
        addCartItem(product, 1);
        navigate("/checkout");
    };

    return (
        <div className="home-page">
            <section className="home-hero">
                <div className="home-hero__content">
                    <p className="home-hero__eyebrow">TriShop công nghệ</p>
                    <h1>iPhone 15 Pro Max</h1>
                    <p className="home-hero__copy">
                        Titan bền nhẹ, camera sắc nét, ưu đãi trả góp và thu cũ lên đời cho khách hàng TriShop.
                    </p>

                    <div className="home-hero__offers">
                        <span>Ưu đãi thu cũ đến 95%</span>
                        <span>Trả góp 0%</span>
                    </div>

                    <div className="home-hero__actions">
                        <Link to="/shop?category=2" className="btn btn-light btn-lg fw-bold">
                            Xem điện thoại
                        </Link>
                        <Link to="/shop" className="btn btn-outline-light btn-lg fw-bold">
                            Mua sắm ngay
                        </Link>
                    </div>
                </div>

                <div className="home-hero__media">
                    <img src={getStaticAssetUrl("/img/iphone.jpg")} alt="iPhone 15" />
                </div>
            </section>

            <section className="home-feature-grid">
                <Link className="home-feature-card" to="/shop?category=2">
                    <img src={getStaticAssetUrl("/img/iphone.jpg")} alt="Điện thoại" />
                    <span>Điện thoại nổi bật</span>
                </Link>
                <Link className="home-feature-card" to="/shop?category=1">
                    <img src={getStaticAssetUrl("/img/laptop.jpg")} alt="Laptop" />
                    <span>Laptop văn phòng</span>
                </Link>
                <Link className="home-feature-card" to="/shop?category=3">
                    <img src={getStaticAssetUrl("/img/headphone.jpg")} alt="Phụ kiện" />
                    <span>Phụ kiện công nghệ</span>
                </Link>
            </section>

            <section className="home-section">
                <div className="home-section__heading">
                    <h2>Sản phẩm mới</h2>
                    <Link to="/shop" className="btn btn-primary btn-sm">
                        Xem tất cả
                    </Link>
                </div>

                <div className="row">
                    {products.slice(0, 8).map((item) => (
                        <div className="col-sm-6 col-lg-3 mb-4" key={item.id}>
                            <div className="card h-100 shadow-sm product-card">
                                <img
                                    src={getImageUrl(item.imageUrl)}
                                    className="card-img-top"
                                    alt={item.name}
                                />

                                <div className="card-body">
                                    <h6 className="card-title">{item.name}</h6>

                                    <p className="text-danger fw-bold">
                                        {formatMoney(item.price)}
                                    </p>

                                    <div className="d-grid gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => handleBuyNow(item)}
                                            disabled={Number(item.stockQuantity) <= 0}
                                        >
                                            {Number(item.stockQuantity) <= 0 ? "Hết hàng" : "Mua ngay"}
                                        </button>

                                        <Link
                                            to={`/product/${item.id}`}
                                            className="btn btn-outline-primary"
                                        >
                                            Xem chi tiết
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {latestPosts.length > 0 && (
                <section className="home-section">
                    <div className="home-section__heading">
                        <h2>Bài viết mới nhất</h2>
                        <Link to="/news" className="btn btn-primary btn-sm">
                            Xem tất cả
                        </Link>
                    </div>

                    <div className="row">
                        {latestPosts.map((item) => (
                            <div className="col-md-4 mb-4" key={item.id}>
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={getImageUrl(item.imageUrl)}
                                        className="card-img-top"
                                        alt={item.title}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />

                                    <div className="card-body">
                                        <div className="text-muted small mb-2">
                                            {item.categoryName || "Tin công nghệ"} · {formatDate(item.createdDate)}
                                        </div>

                                        <h5>{item.title}</h5>

                                        <p className="text-muted">
                                            {item.content
                                                ? item.content.substring(0, 120) + "..."
                                                : "Chưa có nội dung"}
                                        </p>

                                        <Link
                                            to={`/post/${item.id}`}
                                            className="btn btn-outline-secondary btn-sm"
                                        >
                                            Xem bài viết
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default Home;
