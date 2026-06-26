import { Link } from "react-router-dom";
import "./ProductMegaMenu.css";

function ProductMegaMenu({ categories = [] }) {
    const items = [...categories].sort((first, second) => {
        return first.name.localeCompare(second.name, "vi");
    });

    if (items.length === 0) {
        return null;
    }

    return (
        <div className="product-mega-menu">
            {items.map((category) => (
                <div className="product-mega-menu__column" key={category.id}>
                    <Link className="product-mega-menu__title" to={`/shop?category=${category.id}`}>
                        {category.name}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default ProductMegaMenu;
