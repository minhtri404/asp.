const PRICE_RANGES = [
    { label: "Dưới 5 triệu", min: "", max: "5000000" },
    { label: "5 - 15 triệu", min: "5000000", max: "15000000" },
    { label: "15 - 30 triệu", min: "15000000", max: "30000000" },
    { label: "Trên 30 triệu", min: "30000000", max: "" }
];

function ShopFilters({ filters, categories, totalItems, onFilterChange, onReset }) {
    const handleChange = (name, value) => {
        onFilterChange({ [name]: value });
    };

    const applyPriceRange = (range) => {
        onFilterChange({
            minPrice: range.min,
            maxPrice: range.max
        });
    };

    return (
        <section className="shop-filter-panel" aria-label="Bộ lọc sản phẩm">
            <div className="shop-filter-panel__top">
                <div>
                    <h2>Tất cả sản phẩm</h2>
                    <span>{totalItems} sản phẩm phù hợp</span>
                </div>

                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onReset}>
                    Xóa lọc
                </button>
            </div>

            <div className="shop-filter-grid">
                <label className="shop-filter-field shop-filter-field--wide">
                    <span>Tìm sản phẩm</span>
                    <input
                        type="search"
                        value={filters.keyword}
                        onChange={(event) => handleChange("keyword", event.target.value)}
                        placeholder="Nhập tên sản phẩm, mô tả..."
                    />
                </label>

                <label className="shop-filter-field">
                    <span>Danh mục</span>
                    <select
                        value={filters.category}
                        onChange={(event) => handleChange("category", event.target.value)}
                    >
                        <option value="">Tất cả danh mục</option>
                        {categories.map((category) => (
                            <option value={category.id} key={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="shop-filter-field">
                    <span>Sắp xếp</span>
                    <select
                        value={filters.sort}
                        onChange={(event) => handleChange("sort", event.target.value)}
                    >
                        <option value="newest">Mới nhất</option>
                        <option value="price_asc">Giá thấp đến cao</option>
                        <option value="price_desc">Giá cao đến thấp</option>
                        <option value="name_asc">Tên A-Z</option>
                        <option value="stock_desc">Tồn kho nhiều</option>
                    </select>
                </label>

                <label className="shop-filter-field">
                    <span>Tình trạng</span>
                    <select
                        value={filters.stock}
                        onChange={(event) => handleChange("stock", event.target.value)}
                    >
                        <option value="">Tất cả</option>
                        <option value="in_stock">Còn hàng</option>
                        <option value="out_of_stock">Hết hàng</option>
                    </select>
                </label>

                <label className="shop-filter-field">
                    <span>Giá từ</span>
                    <input
                        type="number"
                        min="0"
                        value={filters.minPrice}
                        onChange={(event) => handleChange("minPrice", event.target.value)}
                        placeholder="0"
                    />
                </label>

                <label className="shop-filter-field">
                    <span>Giá đến</span>
                    <input
                        type="number"
                        min="0"
                        value={filters.maxPrice}
                        onChange={(event) => handleChange("maxPrice", event.target.value)}
                        placeholder="Không giới hạn"
                    />
                </label>

                <label className="shop-filter-field">
                    <span>Số dòng</span>
                    <select
                        value={filters.pageSize}
                        onChange={(event) => handleChange("pageSize", event.target.value)}
                    >
                        <option value="12">12 sản phẩm</option>
                        <option value="24">24 sản phẩm</option>
                        <option value="36">36 sản phẩm</option>
                    </select>
                </label>
            </div>

            <div className="shop-price-ranges">
                {PRICE_RANGES.map((range) => (
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => applyPriceRange(range)}
                        key={range.label}
                    >
                        {range.label}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default ShopFilters;
