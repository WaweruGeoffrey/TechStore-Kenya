const orderItems = document.getElementById("orderItems");
const checkoutTotal = document.getElementById("checkoutTotal");
const placeOrderBtn = document.getElementById("placeOrderBtn");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayOrder() {

    orderItems.innerHTML = "";

    if (cart.length === 0) {

        orderItems.innerHTML = "<p>Your cart is empty 🛒</p>";

        checkoutTotal.textContent = "0";

        placeOrderBtn.disabled = true;

        return;
    }

    let total = 0;

    cart.forEach(item => {

        const product = item.product;
        const quantity = item.quantity;

        const subtotal = product.price * quantity;

        total += subtotal;

        orderItems.innerHTML += `
            <div class="order-item">

                <div>
                    <h4>${product.name}</h4>

                    <p>
                        KSh ${product.price.toLocaleString()}
                        × ${quantity}
                    </p>
                </div>

                <strong>
                    KSh ${subtotal.toLocaleString()}
                </strong>

            </div>
        `;
    });

    checkoutTotal.textContent =
        total.toLocaleString();
}


placeOrderBtn.addEventListener("click", function() {

    const customerName =
        document.getElementById("customerName").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const address =
        document.getElementById("address").value.trim();


    if (!customerName || !phone || !address) {

        alert("Please fill in all delivery information.");

        return;
    }


    // Calculate total
    let total = 0;

    cart.forEach(item => {

        total += item.product.price * item.quantity;

    });


    // Generate order number
    const orderNumber =
        "TSK-" +
        Math.floor(10000 + Math.random() * 90000);


    // Save order information
    const order = {

        orderNumber: orderNumber,

        customerName: customerName,

        phone: phone,

        address: address,

        items: cart,

        total: total

    };


    localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
    );


    // Clear cart
    localStorage.removeItem("cart");


    // Go to confirmation page
    window.location.href =
        "order-confirmation.html";

});


displayOrder();