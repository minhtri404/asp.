import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SiteFooter from "../components/layout/SiteFooter";
import StoreHeader from "../components/navigation/StoreHeader";
import { getCategoriesProducts } from "../services/catalogService";
import { getCartItems } from "../utils/cartStorage";
import AppRoutes from "./AppRoutes";

function App() {
    const [customerName, setCustomerName] = useState(localStorage.getItem("customerName"));
    const [categories, setCategories] = useState([]);
    const [cartCount, setCartCount] = useState(() => {
        return getCartItems().reduce((total, item) => total + Number(item.quantity || 0), 0);
    });
    const navigate = useNavigate();

    const loadCategories = useCallback(async () => {
        try {
            const res = await getCategoriesProducts();
            setCategories(res.data);
        } catch (error) {
            console.error("Lỗi tải danh mục:", error);
        }
    }, []);

    useEffect(() => {
        const checkLogin = () => {
            setCustomerName(localStorage.getItem("customerName"));
        };

        window.addEventListener("storage", checkLogin);
        window.addEventListener("loginSuccess", checkLogin);

        return () => {
            window.removeEventListener("storage", checkLogin);
            window.removeEventListener("loginSuccess", checkLogin);
        };
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadCategories();
    }, [loadCategories]);

    useEffect(() => {
        window.addEventListener("focus", loadCategories);

        return () => {
            window.removeEventListener("focus", loadCategories);
        };
    }, [loadCategories]);

    useEffect(() => {
        const updateCartCount = () => {
            setCartCount(getCartItems().reduce((total, item) => total + Number(item.quantity || 0), 0));
        };

        window.addEventListener("storage", updateCartCount);
        window.addEventListener("cartUpdated", updateCartCount);

        return () => {
            window.removeEventListener("storage", updateCartCount);
            window.removeEventListener("cartUpdated", updateCartCount);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("customerId");
        localStorage.removeItem("customerName");
        localStorage.removeItem("customerEmail");

        setCustomerName(null);
        navigate("/login");
    };

    return (
        <>
            <StoreHeader
                categories={categories}
                cartCount={cartCount}
                customerName={customerName}
                onLogout={handleLogout}
            />

            <main className="page-main">
                <AppRoutes />
            </main>

            <SiteFooter />
        </>
    );
}

export default App;
