import { getCart, removeFromCart, updateCartCount } from "./cart.js";

export function init() {
  updateCartCount();
  const cart = getCart();
  const cartContainer = document.getElementById("cart-items-container");
  const emptyMessage = document.querySelector(".empty-cart-message");
  const loading = document.querySelector(".loading-container");
  const orderSummary = document.querySelector(".order-summary");

  loading.style.display = "none";

  if (!cart || cart.length === 0) {
    emptyMessage.style.display = "block";
    orderSummary.style.display = "none";
    return;
  }

  cart.forEach((item) => {
    const itemEl = document.createElement("div");
    itemEl.classList.add("cart-item");
    itemEl.innerHTML = `
    <div class="item-image">
      <img src="${item.image}" alt="${item.title}" />
    </div>
    <div class="item-details">
      <div class="item-title">${item.title}</div>
      <div class="item-price">$${item.price}</div>
      <div class="item-actions">
        <div class="item-quantity">
          <button class="qty-down" data-id="${item.id}">-</button>
          <input type="number" min="1" max="10" value="${item.quantity}" data-id="${item.id}" />
          <button class="qty-up" data-id="${item.id}">+</button>
        </div>
        <button class="remove-item" data-id="${item.id}">Remove</button>
      </div>
    </div>
  `;
    cartContainer.appendChild(itemEl);
  });

  updateTotals();

  // Quantity controls
  cartContainer.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (
      e.target.classList.contains("qty-down") ||
      e.target.classList.contains("qty-up")
    ) {
      const input = cartContainer.querySelector(`input[data-id="${id}"]`);
      let qty = parseInt(input.value);
      qty += e.target.classList.contains("qty-up") ? 1 : -1;
      if (qty < 1) qty = 1;
      if (qty > 10) qty = 10;
      input.value = qty;
      updateItemQty(id, qty);
      updateTotals();
    }

    if (e.target.classList.contains("remove-item")) {
      removeFromCart(id);
      location.reload(); // Refresh to update view
    }
  });

  cartContainer.addEventListener("change", (e) => {
    const id = e.target.dataset.id;
    const qty = parseInt(e.target.value);
    if (id && !isNaN(qty)) {
      updateItemQty(id, qty);
      updateTotals();
    }
  });
}

function updateItemQty(id, qty) {
  const cart = getCart().map((item) =>
    item.id === id ? { ...item, quantity: qty } : item
  );
  localStorage.setItem("gamehub_cart", JSON.stringify(cart));
  updateCartCount();
}

function updateTotals() {
  const cart = getCart();
  const subtotalValue = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountValue = 0;
  const shippingValue = subtotalValue > 0 ? 5 : 0;
  const totalValue = subtotalValue - discountValue + shippingValue;

  document.getElementById("subtotal").textContent = `$${subtotalValue.toFixed(
    2
  )}`;
  document.getElementById("discount").textContent = `$${discountValue.toFixed(
    2
  )}`;
  document.getElementById("shipping").textContent = `$${shippingValue.toFixed(
    2
  )}`;
  document.getElementById("total").textContent = `$${totalValue.toFixed(2)}`;
}

// Proceed to confirmation
const checkoutButton = document.getElementById("checkout-btn");
checkoutButton.addEventListener("click", () => {
  window.location.href = "/src/pages/checkout/confirmation/index.html";
});
