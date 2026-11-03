
const order = JSON.parse(localStorage.getItem("cravioLastOrder"));

const successDetails = document.getElementById("successDetails");

if (order) {

    successDetails.innerHTML = `
        <div class="success-details">

            <p><strong>Order ID:</strong> ${order.orderNumber}</p>

            <p><strong>Customer:</strong> ${order.customerName}</p>

            <p><strong>Phone:</strong> ${order.phone}</p>

            <p><strong>Address:</strong> ${order.address}</p>

            <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>

            <p><strong>Date:</strong> ${order.orderDate}</p>

        </div>
    `;

} else {

    successDetails.innerHTML = "<p>No recent order found.</p>";

}
