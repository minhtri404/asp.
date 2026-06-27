const CART_STORAGE_KEY = "cart";

export function getCartItems() {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
}

export function saveCartItems(cartItems) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cartItems }));
}

export function addCartItem(product, quantity = 1) {
    const cartItems = getCartItems();
    const productId = Number(product.productId || product.id);
    const existingItem = cartItems.find((item) => Number(item.productId) === productId);

    if (existingItem) {
        existingItem.quantity += Number(quantity);
    } else {
        cartItems.push({
            productId,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: Number(quantity)
        });
    }

    saveCartItems(cartItems);
    return cartItems;
}

export function clearCartItems() {
    localStorage.removeItem(CART_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: [] }));
}
