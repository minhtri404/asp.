import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SiteFooter from "../components/layout/SiteFooter";
import StoreHeader from "../components/navigation/StoreHeader";
import { getCategoriesProducts } from "../services/catalogService";
import AppRoutes from "./AppRoutes";

function App() {
    const [customerName, setCustomerName] = useState(localStorage.getItem("customerName"));
    const [categories, setCategories] = useState([]);
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
