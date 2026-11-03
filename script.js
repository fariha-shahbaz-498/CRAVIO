
console.log("CRAVIO JavaScript is working!");


// ======================================
// 1. MOBILE NAVIGATION
// ======================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });

}


// ======================================
// 2. HERO VIDEO
// ======================================

const heroVideo = document.querySelector(".hero-video");

if (heroVideo) {

    heroVideo.play().catch(() => {
        console.log("Video autoplay is waiting for browser permission.");
    });

}


// ======================================
// 3. MENU FILTERS
// ======================================

const filterButtons = document.querySelectorAll(".filter-btn");
const foodCards = document.querySelectorAll(".food-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selectedCategory = button.dataset.filter;

        foodCards.forEach(card => {

            if (
                selectedCategory === "all" ||
                card.dataset.category === selectedCategory
            ) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }

        });

    });

});


// ======================================
// 4. SHOPPING CART
// ======================================

function getSavedCart() {

    try {

        const savedCart = JSON.parse(
            localStorage.getItem("cravioCart")
        );

        if (!Array.isArray(savedCart)) return [];

        return savedCart.filter(item =>
            item &&
            typeof item.name === "string" &&
            Number.isFinite(item.price) &&
            item.price > 0 &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0
        );

    } catch (error) {

        return [];

    }

}

let cart = getSavedCart();

const cartTrigger = document.getElementById("cartTrigger");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const checkoutBtn = document.getElementById("checkoutBtn");


// ======================================
// 5. OPEN CART
// ======================================

function openCart() {

    if (cartDrawer && cartOverlay) {

        cartDrawer.classList.add("active");
        cartOverlay.classList.add("active");

    }

}


// ======================================
// 6. CLOSE CART
// ======================================

function hideCart() {

    if (cartDrawer && cartOverlay) {

        cartDrawer.classList.remove("active");
        cartOverlay.classList.remove("active");

    }

}

if (cartTrigger) {
    cartTrigger.addEventListener("click", openCart);
}

if (closeCart) {
    closeCart.addEventListener("click", hideCart);
}

if (cartOverlay) {
    cartOverlay.addEventListener("click", hideCart);
}


// ======================================
// 7. ADD ITEMS TO CART
// ======================================

document.querySelectorAll(".add-btn").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        if (!name || !Number.isFinite(price) || price <= 0) {
            alert("Invalid food item information.");
            return;
        }

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        updateCart();

        // Automatically open cart
        openCart();

        button.textContent = "✓";

        setTimeout(() => {
            button.textContent = "+";
        }, 800);

    });

});


// ======================================
// 8. DIRECT ORDER BUTTON
// ======================================

document.querySelectorAll(".direct-order-btn").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        if (!name || !Number.isFinite(price) || price <= 0) {
            alert("Invalid food item information.");
            return;
        }

        // Select only this food item
        cart = [{
            name: name,
            price: price,
            quantity: 1
        }];

        // Save selected item
        updateCart();

        // Go directly to checkout
        window.location.href = "checkout.html";

    });

});


// ======================================
// 9. UPDATE CART
// ======================================

function updateCart() {

    let total = 0;
    let count = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;
        count += item.quantity;

    });

    // Update navbar count
    if (cartCount) {
        cartCount.textContent = count;
    }

    // Update cart total
    if (cartTotal) {
cartTotal.textContent = total.toFixed(2);    }

    // Display cart items
    if (cartItems) {

        cartItems.innerHTML = "";

        if (cart.length === 0) {

            cartItems.innerHTML =
                '<p class="empty-cart">Your cart is empty.</p>';

        }

        cart.forEach((item, index) => {

            cartItems.innerHTML += `

                <div class="cart-item">

                    <div>

                        <h4>${item.name}</h4>

                        <p>$${item.price.toFixed(2)}</p>

                        <div class="quantity-controls">

                            <button onclick="changeQuantity(${index}, -1)">
                                −
                            </button>

                            <span>${item.quantity}</span>

                            <button onclick="changeQuantity(${index}, 1)">
                                +
                            </button>

                        </div>

                        <button
                            class="remove-item"
                            onclick="removeItem(${index})">
                            Remove
                        </button>

                    </div>

                    <strong>
                        $${(item.price * item.quantity).toFixed(2)}
                    </strong>

                </div>

            `;

        });

    }

    // Save cart
    localStorage.setItem("cravioCart", JSON.stringify(cart));

}


// ======================================
// 10. CHANGE QUANTITY
// ======================================

function changeQuantity(index, amount) {

    if (!cart[index]) return;

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();

}


// ======================================
// 11. REMOVE ITEM
// ======================================

function removeItem(index) {

    if (!cart[index]) return;

    cart.splice(index, 1);

    updateCart();

}


// ======================================
// 12. CHECKOUT
// ======================================

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        if (cart.length === 0) {

            alert("Your cart is empty!");
            return;

        }

        window.location.href = "checkout.html";

    });

}


// ======================================
// 13. NEWSLETTER
// ======================================

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = newsletterForm.querySelector("input").value;

        alert("Thank you for subscribing! " + email);

        newsletterForm.reset();

    });

}


// ======================================
// 14. INITIAL CART DISPLAY
// ======================================

updateCart();
// CRAVIO SCROLL REVEAL

document.addEventListener("DOMContentLoaded", function () {

    const elements = document.querySelectorAll(
        ".menu-section, .offers-section, .about-section, .reviews-section, .food-card, .category-card"
    );

    elements.forEach((element, index) => {
        element.classList.add("reveal");

        if (
            element.classList.contains("food-card") ||
            element.classList.contains("category-card")
        ) {
            element.style.setProperty(
                "--delay",
                `${(index % 3) * 0.12}s`
            );
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    elements.forEach((element) => {
        observer.observe(element);
    });

});
// CRAVIO PAGE LOADER

window.addEventListener("load", function () {
    const loader = document.getElementById("pageLoader");

    if (loader) {
        loader.classList.add("hide");

        setTimeout(function () {
            loader.style.display = "none";
        }, 650);
    }
});
// CRAVIO CART BUTTON ANIMATION

document.addEventListener("click", function (event) {

    const button = event.target.closest(".add-btn");

    if (!button) return;

    // Show added feedback
    const originalText = button.textContent;

    button.textContent = "✓ Added";
    button.classList.add("added");

    // Restore original button
    setTimeout(function () {
        button.textContent = originalText;
        button.classList.remove("added");
    }, 1000);

    // Animate cart count
    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.classList.remove("bump");

        void cartCount.offsetWidth;

        cartCount.classList.add("bump");
    }

});