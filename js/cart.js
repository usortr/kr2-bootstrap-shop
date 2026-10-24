// Корзина — централизованное подмножество PRODUCTS.
// В localStorage храним только [{ id, quantity }], сами товары берём из products.js.

const CART_KEY = 'shopmarket-cart';

/* ===== Чтение / запись ===== */

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Чистим записи, которых больше нет в PRODUCTS, и приводим к {id, quantity}
    return parsed
      .filter(item => item && typeof item.id !== 'undefined' && getProductById(item.id))
      .map(item => ({ id: item.id, quantity: Math.max(1, parseInt(item.quantity, 10) || 1) }));
  } catch (error) {
    console.error('Ошибка чтения корзины:', error);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Ошибка сохранения корзины:', error);
  }
}

/* ===== Изменение корзины ===== */

function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) {
    console.warn('Товар не найден в PRODUCTS:', productId);
    return;
  }

  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
  renderCart();
}

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

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  updateCartCount();
  renderCart();
}

function clearCart() {
  saveCart([]);
  updateCartCount();
  renderCart();
}

/* ===== Подсчёты ===== */

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return getCart().reduce((total, item) => {
    const product = getProductById(item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

/* ===== Отображение ===== */

function updateCartCount() {
  const count = getCartCount();
  document.querySelectorAll('#cart-count').forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-block' : 'none';
  });
}

function renderCart() {
  const cartList = document.getElementById('cart-list');
  if (!cartList) return; // не на странице корзины

  const cart = getCart();
  cartList.innerHTML = '';

  if (cart.length === 0) {
    cartList.innerHTML = '<p class="text-muted">Корзина пуста</p>';
    const totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.textContent = '0 ₽';
    return;
  }

  cart.forEach(item => {
    const product = getProductById(item.id);
    if (!product) return;

    const itemElement = document.createElement('div');
    itemElement.className = 'card mb-3';
        itemElement.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center gap-3">
          <div class="d-flex align-items-center flex-grow-1 cart-item__info">
            <i class="bi ${product.icon} fs-3 me-3 product-card__icon"></i>
            <div class="cart-item__text">
              <h6 class="mb-1 product-card__title product-card__title--cart">${product.name}</h6>
              <p class="mb-0 text-muted small">${product.price.toLocaleString('ru-RU')} ₽ за шт.</p>
            </div>
          </div>
          <div class="d-flex align-items-center gap-2 flex-shrink-0">
            <button class="btn btn-sm btn-outline-secondary" type="button"
                    onclick="decreaseFromCart(${product.id})" aria-label="Уменьшить количество">−</button>
            <span class="fw-bold">${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary" type="button"
                    onclick="addToCart(${product.id})" aria-label="Увеличить количество">+</button>
            <button class="btn btn-sm btn-outline-danger ms-2" type="button"
                    onclick="removeFromCart(${product.id})" aria-label="Удалить товар">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    cartList.appendChild(itemElement);
  });

  const totalEl = document.getElementById('cart-total');
  if (totalEl) {
    totalEl.textContent = getCartTotal().toLocaleString('ru-RU') + ' ₽';
  }
}

/* ===== Инициализация ===== */

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCart();
});

// Синхронизация между вкладками: если корзина изменилась в другой вкладке,
// обновляем счётчик и (если открыта) список корзины.
window.addEventListener('storage', (event) => {
  if (event.key === CART_KEY) {
    updateCartCount();
    renderCart();
  }
});