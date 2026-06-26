import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductPromo from "./ProductPromo";

function ProductSection({ section, showPromo }) {
    const displayProducts = section.products.slice(0, 4);
    const primaryProduct = section.products[0];
    const secondaryProduct = section.products[1];
    const shopLink = typeof section.id === "number" ? `/shop?category=${section.id}` : "/shop";

    return (
        <section className={`home-product-section ${showPromo ? "" : "home-product-section--full"}`}>
            {showPromo && (
                <ProductPromo
                    sectionName={section.name}
                    primaryProduct={primaryProduct}
                    secondaryProduct={secondaryProduct}
                />
            )}

            <div className="home-product-board">
                <div className="home-product-board__header">
                    <h2>{section.name}</h2>
                </div>

                <div className="home-product-list">
                    {displayProducts.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>

                <div className="home-product-board__footer">
                    <Link to={shopLink} className="home-product-more">
                        Xem toàn bộ sản phẩm →
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default ProductSection;
