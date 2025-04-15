const API_URL = "https://api.noroff.dev/api/v1/gamehub";

import { addToCart, updateCartCount } from "./cart.js";

export async function init() {
  updateCartCount();

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    document.body.innerHTML += "<p>No product ID found in URL.</p>";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${productId}`);
    const product = await response.json();
    renderProduct(product);
    setupAddToCart(product);
  } catch (error) {
    console.error("Error loading product:", error);
    document.body.innerHTML += "<p>Product not found.</p>";
  }
}

function renderProduct(product) {
  document.getElementById("product-title").textContent = product.title;

  const mainImage = document.getElementById("product-main-image");
  mainImage.src = product.image;
  mainImage.alt = product.title;

  document.getElementById("display-category").textContent =
    product.genre || "Unknown";
  document.getElementById("product-category").textContent =
    product.genre || "Unknown";
  document.getElementById("display-platform").textContent =
    product.tags?.join(", ") || "N/A";

  document.getElementById(
    "display-price"
  ).textContent = `Price: $${product.discountedPrice} (was $${product.price})`;

  document
    .getElementById("display-description")
    .querySelector("p").textContent = product.description;
  document.getElementById("details-content").textContent = product.description;
  document.getElementById("product-name").textContent = product.title;

  document.getElementById("thumbnail-images").innerHTML = `
    <img class="thumbnail" src="${product.image}" alt="${product.title}" />
    <img class="thumbnail" src="${product.image}" alt="${product.title}" />
    <img class="thumbnail" src="${product.image}" alt="${product.title}" />
  `;
}

function setupAddToCart(product) {
  const qtyInput = document.getElementById("quantity");
  const addBtn = document.getElementById("add-to-cart-btn");

  document.getElementById("increase-quantity").addEventListener("click", () => {
    qtyInput.value = Math.min(parseInt(qtyInput.value) + 1, 10);
  });

  document.getElementById("decrease-quantity").addEventListener("click", () => {
    qtyInput.value = Math.max(parseInt(qtyInput.value) - 1, 1);
  });

  addBtn.addEventListener("click", () => {
    const quantity = parseInt(qtyInput.value);
    addToCart(product, quantity);
    alert(`${product.title} added to cart!`);
  });
}
