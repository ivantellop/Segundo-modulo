document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");
  const body = document.body;

  // Cargar tema desde localStorage
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
  }

  toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    const currentTheme = body.classList.contains("dark-theme")
      ? "dark"
      : "light";
    localStorage.setItem("theme", currentTheme); // Guardar preferencia
  });
});

const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const items = document.querySelectorAll(".menu-item");
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(query) ? "block" : "none";
  });
});

const notification = document.getElementById("notification");
setTimeout(() => {
  notification.classList.remove("hidden");
  setTimeout(() => notification.classList.add("hidden"), 5000);
}, 2000);

const cartButton = document.getElementById("cart-button");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");

// Estado del carrito
let cart = [];

// Mostrar/ocultar carrito
cartButton.addEventListener("click", () => {
  cartModal.classList.toggle("visible");
});

closeCart.addEventListener("click", () => {
  cartModal.classList.remove("visible");
});

// Añadir productos al carrito
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.getAttribute("data-name");
    const productPrice = parseFloat(button.getAttribute("data-price"));
    const quantity = parseInt(prompt(`¿Cuántas unidades de "${productName}" deseas añadir?`, 1)) || 1;

    addToCart(productName, productPrice, quantity);
  });
});

function addToCart(productName, productPrice, quantity) {
  const existingProduct = cart.find((item) => item.name === productName);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ name: productName, price: productPrice, quantity: quantity });
  }

  updateCart();
}

// Actualizar carrito
function updateCart() {
  cartItems.innerHTML = ""; // Limpia la lista
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
      <button onclick="removeFromCart(${index})">❌</button>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Eliminar productos del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Finalizar compra
checkoutButton.addEventListener("click", () => {
  alert(`Compra realizada. Total: $${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`);
  cart = [];
  updateCart();
  cartModal.classList.remove("visible");
});
