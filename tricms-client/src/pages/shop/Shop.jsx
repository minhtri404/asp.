import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
    getCategoriesProducts,
    getProducts,
    getProductsByCategory
} from "../../services/catalogService";
import Pagination from "../../components/pagination/Pagination";
import { formatMoney } from "../../utils/formatters";
import { getImageUrl } from "../../utils/media";

const PRODUCT_PAGE_SIZE = 12;

function Shop() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const categoryId = searchParams.get("category");
    const keyword = searchParams.get("keyword") || "";
    const pageValue = Number(searchParams.get("page") || 1);
    const currentPage = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
    const selectedCategory = categories.find((item) => Number(item.id) === Number(categoryId));

    const filteredProducts = products.filter((item) => {
        const value = keyword.trim().toLowerCase();

        if (!value) {
            return true;
        }

        const text = `${item.name || ""} ${item.description || ""} ${item.categoryProductName || ""}`.toLowerCase();
        return text.includes(value);
    });

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCT_PAGE_SIZE));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedProducts = filteredProducts.slice(
        (safePage - 1) * PRODUCT_PAGE_SIZE,
        safePage * PRODUCT_PAGE_SIZE
    );

    const updatePage = (page) => {
        const nextParams = new URLSearchParams(searchParams);

        if (page <= 1) {
            nextParams.delete("page");
        } else {
            nextParams.set("page", String(page));
        }

        setSearchParams(nextParams);
    };

    const loadCategories = useCallback(async () => {
        try {
            const res = await getCategoriesProducts();
            setCategories(res.data);
        } catch (error) {
            console.error("Lỗi tải danh mục:", error);
        }
    }, []);

    const loadProducts = useCallback(async () => {
        setProductsLoaded(false);

        try {
            let res;

            if (categoryId) {
                res = await getProductsByCategory(categoryId);
            } else {
                res = await getProducts();
            }

            setProducts(res.data);
        } catch (error) {
            console.error("Lỗi tải sản phẩm:", error);
        } finally {
            setProductsLoaded(true);
        }
    }, [categoryId]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadCategories();
    }, [loadCategories]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadProducts();
    }, [loadProducts]);

    useEffect(() => {
        if (productsLoaded && currentPage !== safePage) {
            updatePage(safePage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, productsLoaded, safePage]);

    return (
        <div className="shop-page">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Sản phẩm</h2>
                    <p className="text-muted">Chọn danh mục ở đầu trang hoặc tìm nhanh sản phẩm bạn cần.</p>
                </div>
                <span className="text-muted">{filteredProducts.length} sản phẩm</span>
            </div>

            <div className="shop-filter-bar">
                <button
                    className={`btn btn-sm ${!categoryId && !keyword ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setSearchParams({})}
                >
                    Tất cả sản phẩm
                </button>

                {selectedCategory && (
                    <span className="badge text-bg-light">
                        Danh mục: {selectedCategory.name}
                    </span>
                )}

                {keyword && (
                    <span className="badge text-bg-light">
                        Tìm kiếm: {keyword}
                    </span>
                )}
            </div>

            <div className="row">
                {paginatedProducts.map((item) => (
                    <div className="col-sm-6 col-lg-3 mb-4" key={item.id}>
                        <div className="card h-100 shadow-sm product-card">
                            <img
                                src={getImageUrl(item.imageUrl)}
                                className="card-img-top"
                                alt={item.name}
                            />

                            <div className="card-body">
                                <h6 className="card-title">{item.name}</h6>

                                <p className="text-danger fw-bold">
                                    {formatMoney(item.price)}
                                </p>

                                <Link
                                    to={`/product/${item.id}`}
                                    className="btn btn-outline-primary w-100"
                                >
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="alert alert-warning">
                    Không có sản phẩm phù hợp.
                </div>
            )}

            <Pagination
                currentPage={safePage}
                totalItems={filteredProducts.length}
                pageSize={PRODUCT_PAGE_SIZE}
                onPageChange={updatePage}
            />
        </div>
    );
}

export default Shop;
