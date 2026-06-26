import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeaturedCategories from "../../components/home/FeaturedCategories";
import HeroBanner from "../../components/home/HeroBanner";
import NewProductTabs from "../../components/home/NewProductTabs";
import ProductGrid from "../../components/home/ProductGrid";
import { getCategoriesProducts, getProducts } from "../../services/catalogService";
import { getPosts } from "../../services/postService";
import { formatDate } from "../../utils/formatters";
import { getImageUrl } from "../../utils/media";

function Home() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [posts, setPosts] = useState([]);

    const loadHomeData = useCallback(async () => {
        try {
            const [categoriesRes, productsRes, postsRes] = await Promise.all([
                getCategoriesProducts(),
                getProducts(),
                getPosts()
            ]);

            setCategories(categoriesRes.data);
            setProducts(productsRes.data);
            setPosts(postsRes.data);
        } catch (error) {
            console.error("Lỗi tải dữ liệu trang chủ:", error);
        }
    }, []);

    useEffect(() => {
        loadHomeData();
    }, [loadHomeData]);

    const latestPosts = [...posts]
        .sort((first, second) => {
            return new Date(second.createdDate || 0) - new Date(first.createdDate || 0);
        })
        .slice(0, 3);

    return (
        <div className="home-page">
            <HeroBanner />

            <FeaturedCategories categories={categories} products={products} />

            <NewProductTabs products={products} />

            <ProductGrid categories={categories} products={products} />

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
