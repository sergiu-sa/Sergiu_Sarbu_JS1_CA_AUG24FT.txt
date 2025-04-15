// src/js/main.js

// Get current pathname
const pathname = window.location.pathname;

// Function to dynamically load page-specific JavaScript
const loadPageScript = async () => {
  try {
    // Homepage (index.html)
    if (pathname === "/" || pathname === "/index.html") {
      const { init } = await import("./index.js");
      init?.();
    }

    // Product detail page (/src/pages/product/index.html)
    else if (pathname.includes("/product")) {
      const { init } = await import("./product.js");
      init?.();
    }

    // Confirmation page (/src/pages/checkout/confirmation/index.html)
    else if (pathname.includes("/confirmation")) {
      const { init } = await import("./confirmation.js");
      init?.();
    }

    // Checkout page (/src/pages/checkout/index.html)
    else if (pathname.includes("/checkout")) {
      const { init } = await import("./checkout.js");
      init?.();
    }

    // Fallback (optional): If you ever build a /cart.html or other custom page
    else if (pathname.includes("/cart")) {
      const { init } = await import("./cart.js");
      init?.();
    }

    // Unrecognized page
    else {
      console.warn("No script loaded for this path:", pathname);
    }
  } catch (error) {
    console.error("Failed to load script:", error);
  }
};

// Initialize logic
loadPageScript();
