import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CategoryMenu from "./CategoryMenu";
import ProductMegaMenu from "./ProductMegaMenu";
import "./StoreHeader.css";

function StoreHeader({ categories = [], cartCount = 0, customerName, onLogout }) {
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [productMenuOpen, setProductMenuOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        const value = keyword.trim();

        if (value) {
            navigate(`/shop?keyword=${encodeURIComponent(value)}`);
        } else {
            navigate("/shop");
        }
    };

    const handleCategorySelect = (categoryId) => {
        setCategoryOpen(false);
        navigate(`/shop?category=${categoryId}`);
    };

    return (
        <header className="store-header">
            <div className="store-header__promo">
                <span>iPhone 15 Pro</span>
                <strong>Săn hàng công nghệ</strong>
                <Link to="/shop">Xem ngay</Link>
            </div>

            <div className="store-header__main">
                <div className="container store-header__main-inner">
                    <Link className="store-header__brand" to="/">
                        TriShop
                    </Link>

                    <div className="store-header__category">
                        <button
                            className="store-header__category-button"
                            type="button"
                            onClick={() => setCategoryOpen((open) => !open)}
                            aria-expanded={categoryOpen}
                        >
                            <span className="store-header__hamburger" aria-hidden="true">☰</span>
                            Danh mục
                        </button>

                        {categoryOpen && (
                            <div className="store-header__category-panel">
                                <CategoryMenu
                                    categories={categories}
                                    onSelect={handleCategorySelect}
                                />
                            </div>
                        )}
                    </div>

                    <form className="store-header__search" onSubmit={handleSearch}>
                        <input
                            type="search"
                            value={keyword}
                            onChange={(event) => setKeyword(event.target.value)}
                            placeholder="Bạn cần tìm gì..."
                            aria-label="Tìm sản phẩm"
                        />
                        <button type="submit" aria-label="Tìm kiếm">
                            <span aria-hidden="true">⌕</span>
                        </button>
                    </form>

                    <div className="store-header__actions">
                        <a className="store-header__action" href="tel:19006750">
                            <span aria-hidden="true">☎</span>
                            <span>Hotline<br />1900 6750</span>
                        </a>

                        <Link className="store-header__action" to="/orders">
                            <span aria-hidden="true">▣</span>
                            <span>Tra cứu<br />đơn hàng</span>
                        </Link>

                        <Link className="store-header__action" to="/cart">
                            <span aria-hidden="true">▱</span>
                            <span>Giỏ hàng<br />Sản phẩm {cartCount}</span>
                        </Link>

                        {customerName ? (
                            <button className="store-header__account" type="button" onClick={onLogout}>
                                <span aria-hidden="true">●</span>
                                <span>{customerName}<br />Đăng xuất</span>
                            </button>
                        ) : (
                            <Link className="store-header__account" to="/login">
                                <span aria-hidden="true">●</span>
                                <span>Thông tin<br />tài khoản</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <nav className="store-header__nav">
                <div className="container store-header__nav-inner">
                    <NavLink to="/">Trang chủ</NavLink>
                    <NavLink to="/about">Giới thiệu</NavLink>

                    <div
                        className="store-header__nav-product"
                        onMouseEnter={() => setProductMenuOpen(true)}
                        onMouseLeave={() => setProductMenuOpen(false)}
                        onFocus={() => setProductMenuOpen(true)}
                    >
                        <NavLink to="/shop" onClick={() => setProductMenuOpen(false)}>
                            Sản phẩm <span aria-hidden="true">⌃</span>
                        </NavLink>

                        {productMenuOpen && (
                            <ProductMegaMenu categories={categories} />
                        )}
                    </div>

                    <NavLink to="/news">Tin tức</NavLink>
                    <NavLink to="/contact">Câu hỏi thường gặp</NavLink>
                    <NavLink to="/contact">Liên hệ</NavLink>
                </div>
            </nav>
        </header>
    );
}

export default StoreHeader;
