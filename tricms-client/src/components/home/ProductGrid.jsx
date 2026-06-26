import { useMemo } from "react";
import ProductSection from "./ProductSection";

function buildSections(categories, products) {
    if (categories.length > 0) {
        return categories
            .map((category) => {
                const categoryProducts = products.filter((product) => {
                    return Number(product.categoryProductId) === Number(category.id);
                });

                return {
                    id: category.id,
                    name: category.name,
                    products: categoryProducts
                };
            })
            .filter((section) => section.products.length > 0);
    }

    const grouped = new Map();

    products.forEach((product) => {
        const categoryId = product.categoryProductId || product.categoryProductName || "all";
        const categoryName = product.categoryProductName || "Sản phẩm";

        if (!grouped.has(categoryId)) {
            grouped.set(categoryId, {
                id: categoryId,
                name: categoryName,
                products: []
            });
        }

        grouped.get(categoryId).products.push(product);
    });

    return Array.from(grouped.values());
}

function ProductGrid({ categories = [], products = [] }) {
    const sections = useMemo(() => {
        return buildSections(categories, products);
    }, [categories, products]);

    if (sections.length === 0) {
        return null;
    }

    return (
        <div className="home-product-stack">
            {sections.map((section, index) => (
                <ProductSection
                    section={section}
                    showPromo={index < 2}
                    key={section.id}
                />
            ))}
        </div>
    );
}

export default ProductGrid;
