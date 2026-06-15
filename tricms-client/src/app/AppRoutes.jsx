import { Route, Routes } from "react-router-dom";
import About from "../pages/about/About";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import Contact from "../pages/contact/Contact";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import MemberCreate from "../pages/members/MemberCreate";
import News from "../pages/posts/News";
import Orders from "../pages/orders/Orders";
import PostDetail from "../pages/posts/PostDetail";
import ProductDetail from "../pages/products/ProductDetail";
import Register from "../pages/auth/Register";
import Shop from "../pages/shop/Shop";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/members/create" element={<MemberCreate />} />
            <Route path="/news" element={<News />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    );
}

export default AppRoutes;
