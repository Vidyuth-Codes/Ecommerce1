document.addEventListener("DOMContentLoaded", () => {
    const cartSection = document.querySelector(".cart-section");
  
    function getCart() {
      return JSON.parse(localStorage.getItem("cart")) || {};
    }
  
    function saveCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    function renderCart() {
      const cart = getCart();
      const keys = Object.keys(cart);
  
      if (keys.length === 0) {
        cartSection.innerHTML = `
          <div class="empty-cart">
            <img src="pictures/empty-cart.png" alt="Empty Cart" />
            <p>Your cart is empty!</p>
          </div>
        `;
        return;
      }
  
      let html = `<table class="cart-table">
        <thead>
          <tr>
            <th>Item</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th>Remove</th>
          </tr>
        </thead><tbody>`;
  
      let totalPrice = 0;
      let totalQuantity = 0;
  
      keys.forEach(key => {
        const item = cart[key];
        const subtotal = item.price * item.quantity;
        totalPrice += subtotal;
        totalQuantity += item.quantity;
  
        html += `
          <tr data-id="${item.id}">
            <td>
              <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
              <span>${item.name}</span>
            </td>
            <td>₹${item.price}</td>
            <td>
              <button class="dec-qty">-</button>
              <span class="item-qty">${item.quantity}</span>
              <button class="inc-qty">+</button>
            </td>
            <td>₹${subtotal}</td>
            <td><button class="remove-item">X</button></td>
          </tr>
        `;
      });
  
      html += `
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2"><strong>Total Items:</strong> ${totalQuantity}</td>
            <td colspan="3"><strong>Total Price:</strong> ₹${totalPrice}</td>
          </tr>
        </tfoot>
      </table>`;
  
      cartSection.innerHTML = html;
  
      // Add event listeners for increment, decrement, remove
      cartSection.querySelectorAll(".inc-qty").forEach(btn => {
        btn.addEventListener("click", () => {
          const row = btn.closest("tr");
          const id = row.dataset.id;
          updateQuantity(id, 1);
        });
      });
  
      cartSection.querySelectorAll(".dec-qty").forEach(btn => {
        btn.addEventListener("click", () => {
          const row = btn.closest("tr");
          const id = row.dataset.id;
          updateQuantity(id, -1);
        });
      });
  
      cartSection.querySelectorAll(".remove-item").forEach(btn => {
        btn.addEventListener("click", () => {
          const row = btn.closest("tr");
          const id = row.dataset.id;
          removeItem(id);
        });
      });
    }
  
    function updateQuantity(id, delta) {
      const cart = getCart();
      if (!cart[id]) return;
      cart[id].quantity += delta;
      if (cart[id].quantity < 1) cart[id].quantity = 1;
      saveCart(cart);
      renderCart();
    }
  
    function removeItem(id) {
      const cart = getCart();
      if (!cart[id]) return;
      delete cart[id];
      saveCart(cart);
      renderCart();
    }
  
    renderCart();
  });
  