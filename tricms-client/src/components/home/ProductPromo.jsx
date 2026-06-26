import { getImageUrl } from "../../utils/media";

function ProductPromo({ sectionName, primaryProduct, secondaryProduct }) {
    if (!primaryProduct) {
        return null;
    }

    return (
        <aside className="home-product-promo home-product-promo--red">
            <div className="home-product-promo__panel">
                <span className="home-product-promo__brand">TriShop</span>
                <strong>{sectionName}</strong>
                <span>Ưu đãi theo danh mục</span>
                <img src={getImageUrl(primaryProduct.imageUrl)} alt={primaryProduct.name} />
            </div>

            {secondaryProduct && (
                <div className="home-product-promo__panel home-product-promo__panel--light">
                    <strong>Sản phẩm nổi bật</strong>
                    <span>{secondaryProduct.name}</span>
                    <img src={getImageUrl(secondaryProduct.imageUrl)} alt={secondaryProduct.name} />
                </div>
            )}
        </aside>
    );
}

export default ProductPromo;
