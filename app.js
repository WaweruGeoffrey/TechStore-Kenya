const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");

function money(value) { return `KSh ${Number(value).toLocaleString()}`; }

function isWishlisted(id) {
    const list = JSON.parse(localStorage.getItem("wishlist")) || [];
    return list.includes(id);
}

function toggleWishlist(id) {
    let list = JSON.parse(localStorage.getItem("wishlist")) || [];
    list = list.includes(id) ? list.filter(item => item !== id) : [...list, id];
    localStorage.setItem("wishlist", JSON.stringify(list));
    displayProducts(window.currentCategory || "All", searchInput ? searchInput.value : "");
    updateWishlistCount();
}

function displayProducts(category = "All", searchTerm = "") {
    if (!productsContainer) return;
    window.currentCategory = category;
    productsContainer.innerHTML = "";

    let filteredProducts = category === "All" ? products : products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term));
    }

    if (!filteredProducts.length) {
        productsContainer.innerHTML = `<div class="no-products"><h2>No products found 🔍</h2><p>Try another search or category.</p></div>`;
        return;
    }

    filteredProducts.forEach(product => {
        productsContainer.innerHTML += `
        <article class="product-card">
            <div class="product-image-wrap">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
                <button class="wishlist-btn ${isWishlisted(product.id) ? "liked" : ""}" onclick="toggleWishlist(${product.id})" aria-label="Add to wishlist">${isWishlisted(product.id) ? "♥" : "♡"}</button>
                <a href="product.html?id=${product.id}"><img src="${product.image}" alt="${product.name}"></a>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3>${product.name}</h3>
                <p class="price">${money(product.price)}</p>
                <p class="stock">${product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</p>
                <div class="product-actions">
                    <a class="view-btn" href="product.html?id=${product.id}">View</a>
                    <button class="cart-btn" onclick="addToCart(${product.id})" ${product.stock < 1 ? "disabled" : ""}>Add to Cart</button>
                </div>
            </div>
        </article>`;
    });
}

function filterProducts(category) {
    displayProducts(category, searchInput ? searchInput.value : "");
    document.querySelectorAll(".category-buttons button").forEach(button => button.classList.toggle("active", button.textContent.trim() === category));
}

if (searchInput) searchInput.addEventListener("input", () => displayProducts(window.currentCategory || "All", searchInput.value));

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(item => item.id === productId);
    if (!product) return;
    const existing = cart.find(item => item.product.id === productId);
    if (existing) existing.quantity++;
    else cart.push({ product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showToast(`${product.name} added to cart 🛒`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const el = document.getElementById("cartCount");
    if (el) el.textContent = `Cart (${count})`;
}

function updateWishlistCount() {
    const el = document.getElementById("wishlistCount");
    if (el) el.textContent = `Wishlist (${(JSON.parse(localStorage.getItem("wishlist")) || []).length})`;
}

function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) { toast = document.createElement("div"); toast.id = "toast"; document.body.appendChild(toast); }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

displayProducts();
updateCartCount();
updateWishlistCount();
