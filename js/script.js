/* VELORA FRAGRANCES - Core JavaScript
   Demo data clearly marked. Cart persists via localStorage.
*/

const PRODUCTS = [
  {
    id: "v001",
    name: "Noir Absolu",
    brand: "Velora Collection",
    category: "men",
    size: "100ml",
    price: 1899,
    stock: 12,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80",
    notes: ["Bergamot", "Black Pepper", "Cedarwood", "Amber"],
    description: "A bold, sophisticated masculine scent with deep woody notes and a warm amber base. Ideal for evening wear. DEMO PRODUCT — sample data only.",
    type: "Inspired",
    popularity: 95
  },
  {
    id: "v002",
    name: "Velvet Rose",
    brand: "Velora Collection",
    category: "women",
    size: "100ml",
    price: 1750,
    stock: 8,
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&q=80",
    notes: ["Rose Absolute", "Peony", "White Musk", "Vanilla"],
    description: "Elegant floral fragrance with a soft powdery finish. Romantic and refined. DEMO PRODUCT — sample data only.",
    type: "Inspired",
    popularity: 88
  },
  {
    id: "v003",
    name: "Ocean Mist",
    brand: "Velora Collection",
    category: "unisex",
    size: "50ml",
    price: 1299,
    stock: 15,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
    notes: ["Sea Salt", "Citrus", "Driftwood", "Musk"],
    description: "Fresh aquatic unisex scent capturing coastal breezes. Light and invigorating. DEMO PRODUCT — sample data only.",
    type: "Inspired",
    popularity: 82
  },
  {
    id: "v004",
    name: "Golden Oud",
    brand: "Velora Collection",
    category: "men",
    size: "100ml",
    price: 2499,
    stock: 5,
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80",
    notes: ["Oud", "Saffron", "Rose", "Leather"],
    description: "Rich oriental composition with precious oud and warm spices. Luxurious and long-lasting. DEMO PRODUCT — sample data only.",
    type: "Inspired",
    popularity: 91
  },
  {
    id: "v005",
    name: "Silk Blossom",
    brand: "Velora Collection",
    category: "women",
    size: "75ml",
    price: 1599,
    stock: 10,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80",
    notes: ["Jasmine", "Orange Blossom", "Sandalwood", "Cashmere"],
    description: "Soft floral with creamy base notes. Perfect for daytime elegance. DEMO PRODUCT — sample data only.",
    type: "Inspired",
    popularity: 79
  },
  {
    id: "v006",
    name: "Midnight Ember",
    brand: "Velora Collection",
    category: "unisex",
    size: "100ml",
    price: 1999,
    stock: 7,
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80",
    notes: ["Smoked Woods", "Vetiver", "Incense", "Tonka"],
    description: "Mysterious smoky unisex fragrance with depth and character. DEMO PRODUCT — sample data only.",
    type: "Inspired",
    popularity: 86
  },
  {
    id: "v007",
    name: "Citrus Grove",
    brand: "Velora Collection",
    category: "men",
    size: "50ml",
    price: 999,
    stock: 20,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80",
    notes: ["Bergamot", "Lemon", "Neroli", "Cedar"],
    description: "Bright and energetic citrus opening with a clean woody dry-down. DEMO PRODUCT — sample data only.",
    type: "Inspired",
    popularity: 74
  },
  {
    id: "v008",
    name: "Pearl Peony",
    brand: "Velora Collection",
    category: "women",
    size: "100ml",
    price: 1699,
    stock: 9,
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&q=80",
    notes: ["Peony", "Lily of the Valley", "Iris", "Soft Musk"],
    description: "Delicate floral bouquet with a modern clean finish. DEMO PRODUCT — sample data only.",
    type: "Inspired",
    popularity: 81
  }
];

let cart = JSON.parse(localStorage.getItem("velora_cart") || "[]");

function saveCart() {
  localStorage.setItem("velora_cart", JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  if (product.stock <= 0) {
    alert("This product is currently out of stock.");
    return;
  }
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    if (existing.qty + qty > product.stock) {
      alert(`Only ${product.stock} units available.`);
      return;
    }
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart();
  openCart();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  const product = PRODUCTS.find(p => p.id === productId);
  const newQty = item.qty + delta;
  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }
  if (newQty > product.stock) {
    alert(`Only ${product.stock} units available.`);
    return;
  }
  item.qty = newQty;
  saveCart();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function formatPrice(n) {
  return "R " + n.toLocaleString("en-ZA");
}

function updateCartUI() {
  const countEl = document.querySelectorAll(".cart-count");
  countEl.forEach(el => {
    el.textContent = getCartCount();
    el.style.display = getCartCount() > 0 ? "flex" : "none";
  });

  const itemsContainer = document.getElementById("cart-items");
  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `<div class="cart-empty"><p>Your cart is empty</p><a href="shop.html" class="btn btn-outline btn-sm mt-2" style="display:inline-flex;margin-top:1rem;">Continue Shopping</a></div>`;
  } else {
    itemsContainer.innerHTML = cart.map(item => {
      const p = PRODUCTS.find(pr => pr.id === item.id);
      if (!p) return "";
      return `
        <div class="cart-item">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <div class="cart-item-details">
            <div class="cart-item-name">${p.name}</div>
            <div class="cart-item-meta">${p.size} · ${formatPrice(p.price)}</div>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="updateQty('${p.id}', -1)" aria-label="Decrease">−</button>
              <span>${item.qty}</span>
              <button class="qty-btn" onclick="updateQty('${p.id}', 1)" aria-label="Increase">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${p.id}')">Remove</button>
          </div>
        </div>`;
    }).join("");
  }

  const subtotalEl = document.getElementById("cart-subtotal");
  if (subtotalEl) subtotalEl.textContent = formatPrice(getCartTotal());
}

function openCart() {
  document.getElementById("cart-overlay")?.classList.add("open");
  document.getElementById("cart-sidebar")?.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cart-overlay")?.classList.remove("open");
  document.getElementById("cart-sidebar")?.classList.remove("open");
  document.body.style.overflow = "";
}

function openSearch() {
  document.getElementById("search-overlay")?.classList.add("open");
  document.getElementById("search-input")?.focus();
}

function closeSearch() {
  document.getElementById("search-overlay")?.classList.remove("open");
  const results = document.getElementById("search-results");
  if (results) results.innerHTML = "";
  const input = document.getElementById("search-input");
  if (input) input.value = "";
}

function handleSearch(query) {
  const results = document.getElementById("search-results");
  if (!results) return;
  query = query.trim().toLowerCase();
  if (!query) {
    results.innerHTML = "";
    return;
  }
  const matches = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.brand.toLowerCase().includes(query) ||
    p.notes.some(n => n.toLowerCase().includes(query))
  ).slice(0, 6);
  if (matches.length === 0) {
    results.innerHTML = `<p style="padding:1rem;color:var(--text-muted);">No products found.</p>`;
    return;
  }
  results.innerHTML = matches.map(p => `
    <a href="product.html?id=${p.id}" class="search-result-item">
      <img src="${p.image}" alt="${p.name}">
      <div>
        <div style="color:var(--ivory);font-size:0.95rem;">${p.name}</div>
        <div style="color:var(--text-muted);font-size:0.8rem;">${formatPrice(p.price)}</div>
      </div>
    </a>`).join("");
}

function renderProductCard(p) {
  const stockClass = p.stock > 0 ? "" : "out";
  const stockText = p.stock > 0 ? `In stock (${p.stock})` : "Out of stock";
  return `
    <article class="product-card" data-id="${p.id}" data-category="${p.category}" data-price="${p.price}" data-popularity="${p.popularity}">
      <div class="product-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <span class="badge badge-demo">Demo</span>
      </div>
      <div class="product-info">
        <span class="product-brand">${p.brand}</span>
        <h3 class="product-name">${p.name}</h3>
        <span class="product-size">${p.size} · ${p.type}</span>
        <div class="product-price">${formatPrice(p.price)}</div>
        <div class="product-stock ${stockClass}">${stockText}</div>
        <div class="product-actions">
          <a href="product.html?id=${p.id}" class="btn btn-outline btn-sm">Details</a>
          <button class="btn btn-primary btn-sm" onclick="addToCart('${p.id}')" ${p.stock <= 0 ? "disabled" : ""}>Add to Cart</button>
        </div>
      </div>
    </article>`;
}

function renderBestsellers(containerId, limit = 4) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const sorted = [...PRODUCTS].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
  container.innerHTML = sorted.map(renderProductCard).join("");
}

function renderShopProducts(filters = {}) {
  const container = document.getElementById("shop-products");
  if (!container) return;
  let list = [...PRODUCTS];
  if (filters.category && filters.category !== "all") {
    list = list.filter(p => p.category === filters.category);
  }
  if (filters.minPrice) list = list.filter(p => p.price >= filters.minPrice);
  if (filters.maxPrice) list = list.filter(p => p.price <= filters.maxPrice);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  }
  if (filters.sort === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (filters.sort === "price-desc") list.sort((a, b) => b.price - a.price);
  else if (filters.sort === "popular") list.sort((a, b) => b.popularity - a.popularity);

  if (list.length === 0) {
    container.innerHTML = `<p class="text-center" style="grid-column:1/-1;color:var(--text-muted);padding:3rem;">No products match your filters.</p>`;
  } else {
    container.innerHTML = list.map(renderProductCard).join("");
  }
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

function initMobileNav() {
  const toggle = document.getElementById("mobile-toggle");
  const menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => menu.classList.toggle("open"));
  }
}

function initWhatsApp() {
  const btn = document.getElementById("whatsapp-btn");
  if (!btn) return;
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const number = "YOUR_WHATSAPP_NUMBER";
    let message = "Hello Velora Fragrances, I have a question.";
    if (cart.length > 0) {
      const lines = cart.map(item => {
        const p = PRODUCTS.find(pr => pr.id === item.id);
        return p ? `• ${p.name} (${p.size}) × ${item.qty}` : "";
      }).filter(Boolean);
      message = `Hello Velora Fragrances,%0A%0AI would like to enquire about the following items:%0A%0A${lines.join("%0A")}%0A%0AEstimated total: ${formatPrice(getCartTotal())}%0A%0APlease note this is an enquiry only — no payment has been made.`;
    }
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  });
}

function populateCheckoutSummary() {
  const container = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = `<p>Your cart is empty. <a href="shop.html" style="color:var(--gold);">Shop now</a></p>`;
    return;
  }
  container.innerHTML = cart.map(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    if (!p) return "";
    return `<div class="summary-row"><span>${p.name} × ${item.qty}</span><span>${formatPrice(p.price * item.qty)}</span></div>`;
  }).join("");
  if (totalEl) totalEl.textContent = formatPrice(getCartTotal());
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const email = form.email.value.trim();
  const address = form.address.value.trim();
  const delivery = form.delivery?.value || "delivery";

  if (!name || !phone || !email) {
    alert("Please fill in all required fields.");
    return;
  }
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const orderId = "VF" + Date.now().toString().slice(-8);
  const summary = {
    orderId,
    name,
    phone,
    email,
    address,
    delivery,
    items: cart.map(i => {
      const p = PRODUCTS.find(pr => pr.id === i.id);
      return { name: p?.name, qty: i.qty, price: p?.price };
    }),
    total: getCartTotal(),
    status: "Enquiry / Awaiting Payment"
  };

  const orders = JSON.parse(localStorage.getItem("velora_orders") || "[]");
  orders.push(summary);
  localStorage.setItem("velora_orders", JSON.stringify(orders));

  cart = [];
  saveCart();

  const result = document.getElementById("checkout-result");
  if (result) {
    result.innerHTML = `
      <div class="demo-notice">
        <h3 style="margin-bottom:0.75rem;color:var(--gold);">Order Enquiry Received (Demo)</h3>
        <p>Reference: <strong>${orderId}</strong></p>
        <p style="margin-top:0.75rem;">This is a demonstration only. No payment has been processed and no order has been confirmed.</p>
        <p style="margin-top:0.5rem;">To complete a real order, contact us via WhatsApp with your reference number. Real Yoco payment integration requires backend setup.</p>
        <a href="index.html" class="btn btn-primary mt-2" style="margin-top:1.25rem;display:inline-flex;">Return Home</a>
        <a href="#" id="whatsapp-order" class="btn btn-outline mt-2" style="margin-top:0.75rem;display:inline-flex;">Enquire via WhatsApp</a>
      </div>`;
    form.style.display = "none";
    document.getElementById("whatsapp-order")?.addEventListener("click", (ev) => {
      ev.preventDefault();
      const number = "YOUR_WHATSAPP_NUMBER";
      const msg = `Hello Velora Fragrances,%0A%0AOrder enquiry reference: ${orderId}%0AName: ${name}%0APhone: ${phone}%0ATotal: ${formatPrice(summary.total)}%0A%0APlease assist with payment and delivery options.`;
      window.open(`https://wa.me/${number}?text=${msg}`, "_blank");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
  initMobileNav();
  initWhatsApp();

  renderBestsellers("bestsellers-grid", 4);

  const categoryFilter = document.getElementById("filter-category");
  const sortFilter = document.getElementById("filter-sort");
  const searchFilter = document.getElementById("filter-search");
  if (categoryFilter || sortFilter || searchFilter) {
    const applyFilters = () => {
      renderShopProducts({
        category: categoryFilter?.value || "all",
        sort: sortFilter?.value || "popular",
        search: searchFilter?.value || ""
      });
    };
    categoryFilter?.addEventListener("change", applyFilters);
    sortFilter?.addEventListener("change", applyFilters);
    searchFilter?.addEventListener("input", applyFilters);
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat && categoryFilter) {
      categoryFilter.value = cat;
    }
    applyFilters();
  }

  const productContainer = document.getElementById("product-detail");
  if (productContainer) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const product = getProductById(id);
    if (product) {
      productContainer.innerHTML = `
        <div class="product-detail-img">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-detail-info">
          <span class="product-brand">${product.brand}</span>
          <h1>${product.name}</h1>
          <p class="product-size" style="margin:0.5rem 0;">${product.size} · ${product.type} Fragrance</p>
          <div class="product-price" style="font-size:1.5rem;margin:0.75rem 0;">${formatPrice(product.price)}</div>
          <div class="product-stock ${product.stock > 0 ? "" : "out"}">${product.stock > 0 ? `In stock (${product.stock} available)` : "Out of stock"}</div>
          <p style="margin:1.25rem 0;color:var(--text-muted);line-height:1.7;">${product.description}</p>
          <h4 style="margin-bottom:0.5rem;font-size:0.9rem;color:var(--gold);">Fragrance Notes</h4>
          <div class="notes-list">${product.notes.map(n => `<span class="note-tag">${n}</span>`).join("")}</div>
          <div class="demo-notice" style="margin:1.5rem 0;">This is demo product data. Real inventory, authenticity verification, and pricing must be confirmed by the business owner before sale.</div>
          <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-top:1.5rem;">
            <button class="btn btn-primary" onclick="addToCart('${product.id}')" ${product.stock <= 0 ? "disabled" : ""}>Add to Cart</button>
            <a href="shop.html" class="btn btn-outline">Back to Shop</a>
          </div>
        </div>`;
    } else {
      productContainer.innerHTML = `<p class="text-center">Product not found. <a href="shop.html" style="color:var(--gold);">Return to shop</a></p>`;
    }
  }

  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    populateCheckoutSummary();
    checkoutForm.addEventListener("submit", handleCheckoutSubmit);
  }

  document.getElementById("cart-overlay")?.addEventListener("click", closeCart);
  document.getElementById("search-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "search-overlay") closeSearch();
  });
});
