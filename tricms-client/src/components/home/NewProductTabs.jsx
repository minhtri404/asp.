import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

const tabs = [
    { id: "new", label: "Sản phẩm mới" },
    { id: "featured", label: "Sản phẩm nổi bật" },
    { id: "bestSeller", label: "Sản phẩm bán chạy" }
];

function getProductDateValue(product) {
    const dateValue = product.createdDate || product.createdAt || product.updatedDate || product.updatedAt;

    if (dateValue) {
        const time = new Date(dateValue).getTime();
        return Number.isNaN(time) ? 0 : time;
    }

    return 0;
}

function getNewestProducts(products) {
    return [...products]
        .filter((product) => product && product.id)
        .sort((first, second) => {
            const secondDate = getProductDateValue(second);
            const firstDate = getProductDateValue(first);

            if (secondDate !== firstDate) {
                return secondDate - firstDate;
            }

            return Number(second.id || 0) - Number(first.id || 0);
        })
        .slice(0, 6);
}

function NewProductTabs({ products = [] }) {
    const [activeTab, setActiveTab] = useState("new");

    const newestProducts = useMemo(() => {
        return getNewestProducts(products);
    }, [products]);

    return (
        <section className="new-product-tabs">
            <div className="new-product-tabs__nav" role="tablist" aria-label="Nhóm sản phẩm">
                {tabs.map((tab) => (
                    <button
                        type="button"
                        className={`new-product-tabs__button${activeTab === tab.id ? " is-active" : ""}`}
                        onClick={() => setActiveTab(tab.id)}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        key={tab.id}
                    >
                        <span className="new-product-tabs__icon" aria-hidden="true">
                            {tab.id === "new" ? "New" : tab.id === "featured" ? "Hot" : "Top"}
                        </span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === "new" ? (
                newestProducts.length > 0 ? (
                    <div className="new-product-tabs__grid">
                        {newestProducts.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))}
                    </div>
                ) : (
                    <div className="new-product-tabs__empty">
                        Chưa có sản phẩm mới.
                    </div>
                )
            ) : (
                <div className="new-product-tabs__empty">
                    Nội dung đang được xây dựng.
                </div>
            )}
        </section>
    );
}

export default NewProductTabs;
