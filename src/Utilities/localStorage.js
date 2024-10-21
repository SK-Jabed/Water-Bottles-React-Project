const getStoreCart = () => {
    const storedCartString = localStorage.getItem("cart");
    if (storedCartString) {
        return JSON.parse(storedCartString);
    }
    return [];
}

const saveCartToLocalStorage = cart => {
    const cartStringified = JSON.stringify(cart);
    localStorage.setItem("cart", cartStringified);
}

const addToLocalStorage = id => {
    const cart = getStoreCart();
    cart.push(id);
    // Save to Local Storage
    saveCartToLocalStorage(cart)
}

const removeFromLocalStorage = id => {
    const cart = getStoreCart();
    // Removing Every Id
    const remaining = cart.filter(idx => idx !== id);
    saveCartToLocalStorage(remaining);
}

export {addToLocalStorage, getStoreCart, removeFromLocalStorage}