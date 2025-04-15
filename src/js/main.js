const pathname = window.location.pathname;

// Function to dynamically load page-specific JavaScript
const loadPageScript = async () => {
  try {
    if (pathname === "/" || pathname === "/index.html") {
      const { init } = await import("./index.js");
      init?.();
    }

    else if (pathname.includes("/product")) {
      const { init } = await import("./product.js");
      init?.();
    }

    else if (pathname.includes("/confirmation")) {
      const { init } = await import("./confirmation.js");
      init?.();
    }

    else if (pathname.includes("/checkout")) {
      const { init } = await import("./checkout.js");
      init?.();
    }

    else if (pathname.includes("/cart")) {
      const { init } = await import("./cart.js");
      init?.();
    }

    else {
      console.warn("No script loaded for this path:", pathname);
    }
  } catch (error) {
    console.error("Failed to load script:", error);
  }
};

loadPageScript();
