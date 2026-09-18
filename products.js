const products = [
    {
        id: 1,
        name: "Samsung Galaxy A56",
        category: "Phones",
        price: 39999,
        image: "Images/samsung galaxy A56.jpg"
    },

    {
        id: 2,
        name: "HP EliteBook",
        category: "Laptops",
        price: 74999,
        image: "Images/laptop.jpg"
    },

    {
        id: 3,
        name: "Gaming Keyboard",
        category: "Gaming",
        price: 6500,
        image: "Images/Gaming keybord.jpg"
    },

    {
        id: 4,
        name: "JBL Headphones",
        category: "Audio",
        price: 6999,
        image:"Images/jbl-headphones.jpg"
    },

    {
        id: 5,
        name:"Samsung galaxy a06",
        category: "Phones",
        price:25000,
        image:"Images/Samsung-galaxy a06.jpg"
    },

    {
        id:6,
        name:"Dell latitude",
        category:"Laptops",
        price:56000,
        image:"Images/Dell-latitude.jpg"
    },

    {
        id:7,
        name:"Gaming mouse",
        category:"Gaming",
        price:3500,
        image:"Images/Gaming-mouse.jpg"
    },

    {
        id:8,
        name:"wireless earbuds",
        category:"Audio",
        price:1500,
        image:"Images/wireless-earbuds.jpg"
    }



];


products.forEach(function(product){

    productsContainer.innerHTML += `
        <div class="card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p class="price">KSh ${product.price}</p>

            <button>Add to Cart</button>

        </div>
    `;

});
console.log(products);