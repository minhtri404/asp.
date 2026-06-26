import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FeaturedCategories from "../../components/home/FeaturedCategories";
import Pagination from "../../components/pagination/Pagination";
import ShopFilters from "../../components/shop/ShopFilters";
import ShopProductCard from "../../components/shop/ShopProductCard";
import { getCategoriesProducts, getProducts } from "../../services/catalogService";

function normalizeText(value) {
    return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase();
}

function toNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) && number >= 0 ? number : 0;
}

function sortProducts(products, sort) {
    const items = [...products];

    return items.sort((first, second) => {
        switch (sort) {
            case "price_asc":
                return Number(first.price || 0) - Number(second.price || 0);
            case "price_desc":
                return Number(second.price || 0) - Number(first.price || 0);
            case "name_asc":
                return String(first.name || "").localeCompare(String(second.name || ""), "vi");
            case "stock_desc":
                return Number(second.stockQuantity || 0) - Number(first.stockQuantity || 0);
            case "newest":
            default:
                return Number(second.id || 0) - Number(first.id || 0);
        }
    });
}

function Shop() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = {
        category: searchParams.get("category") || "",
        keyword: searchParams.get("keyword") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        stock: searchParams.get("stock") || "",
        sort: searchParams.get("sort") || "newest",
        pageSize: searchParams.get("pageSize") || "12"
    };

    const pageValue = Number(searchParams.get("page") || 1);
    const currentPage = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
    const pageSize = Number(filters.pageSize) || 12;

    const loadShopData = useCallback(async () => {
        setLoaded(false);

        try {
            const [categoriesRes, productsRes] = await Promise.all([
                getCategoriesProducts(),
                getProducts()
            ]);

            setCategories(categoriesRes.data);
            setProducts(productsRes.data);
        } catch (error) {
            console.error("Lỗi tải dữ liệu shop:", error);
        } finally {
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        loadShopData();
    }, [loadShopData]);

    const filteredProducts = useMemo(() => {
        const keyword = normalizeText(filters.keyword.trim());
        const minPrice = filters.minPrice ? toNumber(filters.minPrice) : null;
        const maxPrice = filters.maxPrice ? toNumber(filters.maxPrice) : null;
        const categoryId = filters.category ? Number(filters.category) : null;

        const matched = products.filter((product) => {
            const price = Number(product.price || 0);
            const stockQuantity = Number(product.stockQuantity || 0);

            if (categoryId && Number(product.categoryProductId) !== categoryId) {
                return false;
            }

            if (keyword) {
                const searchText = normalizeText(
                    `${product.name || ""} ${product.description || ""} ${product.categoryProductName || ""}`
                );

                if (!searchText.includes(keyword)) {
                    return false;
                }
            }

            if (minPrice !== null && price < minPrice) {
                return false;
            }

            if (maxPrice !== null && price > maxPrice) {
                return false;
            }

            if (filters.stock === "in_stock" && stockQuantity <= 0) {
                return false;
            }

            if (filters.stock === "out_of_stock" && stockQuantity > 0) {
                return false;
            }

            return true;
        });

        return sortProducts(matched, filters.sort);
    }, [filters, products]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedProducts = filteredProducts.slice(
        (safePage - 1) * pageSize,
        safePage * pageSize
    );

    const updateParams = (changes) => {
        const nextParams = new URLSearchParams(searchParams);

        Object.entries(changes).forEach(([key, value]) => {
            if (value === "" || value === null || value === undefined) {
                nextParams.delete(key);
            } else {
                nextParams.set(key, String(value));
            }
        });

        nextParams.delete("page");
        setSearchParams(nextParams);
    };

    const updatePage = (page) => {
        const nextParams = new URLSearchParams(searchParams);

        if (page <= 1) {
            nextParams.delete("page");
        } else {
            nextParams.set("page", String(page));
        }

        setSearchParams(nextParams);
    };

    const resetFilters = () => {
        setSearchParams({});
    };

    useEffect(() => {
        if (loaded && currentPage !== safePage) {
            updatePage(safePage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, loaded, safePage]);

    return (
        <div className="shop-page">
            <FeaturedCategories categories={categories} products={products} />

            <ShopFilters
                filters={filters}
                categories={categories}
                totalItems={filteredProducts.length}
                onFilterChange={updateParams}
                onReset={resetFilters}
            />

            <div className="shop-product-grid">
                {paginatedProducts.map((product) => (
                    <ShopProductCard product={product} key={product.id} />
                ))}
            </div>

            {loaded && filteredProducts.length === 0 && (
                <div className="alert alert-warning">
                    Không có sản phẩm phù hợp với bộ lọc hiện tại.
                </div>
            )}

            <Pagination
                currentPage={safePage}
                totalItems={filteredProducts.length}
                pageSize={pageSize}
                onPageChange={updatePage}
            />
        </div>
    );
}

export default Shop;
