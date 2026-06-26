import { Link, useNavigate } from "react-router-dom";
import { addCartItem } from "../../utils/cartStorage";
import { formatMoney } from "../../utils/formatters";
import { getImageUrl } from "../../utils/media";

function getDiscount(product) {
    const id = Number(product.id || 0);
    return [2, 4, 8, 11, 12, 13, 25, 29][id % 8];
}

function ProductCard({ product }) {
    const navigate = useNavigate();
    const discount = getDiscount(product);
    const price = Number(product.price || 0);
    const oldPrice = Math.round(price * (1 + discount / 100));
    const isHot = Number(product.stockQuantity || 0) > 5;

    const buyNow = () => {
        addCartItem(product, 1);
        navigate("/cart");
    };

    return (
        <article className="home-product-card">
            <div className="home-product-card__badges">
                <span>Giảm {discount}%</span>
            </div>

            <Link to={`/product/${product.id}`} className="home-product-card__image">
                <img src={getImageUrl(product.imageUrl)} alt={product.name} />
            </Link>

            <div className="home-product-card__labels">
                <span className="home-product-card__label home-product-card__label--new">Mới</span>
                {isHot && (
                    <span className="home-product-card__label home-product-card__label--hot">
                        Nổi bật
                    </span>
                )}
            </div>

            <Link to={`/product/${product.id}`} className="home-product-card__name">
                {product.name}
            </Link>

            <div className="home-product-card__price">{formatMoney(price)}</div>
            <div className="home-product-card__old-price">{formatMoney(oldPrice)}</div>

            <div className="home-product-card__service">
                Bảo hành chính hãng 12 tháng, hỗ trợ đổi trả trong 30 ngày
            </div>

            <div className="home-product-card__actions">
                <button type="button" className="btn btn-primary btn-sm" onClick={buyNow}>
                    Mua ngay
                </button>
                <Link to={`/product/${product.id}`} className="btn btn-outline-primary btn-sm">
                    Chi tiết
                </Link>
            </div>
        </article>
    );
}

export default ProductCard;
