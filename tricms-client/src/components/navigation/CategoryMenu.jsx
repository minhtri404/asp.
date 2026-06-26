import { Link } from "react-router-dom";
import "./CategoryMenu.css";

function normalizeText(value) {
    return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase();
}

function getCategoryIconType(name) {
    const value = normalizeText(name);

    if (value.includes("mac") || value.includes("laptop")) return "laptop";
    if (value.includes("ipad")) return "tablet";
    if (value.includes("airpod") || value.includes("am thanh")) return "audio";
    return "phone"; 
}

function CategoryIcon({ type }) {
    return (
        <svg className="category-menu__icon" viewBox="0 0 24 24" aria-hidden="true">
            {(type === "phone" || type === "tablet") && (
                <>
                    <rect x="8" y="3" width="8" height="18" rx="1.8" />
                    <path d="M11 18h2" />
                </>
            )}
            {type === "laptop" && (
                <>
                    <path d="M5 6h14v10H5z" />
                    <path d="M3 19h18" />
                    <path d="M8 16l-1 3" />
                    <path d="M16 16l1 3" />
                </>
            )}
            {type === "audio" && (
                <>
                    <path d="M9 18V6l9-2v12" />
                    <circle cx="6.5" cy="18" r="2.5" />
                    <circle cx="15.5" cy="16" r="2.5" />
                </>
            )}
        </svg>
    );
}

function CategoryMenu({ categories = [], selectedId, onSelect }) {
    const items = [...categories].sort((first, second) => {
        return first.name.localeCompare(second.name, "vi");
    });

    if (items.length === 0) {
        return null;
    }

    const renderContent = (item, active) => (
        <>
            <CategoryIcon type={getCategoryIconType(item.name)} />
            <span className="category-menu__label">{item.name}</span>
            <span className="category-menu__chevron">›</span>
            {active && <span className="visually-hidden">Đang chọn</span>}
        </>
    );

    return (
        <nav className="category-menu" aria-label="Danh mục sản phẩm">
            {items.map((item) => {
                const categoryId = Number(item.id);
                const active = Number(selectedId) === categoryId;
                const className = `category-menu__item${active ? " category-menu__item--active" : ""}`;

                if (onSelect) {
                    return (
                        <button
                            type="button"
                            key={item.id}
                            className={className}
                            onClick={() => onSelect(categoryId)}
                        >
                            {renderContent(item, active)}
                        </button>
                    );
                }

                return (
                    <Link
                        key={item.id}
                        className={className}
                        to={`/shop?category=${categoryId}`}
                    >
                        {renderContent(item, active)}
                    </Link>
                );
            })}
        </nav>
    );
}

export default CategoryMenu;
