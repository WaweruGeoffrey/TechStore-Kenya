const customerName = document.getElementById("customerName");
const orderNumber = document.getElementById("orderNumber");
const confirmationItems =
    document.getElementById("confirmationItems");
const confirmationTotal =
    document.getElementById("confirmationTotal");

const continueShoppingBtn =
    document.getElementById("continueShoppingBtn");



const order =
    JSON.parse(localStorage.getItem("lastOrder"));



if (!order) {

    customerName.textContent = "Customer";

    orderNumber.textContent = "Unavailable";

    confirmationItems.innerHTML =
        "<p>No recent order found.</p>";

    confirmationTotal.textContent = "0";

} else {


    customerName.textContent =
        order.customerName;


  
    orderNumber.textContent =
        "#" + order.orderNumber;



    confirmationItems.innerHTML = "";

    order.items.forEach(item => {

        const product = item.product;
        const quantity = item.quantity;

        const subtotal =
            product.price * quantity;

        confirmationItems.innerHTML += `
            <div class="confirmation-item">

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



    confirmationTotal.textContent =
        order.total.toLocaleString();

}



continueShoppingBtn.addEventListener(
    "click",
    function() {

        window.location.href = "index.html";

    }
);