const cartContainer = document.getElementById("cartContainer");
const cartTotal = document.getElementById("cartTotal");

function displayCart() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<h2>Your cart is empty 🛒</h2>";
        cartTotal.textContent = "0";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {

        const product = item.product;
        const quantity = item.quantity;

        const subtotal = product.price * quantity;

        total += subtotal;

        cartContainer.innerHTML += `
            <div class="cart-item">

                <img src="${product.image}" alt="${product.name}">

                <div class="cart-details">

                    <h3>${product.name}</h3>

                    <p class="cart-price">
                        KSh ${product.price.toLocaleString()}
                    </p>

                    <div class="quantity-controls">

                        <button onclick="decreaseQuantity(${index})">
                            −
                        </button>

                        <span>${quantity}</span>

                        <button onclick="increaseQuantity(${index})">
                            +
                        </button>

                    </div>

                    <p>
                        Subtotal:
                        <strong>KSh ${subtotal.toLocaleString()}</strong>
                    </p>

                </div>

                <button class="remove-btn" onclick="removeItem(${index})">
                    🗑️ Remove
                </button>

            </div>
        `;
    });

    cartTotal.textContent = total.toLocaleString();
}


function increaseQuantity(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


function decreaseQuantity(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


displayCart();