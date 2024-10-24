document.addEventListener("DOMContentLoaded", function () {
    let cart = [];
    const cartIcon = document.querySelector(".fa-cart-shopping");
    const cartContainer = document.createElement("div");

    // Click event for user icon
    const userIcon = document.querySelector(".fa-user");
    userIcon.addEventListener("click", function () {
        window.location.href = "signup_form.html"; // Redirect to signup form
    });

    const heartIcon = document.querySelector(".fa-heart");
    heartIcon.addEventListener("click", function () {
        alert("Item added to wishlist!");
    });

    // Cart container setup
    cartContainer.classList.add("cartContents");
    cartContainer.style.display = "none";
    cartContainer.style.position = "fixed";
    cartContainer.style.top = "100px";
    cartContainer.style.right = "20px";
    cartContainer.style.backgroundColor = "#fff";
    cartContainer.style.border = "1px solid #ccc";
    cartContainer.style.padding = "10px";
    cartContainer.style.maxHeight = "400px";
    cartContainer.style.overflowY = "auto";
    document.body.appendChild(cartContainer);

    // Event listener for the cart icon
    cartIcon.addEventListener("click", function () {
        cartContainer.style.display = cartContainer.style.display === "none" ? "block" : "none";
    });

    // Function to add items to cart
    function addToCart(productImage, productName, productPrice) {
        const product = {
            img: productImage,
            name: productName,
            price: parseFloat(productPrice),
        };
        cart.push(product);
        updateCartDisplay();
    }

    // Function to update cart display
    function updateCartDisplay() {
        cartContainer.innerHTML = "";
        let totalPrice = 0;

        cart.forEach(function (item, index) {
            totalPrice += item.price;

            const cartItem = document.createElement("div");
            cartItem.style.marginBottom = "10px";
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}" style="width: 50px;">
                <p>${item.name} - ₹${item.price.toFixed(2)}</p>
                <button class="buyNow" data-index="${index}" style="background-color: green; color: white; padding: 5px;">Buy Now</button>
                <button class="removeFromCart" data-index="${index}" style="background-color: red; color: white; padding: 5px;">Remove</button>
            `;

            cartContainer.appendChild(cartItem);
        });

        // Add Buy All button at the bottom
        if (cart.length > 0) {
            const buyAllButton = document.createElement("button");
            buyAllButton.textContent = `Buy All - Total: ₹${totalPrice.toFixed(2)}`;
            buyAllButton.style.backgroundColor = "blue";
            buyAllButton.style.color = "white";
            buyAllButton.style.padding = "10px";
            buyAllButton.style.display = "block";
            buyAllButton.style.marginTop = "20px";
            buyAllButton.style.width = "100%";
            cartContainer.appendChild(buyAllButton);

            buyAllButton.addEventListener("click", function () {
                alert(`Total price of items: ₹${totalPrice.toFixed(2)}. Thank you for your purchase!`);
                cart = [];
                updateCartDisplay();
                cartContainer.style.display = "none";
            });
        }

        // Add event listeners for Buy Now and Remove buttons
        const buyNowButtons = document.querySelectorAll(".buyNow");
        const removeButtons = document.querySelectorAll(".removeFromCart");

        buyNowButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const index = button.getAttribute("data-index");
                alert(`You bought ${cart[index].name} for ₹${cart[index].price.toFixed(2)}!`);
                cart.splice(index, 1);
                updateCartDisplay();
            });
        });

        removeButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const index = button.getAttribute("data-index");
                cart.splice(index, 1);
                updateCartDisplay();
                alert("Item removed from cart!");
            });
        });
    }

    // Slide and Product details logic
    let slide = document.querySelectorAll(".slideCard");
    let cards = document.querySelectorAll(".card");
    let count = 0;

    // Position each slide
    slide.forEach(function (slides, index) {
        slides.style.left = `${index * 100}%`;
    });

    // Function to update slide position
    function myFun() {
        slide.forEach(function (curVal) {
            curVal.style.transform = `translateX(-${count * 100}%)`;
        });
    }

    // Automatic slideshow every 2 seconds
    setInterval(function () {
        count++;
        if (count === slide.length) {
            count = 0; // Loop back to the first slide
        }
        myFun();
    }, 2000);

    // Show card details on click
    cards.forEach(function (curCard) {
        curCard.addEventListener("click", function () {
            // Create a modal overlay
            const modalOverlay = document.createElement("div");
            modalOverlay.classList.add("modalOverlay");

            // Create a details div
            let div = document.createElement("div");
            div.classList.add("cardDetail");

            // Get product details
            const productImage = curCard.firstElementChild.src;
            const productName = "Top trending Hoodies"; // You might want to pull this from the card
            const productPrice = Math.floor(Math.random() * 1000) + 500; // Random price between 500 and 1500

            // Populate the details div
            div.innerHTML = `
                <img src="${productImage}" alt="${productName}" class="detailImage">
                <div class="detailText">
                    <h2>${productName}</h2>
                    <h3>₹${productPrice}</h3>
                    <p>Bank Offer: 10% off on SBI Credit Card, up to ₹1250 on orders of ₹5,000 and above T&C</p>
                    <button class="buyNow">Buy Now</button>
                    <button class="addToCart">Add To Cart</button>
                    <button class="closeModal">Close</button>
                </div>
            `;

            // Append the details div to the modal overlay
            modalOverlay.appendChild(div);
            document.querySelector("body").appendChild(modalOverlay);

            // Add event listener to the Close button
            div.querySelector(".closeModal").addEventListener("click", function () {
                modalOverlay.remove(); // Remove the modal overlay
            });

            // Add event listener to Add To Cart button
            div.querySelector(".addToCart").addEventListener("click", function () {
                addToCart(productImage, productName, productPrice); // Use the addToCart function
                modalOverlay.remove(); // Close modal after adding
            });

            // Add event listener to Buy Now button
            div.querySelector(".buyNow").addEventListener("click", function () {
                alert(`Thank you for buying ${productName} for ₹${productPrice}!`);
                modalOverlay.remove(); // Close modal after buying
            });
        });
    });

    // Function to update cart icon with number of items
    function updateCartIcon() {
        const cartIcon = document.querySelector(".cart-icon-count");
        cartIcon.textContent = cart.length;
    }

    // Initial setup for cart display
    function fun() {
        const viewCartButton = document.createElement("button");
        viewCartButton.style.position = "fixed";
        viewCartButton.style.top = "80px";
        viewCartButton.style.right = "20px";
        viewCartButton.style.fontSize = "24px";
        document.body.appendChild(viewCartButton);

        viewCartButton.addEventListener("click", function () {
            cartContainer.style.display = (cartContainer.style.display === "none" || cartContainer.style.display === "") ? "block" : "none";
        });
    }
    // Add CSS for modal overlay (you can also put this in your CSS file)
    const style = document.createElement("style");
    style.textContent = `
    .modalOverlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000; 
    }

    .cardDetail {
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        text-align: center;
        position: relative;
    }

    .detailImage {
        max-width: 100%;
        height: auto;
        border-radius: 5px;
    }

    .cartContents {
        position: fixed;
        top: 150px;
        right: 20px;
        max-height: 300px;
        overflow-y: auto;
        background-color: white;
        padding: 10px;
        border: 1px solid #ccc;
        width: 300px;
        z-index: 999; /* On top of other elements */
    }

    .cartContents button {
        margin: 5px;
        
    }
    `;
    document.head.appendChild(style);
});
