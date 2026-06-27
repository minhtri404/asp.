import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../services/catalogService";
import { addCartItem } from "../../utils/cartStorage";
import { formatMoney } from "../../utils/formatters";
import { getImageUrl } from "../../utils/media";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cartMessage, setCartMessage] = useState("");

    const loadProduct = useCallback(async () => {
        try {
            const res = await getProductById(id);
            setProduct(res.data);
        } catch (error) {
            console.error("Lỗi tải chi tiết sản phẩm:", error);
        }
    }, [id]);

    useEffect(() => {
        loadProduct();
    }, [loadProduct]);

    const safeQuantity = Math.max(1, Number(quantity) || 1);

    const addToCart = () => {
        if (!product) {
            return;
        }

        addCartItem(product, safeQuantity);
        setCartMessage(`Đã thêm ${safeQuantity} sản phẩm vào giỏ hàng.`);
    };

    const buyNow = () => {
        if (!product) {
            return;
        }

        addCartItem(product, safeQuantity);
        navigate("/cart");
    };

    if (!product) {
        return <div className="alert alert-info">Đang tải sản phẩm...</div>;
    }

    const stockQuantity = Number(product.stockQuantity || 0);

    return (
        <div className="product-detail-page">
            <Link to="/shop" className="btn btn-outline-secondary mb-3">
                ← Quay lại cửa hàng
            </Link>

            <section className="product-detail">
                <div className="product-detail__media">
                    <img
                        src={getImageUrl(product.imageUrl, "https://via.placeholder.com/500x400?text=No+Image")}
                        alt={product.name}
                    />
                </div>

                <div className="product-detail__content">
                    <span className="product-detail__category">
                        {product.categoryProductName || "Chưa có danh mục"}
                    </span>

                    <h1>{product.name}</h1>

                    <div className="product-detail__price">
                        {formatMoney(product.price)}
                    </div>

                    <div className="product-detail__meta">
                        <span className={stockQuantity > 0 ? "is-available" : "is-empty"}>
                            {stockQuantity > 0 ? `Còn ${stockQuantity} sản phẩm` : "Hết hàng"}
                        </span>
                        <span>Bảo hành chính hãng 12 tháng</span>
                        <span>Đổi trả trong 30 ngày</span>
                    </div>

                    <div className="product-detail__description">
                        <h2>Mô tả sản phẩm</h2>
                        <p>{product.description || "Sản phẩm chưa có mô tả chi tiết."}</p>
                    </div>

                    <div className="product-detail__quantity">
                        <label htmlFor="quantity">Số lượng</label>
                        <input
                            id="quantity"
                            type="number"
                            min="1"
                            max={stockQuantity || 999}
                            value={quantity}
                            onChange={(event) => setQuantity(event.target.value)}
                        />
                    </div>

                    {cartMessage && (
                        <div className="alert alert-success mb-0">
                            {cartMessage}{" "}
                            <Link to="/cart" className="alert-link">
                                Xem giỏ hàng
                            </Link>
                        </div>
                    )}

                    <div className="product-detail__actions">
                        <button type="button" className="btn btn-primary" onClick={buyNow}>
                            Mua ngay
                        </button>
                        <button type="button" className="btn btn-outline-primary" onClick={addToCart}>
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </section>

            <section className="product-detail-info">
                <h2>Thông tin mua hàng</h2>
                <div className="product-detail-info__grid">
                    <div>
                        <strong>Giao hàng</strong>
                        <p>Giao hàng toàn quốc, hỗ trợ kiểm tra sản phẩm khi nhận.</p>
                    </div>
                    <div>
                        <strong>Thanh toán</strong>
                        <p>Hỗ trợ thanh toán khi nhận hàng hoặc chuyển khoản.</p>
                    </div>
                    <div>
                        <strong>Bảo hành</strong>
                        <p>Sản phẩm được bảo hành theo chính sách của cửa hàng.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductDetail;
