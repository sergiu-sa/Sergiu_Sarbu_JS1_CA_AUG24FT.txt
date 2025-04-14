const API_URL = "https://api.noroff.dev/api/v1/gamehub";
let allProducts = [];

export async function init() {
  const container = document.getElementById("products-container");

  if (!container) {
    console.error("Missing #products-container");
    return;
  }

  try {
    container.innerHTML = "<p>Loading...</p>";
    const response = await fetch(API_URL);
    allProducts = await response.json();
    renderProducts(allProducts);
    setupFilters(allProducts);
  } catch (error) {
    container.innerHTML = "<p>Failed to load products</p>";
    console.error(error);
  }

  document
    .getElementById("category-filter")
    ?.addEventListener("change", filterProducts);
  document
    .getElementById("platform-filter")
    ?.addEventListener("change", filterProducts); // age
  document
    .getElementById("genre-filter")
    ?.addEventListener("change", filterProducts);
}

function renderProducts(products) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p>No products match the filters.</p>";
    return;
  }

  products.forEach((product) => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.title}" />
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-price">$${product.price}</p>
          <p class="product-age">Age: ${product.ageRating}</p>
          <a href="/src/pages/product/index.html?id=${product.id}">View Product</a>
        </div>
      </div>
    `;
  });
}


function filterProducts() {
  const favorite = document.getElementById("category-filter").value;
  const age = document.getElementById("platform-filter").value;
  const genre = document.getElementById("genre-filter").value;

  const filtered = allProducts.filter((product) => {
    const isFavorite = String(product.favorite) === "true";
    const matchFavorite = favorite === "all" || String(isFavorite) === favorite;

    const productAge = parseInt(product.ageRating); // turns "16+" → 16
    const matchAge = age === "all" || productAge >= parseInt(age);

    const matchGenre =
      genre === "all" || product.genre?.toLowerCase() === genre.toLowerCase();

    return matchFavorite && matchAge && matchGenre;
  });

  renderProducts(filtered);
}

function setupFilters(products) {
  const genreSelect = document.getElementById("genre-filter");
  const genres = new Set();

  products.forEach((product) => {
    if (product.genre) genres.add(product.genre);
  });

  genreSelect.innerHTML = '<option value="all">All Genres</option>';
  genres.forEach((genre) => {
    genreSelect.innerHTML += `<option value="${genre.toLowerCase()}">${genre}</option>`;
  });
}
