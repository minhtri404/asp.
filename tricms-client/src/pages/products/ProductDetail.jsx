import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../services/catalogService";
import { addCartItem } from "../../utils/cartStorage";
import { formatMoney } from "../../utils/formatters";
import { getImageUrl } from "../../utils/media";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const loadProduct = useCallback(async () => {
        try {
            const res = await getProductById(id);
            setProduct(res.data);
        } catch (error) {
            console.error("Lỗi tải chi tiết sản phẩm:", error);
        }
    }, [id]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadProduct();
    }, [loadProduct]);

    const addToCart = () => {
        addCartItem(product, quantity);
        alert("Đã thêm sản phẩm vào giỏ hàng");
    };

    if (!product) {
        return <div className="alert alert-info">Đang tải sản phẩm...</div>;
    }

    return (
        <div>
            <Link to="/shop" className="btn btn-secondary mb-3">
                Quay lại cửa hàng
            </Link>

            <div className="row">
                <div className="col-md-5">
                    <img
                        src={getImageUrl(product.imageUrl, "https://via.placeholder.com/500x400?text=No+Image")}
                        alt={product.name}
                        className="img-fluid rounded shadow-sm"
                        style={{ width: "100%", maxHeight: "450px", objectFit: "cover" }}
                    />
                </div>

                <div className="col-md-7">
                    <h2 className="fw-bold">{product.name}</h2>

                    <p className="text-danger fw-bold fs-4">
                        {formatMoney(product.price)}
                    </p>

                    <p>
                        <strong>Danh mục:</strong>{" "}
                        {product.categoryProductName || "Chưa có danh mục"}
                    </p>

                    <p>
                        <strong>Số lượng tồn kho:</strong>{" "}
                        {product.stockQuantity}
                    </p>

                    <p className="text-muted">
                        {product.description || "Sản phẩm chưa có mô tả."}
                    </p>

                    <div className="mb-3">
                        <label className="form-label">Số lượng mua</label>
                        <input
                            type="number"
                            min="1"
                            max={product.stockQuantity}
                            value={quantity}
                            className="form-control"
                            style={{ width: "150px" }}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-primary me-2" onClick={addToCart}>
                        Thêm vào giỏ hàng
                    </button>

                    <Link to="/cart" className="btn btn-outline-primary">
                        Xem giỏ hàng
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
