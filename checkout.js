
// ======================================
// CRAVIO CHECKOUT SYSTEM
// ======================================

const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutForm = document.getElementById("checkoutForm");

// Get cart from localStorage safely
let cart = [];

try {
    const savedCart = JSON.parse(
        localStorage.getItem("cravioCart")
    );

    if (Array.isArray(savedCart)) {
        cart = savedCart.filter(item =>
            item &&
            typeof item.name === "string" &&
            Number.isFinite(item.price) &&
            item.price > 0 &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0
        );
    }
} catch (error) {
    cart = [];
}


// ======================================
// EMPTY CART CHECK
// ======================================

if (cart.length === 0) {

    document.querySelector(".checkout-content").innerHTML = `
        <div class="empty-checkout">

            <div class="empty-icon">🛒</div>

            <h2>Your Cart is Empty!</h2>

            <p>Please select some delicious food first.</p>

            <a href="index.html#menu" class="back-menu-btn">
                Explore Our Menu
            </a>

        </div>
    `;

}


// ======================================
// DISPLAY ORDER SUMMARY
// ======================================

function displayOrder() {

    if (!checkoutItems || !checkoutTotal) return;

    let total = 0;

    if (cart.length === 0) {

        checkoutItems.innerHTML = "<p>Your cart is empty.</p>";
        checkoutTotal.textContent = "$0.00";

        return;
    }

    checkoutItems.innerHTML = "";

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        checkoutItems.innerHTML += `
            <div class="checkout-item">
                <span>${item.name} × ${item.quantity}</span>
                <strong>$${itemTotal.toFixed(2)}</strong>
            </div>
        `;

    });

    checkoutTotal.textContent = "$" + total.toFixed(2);

}


// ======================================
// PLACE ORDER
// ======================================

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const name = document.getElementById("customerName").value.trim();
        const phone = document.getElementById("customerPhone").value.trim();
        const address = document.getElementById("customerAddress").value.trim();
        const notes = document.getElementById("customerNotes").value.trim();

        const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const order = {

            orderNumber: "CRV" + Date.now(),
            customerName: name,
            phone: phone,
            address: address,
            notes: notes,
            items: cart,
            total: total,
            orderDate: new Date().toLocaleString()

        };

        // Save order
        localStorage.setItem(
            "cravioLastOrder",
            JSON.stringify(order)
        );

        // Clear cart
        localStorage.removeItem("cravioCart");

        // Confirmation
        alert(
            "Thank you, " + name + "!\n\n" +
            "Your order has been placed successfully.\n" +
            "Order Number: " + order.orderNumber + "\n" +
            "Total: $" + total.toFixed(2)
        );

        // Redirect
        window.location.href = "order-success.html";

    });

}


// ======================================
// INITIAL DISPLAY
// ======================================

displayOrder();
