import { Link } from "react-router-dom";
import "./CategoryMenu.css";

const defaultCategories = [
    { key: "phone", label: "Điện thoại", aliases: ["dien thoai", "phone"], hasChildren: true },
    { key: "laptop", label: "Laptop, PC, Màn hình", aliases: ["laptop", "pc", "man hinh"], hasChildren: true },
    { key: "tablet", label: "Tablet", aliases: ["tablet"] },
    { key: "audio", label: "Âm thanh", aliases: ["am thanh", "audio", "tai nghe"], hasChildren: true },
    { key: "watch", label: "Đồng hồ", aliases: ["dong ho", "watch"], hasChildren: true },
    { key: "smart-home", label: "Nhà thông minh", aliases: ["nha thong minh", "smart home"], highlighted: true },
    { key: "accessory", label: "Phụ kiện", aliases: ["phu kien", "phụ kiện"] },
    { key: "used", label: "Thu cũ", aliases: ["thu cu"] },
    { key: "old-stock", label: "Hàng cũ", aliases: ["hang cu"] },
    { key: "sim", label: "Sim thẻ", aliases: ["sim", "sim the"] },
    { key: "news", label: "Tin công nghệ", aliases: ["tin cong nghe", "tin tức", "news"] },
    { key: "promo", label: "Khuyến mại", aliases: ["khuyen mai", "khuyến mại", "promotion"] }
];

function normalizeText(value) {
    return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase();
}

function findCategory(categories, item) {
    return categories.find((category) => {
        const name = normalizeText(category.name);
        return item.aliases.some((alias) => name.includes(normalizeText(alias)));
    });
}

function CategoryIcon({ type }) {
    return (
        <svg className="category-menu__icon" viewBox="0 0 24 24" aria-hidden="true">
            {type === "phone" && (
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
            {type === "tablet" && (
                <>
                    <rect x="7" y="3" width="10" height="18" rx="1.5" />
                    <path d="M11 18h2" />
                </>
            )}
            {type === "audio" && (
                <>
                    <path d="M9 18V6l9-2v12" />
                    <circle cx="6.5" cy="18" r="2.5" />
                    <circle cx="15.5" cy="16" r="2.5" />
                </>
            )}
            {type === "watch" && (
                <>
                    <path d="M9 3h6l1 4H8z" />
                    <rect x="7" y="7" width="10" height="10" rx="3" />
                    <path d="M8 17h8l-1 4H9z" />
                    <path d="M12 10v3l2 1" />
                </>
            )}
            {type === "smart-home" && (
                <>
                    <path d="M4 11l8-6 8 6" />
                    <path d="M6 10v9h12v-9" />
                    <path d="M9 19v-5h6v5" />
                    <path d="M8 11h8" />
                </>
            )}
            {type === "accessory" && (
                <>
                    <path d="M8 15l8-8" />
                    <path d="M6 13l5 5" />
                    <path d="M13 5l6 6" />
                    <path d="M5 16l3 3" />
                </>
            )}
            {type === "used" && (
                <>
                    <path d="M4 12l8-7 8 7-8 7z" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M16 8l2-2" />
                </>
            )}
            {type === "old-stock" && (
                <>
                    <path d="M4 12a8 8 0 0 1 13-6" />
                    <path d="M17 3v5h-5" />
                    <path d="M20 12a8 8 0 0 1-13 6" />
                    <path d="M7 21v-5h5" />
                </>
            )}
            {type === "sim" && (
                <>
                    <path d="M7 3h7l3 3v15H7z" />
                    <path d="M10 10h4v6h-4z" />
                    <path d="M10 13h4" />
                </>
            )}
            {type === "news" && (
                <>
                    <path d="M4 6h16v13H4z" />
                    <path d="M7 9h10" />
                    <path d="M7 12h10" />
                    <path d="M7 15h6" />
                </>
            )}
            {(type === "promo" || !defaultCategories.some((item) => item.key === type)) && (
                <>
                    <path d="M4 12l8-8h7v7l-8 8z" />
                    <circle cx="16" cy="8" r="1.4" />
                </>
            )}
        </svg>
    );
}

function CategoryMenu({ categories = [], selectedId, onSelect }) {
    const extraCategories = categories.filter((category) => {
        return !defaultCategories.some((item) => findCategory([category], item));
    });

    const items = [
        ...defaultCategories.map((item) => ({
            ...item,
            category: findCategory(categories, item)
        })),
        ...extraCategories.map((category) => ({
            key: `category-${category.id}`,
            label: category.name,
            aliases: [],
            category
        }))
    ];

    const renderContent = (item, active) => (
        <>
            <CategoryIcon type={item.key} />
            <span className="category-menu__label">{item.label}</span>
            {item.hasChildren && <span className="category-menu__chevron">›</span>}
            {active && <span className="visually-hidden">Đang chọn</span>}
        </>
    );

    return (
        <nav className="category-menu" aria-label="Danh mục sản phẩm">
            {items.map((item) => {
                const categoryId = item.category?.id;
                const active = categoryId && Number(selectedId) === Number(categoryId);
                const className = `category-menu__item${item.highlighted ? " category-menu__item--highlight" : ""}${active ? " category-menu__item--active" : ""}${!categoryId ? " category-menu__item--muted" : ""}`;

                if (onSelect) {
                    return (
                        <button
                            type="button"
                            key={item.key}
                            className={className}
                            onClick={() => categoryId && onSelect(categoryId)}
                            disabled={!categoryId}
                        >
                            {renderContent(item, active)}
                        </button>
                    );
                }

                return categoryId ? (
                    <Link key={item.key} className={className} to={`/shop?category=${categoryId}`}>
                        {renderContent(item, active)}
                    </Link>
                ) : (
                    <span key={item.key} className={className}>
                        {renderContent(item, active)}
                    </span>
                );
            })}
        </nav>
    );
}

export default CategoryMenu;
