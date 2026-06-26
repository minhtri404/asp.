import { Link, useNavigate } from "react-router-dom";
import { addCartItem } from "../../utils/cartStorage";
import { formatMoney } from "../../utils/formatters";
import { getImageUrl } from "../../utils/media";

function ShopProductCard({ product }) {
    const navigate = useNavigate();
    const stockQuantity = Number(product.stockQuantity || 0);

    const buyNow = () => {
        addCartItem(product, 1);
        navigate("/cart");
    };

    return (
        <article className="shop-product-card">
            <Link to={`/product/${product.id}`} className="shop-product-card__image">
                <img src={getImageUrl(product.imageUrl)} alt={product.name} />
            </Link>

            <div className="shop-product-card__body">
                <span className="shop-product-card__category">
                    {product.categoryProductName || "Sản phẩm"}
                </span>

                <Link to={`/product/${product.id}`} className="shop-product-card__name">
                    {product.name}
                </Link>

                <div className="shop-product-card__price">{formatMoney(product.price)}</div>

                <div className={`shop-product-card__stock ${stockQuantity > 0 ? "" : "is-empty"}`}>
                    {stockQuantity > 0 ? `Còn ${stockQuantity} sản phẩm` : "Hết hàng"}
                </div>

                <div className="shop-product-card__actions">
                    <button type="button" className="btn btn-primary btn-sm" onClick={buyNow}>
                        Mua ngay
                    </button>
                    <Link to={`/product/${product.id}`} className="btn btn-outline-primary btn-sm">
                        Chi tiết
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default ShopProductCard;
