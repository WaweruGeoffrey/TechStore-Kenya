const detailContainer = document.getElementById("productDetail");
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));
const product = products.find(item => item.id === productId);

function renderProduct() {
    if (!detailContainer) return;

    if (!product) {
        detailContainer.innerHTML = `
            <div class="no-products">
                <h2>Product not found</h2>
                <p>The product you are looking for does not exist.</p>
                <a class="view-btn" href="products.html">Back to Products</a>
            </div>
        `;
        document.title = "Product Not Found - TechStore Kenya";
        return;
    }

    const wishlisted = isWishlisted(product.id);
    document.title = `${product.name} - TechStore Kenya`;

    detailContainer.innerHTML = `
        <div class="detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>

        <div class="detail-content">
            ${product.badge ? `<span class="product-badge detail-badge">${product.badge}</span>` : ""}
            <span class="product-category">${product.category}</span>
            <h1>${product.name}</h1>
            <p class="detail-price">KSh ${product.price.toLocaleString()}</p>
            <p class="stock">${product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</p>
            <p class="detail-description">${product.description}</p>

            <div class="detail-actions">
                <button class="cart-btn" onclick="addToCart(${product.id})" ${product.stock < 1 ? "disabled" : ""}>
                    Add to Cart 🛒
                </button>
                <button class="outline-btn" onclick="toggleProductWishlist()" id="detailWishlistBtn">
                    ${wishlisted ? "♥ Remove from Wishlist" : "♡ Add to Wishlist"}
                </button>
            </div>

            <a class="back-link" href="products.html">← Back to Products</a>
        </div>
    `;
}

function toggleProductWishlist() {
    toggleWishlist(product.id);
    const button = document.getElementById("detailWishlistBtn");
    if (!button) return;

    const wishlisted = isWishlisted(product.id);
    button.textContent = wishlisted ? "♥ Remove from Wishlist" : "♡ Add to Wishlist";
}

renderProduct();
