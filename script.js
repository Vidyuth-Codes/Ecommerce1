document.addEventListener("DOMContentLoaded", () => {
    // Sample item data: id, image, price, name
    const itemsData = [];
    for (let i = 1; i <= 20; i++) {
      itemsData.push({
        id: i,
        name: `Item ${i}`,
        image: `pictures/item${(i % 5) + 1}.jpg`, // rotate among 5 sample images you add
        price: 20 + i * 5,
      });
    }
  
    const itemsGrid = document.querySelector(".items-grid");
  
    // Generate item cards
    itemsGrid.innerHTML = "";
    itemsData.forEach(({ id, name, image, price }) => {
      const card = document.createElement("div");
      card.classList.add("item-card");
      card.innerHTML = `
        <img src="${image}" alt="${name}" />
        <p>${name}</p>
        <p>₹${price}</p>
        <div class="quantity-control">
          <button class="decrement">-</button>
          <span class="quantity">1</span>
          <button class="increment">+</button>
        </div>
        <button class="add-to-cart">Add to Cart</button>
      `;
      itemsGrid.appendChild(card);
  
      // Quantity controls
      const decrementBtn = card.querySelector(".decrement");
      const incrementBtn = card.querySelector(".increment");
      const quantitySpan = card.querySelector(".quantity");
      const addToCartBtn = card.querySelector(".add-to-cart");
  
      decrementBtn.addEventListener("click", () => {
        let qty = parseInt(quantitySpan.textContent);
        if (qty > 1) quantitySpan.textContent = qty - 1;
      });
  
      incrementBtn.addEventListener("click", () => {
        let qty = parseInt(quantitySpan.textContent);
        quantitySpan.textContent = qty + 1;
      });
  
      addToCartBtn.addEventListener("click", () => {
        const qty = parseInt(quantitySpan.textContent);
        addToCart(id, name, price, image, qty);
      });
    });
  
    // CART Functions
    function getCart() {
      return JSON.parse(localStorage.getItem("cart")) || {};
    }
  
    function saveCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    function addToCart(id, name, price, image, qty) {
      const cart = getCart();
      if (cart[id]) {
        cart[id].quantity += qty;
      } else {
        cart[id] = { id, name, price, image, quantity: qty };
      }
      saveCart(cart);
      updateCartCount();
      alert(`Added ${qty} x ${name} to cart`);
    }
  
    function updateCartCount() {
      const cart = getCart();
      let totalCount = 0;
      for (const key in cart) {
        totalCount += cart[key].quantity;
      }
      const countEl = document.getElementById("cart-count");
      if (countEl) countEl.textContent = totalCount;
    }
  
    updateCartCount();
  });
  