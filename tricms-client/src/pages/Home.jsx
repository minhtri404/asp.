import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient, { API_ORIGIN } from "../api/axiosClient";

function Home() {
    const [products, setProducts] = useState([]);
    const [posts, setPosts] = useState([]);

    const loadHomeData = useCallback(async () => {
        try {
            const productsRes = await axiosClient.get("/Products");
            const postsRes = await axiosClient.get("/Posts");

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

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) {
            return "https://via.placeholder.com/400x250?text=No+Image";
        }

        if (imageUrl.startsWith("http")) {
            return imageUrl;
        }

        return `${API_ORIGIN}${imageUrl}`;
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
                    <img src={`${API_ORIGIN}/img/iphone.jpg`} alt="iPhone 15" />
                </div>
            </section>

           <section className="category-section">
    <div className="category-grid">
        {categories.slice(0, 6).map((item) => (
            <Link
                to={`/shop?category=${item.id}`}
                className="category-card"
                key={item.id}
            >
                <img
                    src={
                        item.imageUrl
                            ? `http://localhost:5000${item.imageUrl}`
                            : "https://via.placeholder.com/120x80?text=No+Image"
                    }
                    alt={item.name}
                />

                <div>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                </div>
            </Link>
        ))}
    </div>
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
                                        {Number(item.price).toLocaleString("vi-VN")} đ
                                    </p>

                                    <Link
                                        to={`/product/${item.id}`}
                                        className="btn btn-outline-primary w-100"
                                    >
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {posts.length > 0 && (
                <section className="home-section">
                    <div className="home-section__heading">
                        <h2>Tin công nghệ</h2>
                    </div>

                    <div className="row">
                        {posts.slice(0, 3).map((item) => (
                            <div className="col-md-4 mb-4" key={item.id}>
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={getImageUrl(item.imageUrl)}
                                        className="card-img-top"
                                        alt={item.title}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />

                                    <div className="card-body">
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
