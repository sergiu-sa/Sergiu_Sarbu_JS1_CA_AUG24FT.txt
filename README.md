/Sergiu_Sarbu_JS1_CA_AUG24FT
├── index.html                     ← Main homepage (required by brief)
├── /src
│   ├── /pages
│   │   ├── /product
│   │   │   └── index.html         ← Single product page
│   │   └── /checkout
│   │       ├── index.html         ← Checkout page
│   │       └── /confirmation
│   │           └── index.html     ← Confirmation page
│   ├── /css
│   │   └── style.css              ← Main global stylesheet
│   ├── /js
│   │   ├── index.js               ← App entry point (figures out what page you're on)
│   │   ├── main.js                ← Homepage logic (fetch + display products)
│   │   ├── product.js             ← Single product page logic
│   │   ├── checkout.js            ← Checkout cart summary logic
│   │   ├── confirmation.js        ← Thank-you screen logic
│   │   └── cart.js                ← Cart helper (add/remove items, localStorage)
├── .gitignore                     ← Ignore node_modules, dist, etc.
├── package.json                   ← Vite config + dependencies
├── vite.config.js                 ← Optional: base URL config
