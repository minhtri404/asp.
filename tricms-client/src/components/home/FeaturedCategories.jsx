import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/media";

function getCategoryImage(category, products) {
    const matchedProduct = products.find((product) => {
        return Number(product.categoryProductId) === Number(category.id);
    });

    return getImageUrl(matchedProduct?.imageUrl);
}

function FeaturedCategories({ categories = [], products = [] }) {
    const visibleCategories = categories.slice(0, 6);

    if (visibleCategories.length === 0) {
        return null;
    }

    return (
        <section className="home-feature-section">
            <div className="home-section__heading home-section__heading--compact">
                <h2>DANH MỤC NỔI BẬT</h2>
            </div>

            <div className="home-feature-grid">
                {visibleCategories.map((category) => (
                    <Link
                        className="home-feature-card"
                        to={`/shop?category=${category.id}`}
                        key={category.id}
                    >
                        <img src={getCategoryImage(category, products)} alt={category.name} />
                        <span>{category.name}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default FeaturedCategories;
