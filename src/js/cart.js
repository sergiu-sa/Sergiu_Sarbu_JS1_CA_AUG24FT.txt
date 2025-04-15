const CART_KEY = "gamehub_cart";

// Get cart from localStorage
export function getCart() {
  const cartJSON = localStorage.getItem(CART_KEY);
  return cartJSON ? JSON.parse(cartJSON) : [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Add or update product in the cart
export function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.discountedPrice || product.price,
      image: product.image,
      quantity,
    });
  }

  saveCart(cart);
  updateCartCount();
}

// Remove item from cart
export function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
  updateCartCount();
}

// Update cart icon count in header
export function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countElement = document.querySelector(".cart-count");
  if (countElement) {
    countElement.textContent = total;
  }
}
