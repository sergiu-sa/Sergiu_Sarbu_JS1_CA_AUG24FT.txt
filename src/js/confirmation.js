import { getCart } from "./cart.js";

export function init() {
  const cart = getCart();

  // If cart is empty, redirect to home
  if (!cart || cart.length === 0) {
    window.location.href = "/index.html";
    return;
  }

  // Generate fake order number + date
  const orderNumber = "#" + Math.floor(Math.random() * 90000 + 10000);
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  document.getElementById("order-number").textContent = orderNumber;
  document.getElementById("order-date").textContent = orderDate;
  document.getElementById("order-total").textContent = `$${total}`;
  document.getElementById("payment-method").textContent = "Credit Card";

  // Render purchased items
  const purchasedContainer = document.getElementById("purchased-items");
  purchasedContainer.innerHTML = "";

  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("purchase-items");
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="purchase-items-info">
        <div class="purchase-items-title">${item.title}</div>
        <div class="purchase-items-price">$${item.price} × ${item.quantity}</div>
      </div>
    `;
    purchasedContainer.appendChild(itemDiv);
  });

  // Download receipt button
  const receiptBtn = document.getElementById("download-receipt");
  receiptBtn.addEventListener("click", () => {
    const receipt = `GameHub Order Confirmation\n
Order Number: ${orderNumber}
Order Date: ${orderDate}
Total: $${total}
Items:\n${cart
      .map(
        (item) =>
          `- ${item.title} x${item.quantity} = $${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("\n")}`;

    const blob = new Blob([receipt], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `GameHub_Receipt_${orderNumber}.txt`;
    link.click();
  });

  // Clear the cart
  localStorage.removeItem("gamehub_cart");
}
