// Корзина — добавление и удаление товаров
// Используем localStorage для сохранения между сессиями

const CART_KEY = 'shopmarket-cart';

// Получить корзину из localStorage
function getCart() {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Ошибка чтения корзины:', error);
    return [];
  }
}

// Сохранить корзину в localStorage
function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Ошибка сохранения корзины:', error);
  }
}

// Добавить товар в корзину
function addToCart(productId) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
  renderCart(); // Обновляем отображение корзины, если мы на странице order.html
}

// Уменьшить количество товара в корзине
function decreaseFromCart(productId) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity -= 1;
    if (existingItem.quantity <= 0) {
      removeFromCart(productId);
      return;
    }
  }

  saveCart(cart);
  updateCartCount();
  renderCart();
}

// Удалить товар из корзины
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  updateCartCount();
  renderCart();
}

// Очистить корзину
function clearCart() {
  saveCart([]);
  updateCartCount();
  renderCart();
}

// Получить количество товаров в корзине
function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Получить общую сумму корзины
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => {
    const product = getProductById(item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

// Обновить счётчик товаров в иконке корзины
function updateCartCount() {
  const count = getCartCount();
  const cartBadge = document.getElementById('cart-count');
  if (cartBadge) {
    cartBadge.textContent = count;
    cartBadge.style.display = count > 0 ? 'inline-block' : 'none';
  }
}

// Отрендерить корзину на странице order.html
function renderCart() {
  const cartList = document.getElementById('cart-list');
  if (!cartList) return; // Если мы не на странице корзины, выходим

  const cart = getCart();
  cartList.innerHTML = '';

  if (cart.length === 0) {
    cartList.innerHTML = '<p class="text-muted">Корзина пуста</p>';
    document.getElementById('cart-total').textContent = '0 ₽';
    return;
  }

  cart.forEach(item => {
    const product = getProductById(item.id);
    if (!product) return;

    const itemElement = document.createElement('div');
    itemElement.className = 'card mb-3';
    itemElement.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <i class="bi ${product.icon} fs-3 me-3" style="color: var(--accent-hover);"></i>
            <div>
              <h6 class="mb-1">${product.name}</h6>
              <p class="mb-0 text-muted small">${product.price.toLocaleString('ru-RU')} ₽ за шт.</p>
            </div>
          </div>
          <div class="d-flex align-items-center gap-2">
            <button class="btn btn-sm btn-outline-secondary" onclick="decreaseFromCart(${product.id})">−</button>
            <span class="fw-bold">${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary" onclick="addToCart(${product.id})">+</button>
            <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeFromCart(${product.id})">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    cartList.appendChild(itemElement);
  });

  document.getElementById('cart-total').textContent = getCartTotal().toLocaleString('ru-RU') + ' ₽';
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCart();
});