# GameHub – JavaScript 1 Resit Assignment

**Student:** Sergiu Sarbu  
**Course:** Front-End Development – Noroff  
**Assignment:** JS1 SP1 Resit | August 2024 Full-Time  
**Project type:** Vite + Vanilla JavaScript GameHub site  

---

## Folder Structure

```
📁 project-root/
├── index.html                         # Homepage (Product list)
├── vite.config.js                    # Vite config
├── /src
│   ├── /css
│   │   └── style.css                 # Global site styles
│   ├── /js
│   │   ├── main.js                  # Handles routing between pages
│   │   ├── index.js                 # Homepage logic
│   │   ├── product.js               # Single product page logic
│   │   ├── checkout.js             # Cart/checkout logic
│   │   ├── confirmation.js         # Order confirmation logic
│   │   └── cart.js                 # Utility for cart localStorage
│   └── /pages
│       ├── /product
│       │   └── index.html          # Single product page
│       └── /checkout
│           ├── index.html         # Checkout page (cart)
│           └── /confirmation
│               └── index.html     # Order confirmation page
```

---

##  Features

- Fetches products from [Noroff GameHub API](https://api.noroff.dev/api/v1/gamehub)
- View all products and filter by:
  - Genre
  - Age rating
  - Favorites (categories)
- View full product details
- Add to cart (with quantity)
- Update and remove products from cart
- View subtotal, discount, shipping, and total in checkout
- Confirmation page with:
  - Fake order number & date
  - Product summary
  - Downloadable receipt (.txt)
- Fully responsive and accessible
- LocalStorage used for cart data

---

##  Tech Stack

- **HTML5** (semantic structure)
- **CSS** (custom variables, responsive layout)
- **JavaScript ES Modules**
- **Vite** (development/build tool)
- **FontAwesome** (for icons)

---

##  Sources Used

- Noroff GameHub API  
- MDN Web Docs (for `localStorage`, `fetch`, `async/await`, DOM methods)  
- Font Awesome  
- Vite Documentation  
 

---

##  Getting Started (Dev Mode)

```bash
npm install
npm run dev
```

To build for production:
```bash
npm run build
```

---

##  Submitted For

Noroff | Front-End Development  
JavaScript 1 – Resit Submission (SP1 - CA)  
**Class:** August 2024 Full-Time  
**Candidate:** Sergiu Sarbu
