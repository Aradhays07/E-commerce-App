document.addEventListener("DOMContentLoaded", () => {
  let cart = [];

  const products = [
    { id: 1, name: "Premium Headphones", price: 299.99 },
    { id: 2, name: "Smart Watch", price: 199.99 },
    { id: 3, name: "Wireless Speaker", price: 149.99 },
    { id: 4, name: "Gaming Mouse", price: 79.99 },
    { id: 5, name: "Mechanical Keyboard", price: 159.99 },
  ];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalSection = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");
  const clearCartBtn = document.getElementById("clear-cart-btn");

  const cursor = document.getElementById("cursor");
  const rings = cursor.querySelectorAll(".ring");

  function init() {
    renderProducts();
    renderCart();
    setupEventListeners();
  }

  function renderProducts() {
    productList.innerHTML = "";
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";
      productDiv.innerHTML = `
              <span>${product.name} - $${product.price.toFixed(2)}</span>
              <button onclick="addToCart(${product.id})">Add to Cart</button>
          `;
      productList.appendChild(productDiv);
    });
  }

  window.addToCart = function (productId) {
    const product = products.find((p) => p.id === productId);
    if (product) {
      cart.push({ ...product, cartId: Date.now() + Math.random() });
      renderCart();
      showSuccessMessage(`${product.name} added to cart!`);
    }
  };

  window.removeFromCart = function (cartId) {
    const item = cart.find((item) => item.cartId === cartId);
    cart = cart.filter((item) => item.cartId !== cartId);
    renderCart();
    if (item) {
      showSuccessMessage(`${item.name} removed from cart!`);
    }
  };

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalSection.classList.remove("hidden");

      cart.forEach((item) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
                  <div class="cart-item-info">
                      <div class="cart-item-name">${item.name}</div>
                      <div class="cart-item-price">${item.price.toFixed(2)}</div>
                  </div>
                  <button class="cart-item-remove" onclick="removeFromCart(${item.cartId})">Remove</button>
              `;
        cartItems.appendChild(cartItem);
      });

      totalPriceDisplay.textContent = totalPrice.toFixed(2);
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalSection.classList.add("hidden");
    }
  }

  function showSuccessMessage(message) {
    const existingMessage = document.querySelector(".success-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    const successDiv = document.createElement("div");
    successDiv.className = "success-message";
    successDiv.textContent = message;

    const container = document.querySelector(".container");
    container.insertBefore(successDiv, container.firstChild);

    setTimeout(() => {
      successDiv.remove();
    }, 3000);
  }

  function setupEventListeners() {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length > 0) {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cart = [];
        renderCart();
        showSuccessMessage(`Checkout successful! Total: ${total.toFixed(2)}`);
      }
    });

    clearCartBtn.addEventListener("click", () => {
      if (cart.length > 0) {
        cart = [];
        renderCart();
        showSuccessMessage("Cart cleared successfully!");
      }
    });

    document.addEventListener("mousemove", (e) => {
      const { clientX: x, clientY: y } = e;
      rings[0].style.transform = `translate(${x - 20}px, ${y - 20}px)`;
      rings[1].style.transform = `translate(${x - 2}px, ${y - 2}px)`;
    });

    document.querySelectorAll(".Nav-item a").forEach((link) => {
      link.addEventListener("click", (e) => {
        if (link.getAttribute("href").startsWith("#")) {
          e.preventDefault();
        }

        document.querySelectorAll(".Nav-item").forEach((item) => {
          item.classList.remove("is-active");
        });
        link.parentElement.classList.add("is-active");
      });
    });
  }

  init();
});