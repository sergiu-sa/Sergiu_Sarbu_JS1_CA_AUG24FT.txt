// src/js/main.js

const pathname = window.location.pathname;

const loadPageScript = async () => {
  try {
    if (pathname === "/" || pathname === "/index.html") {
      const { init } = await import("./index.js"); // Homepage logic
      init?.();
    } else if (pathname.includes("/product")) {
      const { init } = await import("./product.js");
      init?.();
    } else if (pathname.includes("/checkout/confirmation")) {
      const { init } = await import("./confirmation.js");
      init?.();
    } else if (pathname.includes("/checkout")) {
      const { init } = await import("./checkout.js");
      init?.();
    } else if (pathname.includes("/cart")) {
      const { init } = await import("./cart.js");
      init?.();
    } else {
      console.warn("Page not recognized:", pathname);
    }
  } catch (error) {
    console.error("Script loading error:", error);
  }
};

loadPageScript();
