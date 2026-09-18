const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");




function displayProducts(category = "All", searchTerm = "") {

    productsContainer.innerHTML = "";

    let filteredProducts = category === "All"
        ? products
        : products.filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
        );




    if (searchTerm.trim() !== "") {

        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );

    }


    if (filteredProducts.length === 0) {

        productsContainer.innerHTML = `
            <h2 class="no-products">
                No products found 🔍
            </h2>
        `;

        return;
    }


    filteredProducts.forEach(product => {

        productsContainer.innerHTML += `
            <div class="product-card">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <h3>${product.name}</h3>

                <p class="price">
                    KSh ${product.price.toLocaleString()}
                </p>

                <button
                    class="cart-btn"
                    onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>
        `;

    });

}



function filterProducts(category) {

    displayProducts(
        category,
        searchInput.value
    );


    document
        .querySelectorAll(".category-buttons button")
        .forEach(button => {

            button.classList.remove("active");

        });


    const buttons =
        document.querySelectorAll(
            ".category-buttons button"
        );


    buttons.forEach(button => {

        if (
            button.textContent.trim() === category
        ) {

            button.classList.add("active");

        }

    });

}



searchInput.addEventListener(
    "input",
    function() {

        displayProducts(
            "All",
            searchInput.value
        );


      
        document
            .querySelectorAll(".category-buttons button")
            .forEach(button => {

                button.classList.remove("active");

            });

    }
);




function addToCart(productId) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];



    const product = products.find(
        item => item.id === productId
    );


    if (!product) {

        console.log("Product not found");

        return;

    }


    const existingProduct = cart.find(
        item => item.product.id === productId
    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            product: product,

            quantity: 1

        });

    }


  
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


   
    updateCartCount();


  
    alert(
        `${product.name} added to cart! 🛒`
    );

}



function updateCartCount() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    const cartCount =
        document.getElementById("cartCount");


    if (cartCount) {

        const totalItems = cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


        cartCount.textContent =
            `Cart (${totalItems})`;

    }

}




displayProducts();

updateCartCount();
