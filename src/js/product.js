const API_URL = "https://api.noroff.dev/api/v1/gamehub";

export async function init() {
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
  } catch (error) {
    console.error("Error loading product:", error);
    document.body.innerHTML += "<p>Product not found.</p>";
  }
}

function renderProduct(product) {
  // Title
  document.getElementById("product-title").textContent = product.title;

  // Main image
  const mainImage = document.getElementById("product-main-image");
  mainImage.src = product.image;
  mainImage.alt = product.title;

  // Category / Genre
  document.getElementById("display-category").textContent =
    product.genre || "Unknown";
  document.getElementById("product-category").textContent =
    product.genre || "Unknown";

  // Platform / Tags
  document.getElementById("display-platform").textContent =
    product.tags?.join(", ") || "N/A";

  // Price
  document.getElementById(
    "display-price"
  ).textContent = `Price: $${product.discountedPrice} (was $${product.price})`;

  // Description
  document
    .getElementById("display-description")
    .querySelector("p").textContent = product.description;
  document.getElementById("details-content").textContent = product.description;

  // Breadcrumb
  document.getElementById("product-name").textContent = product.title;

  // Bonus: Could load dummy thumbnails
  document.getElementById("thumbnail-images").innerHTML = `
    <img class="thumbnail" src="${product.image}" alt="${product.title}" />
    <img class="thumbnail" src="${product.image}" alt="${product.title}" />
    <img class="thumbnail" src="${product.image}" alt="${product.title}" />
  `;
}
