import { defineConfig } from "vite";

export default defineConfig({
  root: ".", // Set the root to the current directory
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        product: "src/pages/product/index.html",
        checkout: "src/pages/checkout/index.html",
        confirmation: "src/pages/checkout/confirmation/index.html",
      },
    },
  },
});
