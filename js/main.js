'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // 0. Подсветка текущего пункта меню
  const currentFile = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-navbar .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    const isCatalogOnProduct = currentFile === 'product.html' && href === 'catalog.html';
    if (href === currentFile || isCatalogOnProduct) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // 1. Рендеринг карточек товаров на главной странице
  const popularGrid = document.getElementById('popular-grid');
  if (popularGrid) {
    const popularProducts = PRODUCTS.slice(0, 3);
    popularGrid.innerHTML = popularProducts.map(product => createProductCard(product)).join('');
  }

  // 2. Рендеринг карточек товаров в каталоге
  const catalogGrid = document.getElementById('catalog-grid');
  if (catalogGrid) {
    catalogGrid.innerHTML = PRODUCTS.map(product => createProductCard(product)).join('');
  }

  // 3. Рендеринг детальной страницы товара
  const productDetail = document.getElementById('product-detail');
  if (productDetail) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;
    const product = getProductById(productId);

    if (product) {
      renderProductDetail(product);
    }
  }

  // 4. Логика модального окна и передачи названия товара
  const orderModal = document.getElementById('orderModal');
  if (orderModal) {
    orderModal.addEventListener('show.bs.modal', (event) => {
      const button = event.relatedTarget;
      const product = button.getAttribute('data-product');
      const input = document.getElementById('selectedProduct');
      if (input && product) input.value = product;
    });
  }

  // 5. Валидация форм Bootstrap + Toast
  const forms = document.querySelectorAll('.needs-validation');
  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
        return;
      }

      event.preventDefault();

      // Показываем Toast
      const toastEl = document.getElementById('successToast');
      if (toastEl) {
        const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
        toast.show();
      }

      form.reset();
      form.classList.remove('was-validated');

      // Закрываем модалку
      const modalInstance = bootstrap.Modal.getInstance(orderModal);
      if (modalInstance) modalInstance.hide();

      // Если это форма заказа, очищаем корзину
      if (form.id === 'checkout-form') {
        clearCart();
      }
    });
  });

  // 6. Кнопка "Наверх" (через класс .is-visible)
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    const toggleBackToTop = () => {
      backToTopBtn.classList.toggle('is-visible', window.scrollY > 200);
    };
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 7. Фильтры и поиск в каталоге
  const catalogSearch = document.getElementById('catalog-search');
  const catalogSort = document.getElementById('catalog-sort');
  const filtersForm = document.getElementById('filters-form');

  if (catalogSearch && catalogGrid) {
    catalogSearch.addEventListener('input', filterCatalog);
    catalogSort.addEventListener('change', filterCatalog);
    filtersForm.addEventListener('submit', (e) => {
      e.preventDefault();
      filterCatalog();
    });
    document.getElementById('filters-reset').addEventListener('click', () => {
      filtersForm.reset();
      catalogSearch.value = '';
      filterCatalog();
    });
  }
});

// Функция создания HTML карточки товара
function createProductCard(product) {
  const badgeHtml = product.badge 
    ? `<span class="badge text-bg-danger product-badge">${product.badge}</span>` 
    : '';
  
  const oldPriceHtml = product.oldPrice 
    ? `<span class="old-price ms-2">${product.oldPrice.toLocaleString('ru-RU')} ₽</span>` 
    : '';

  return `
    <div class="col">
      <article class="card product-card h-100 position-relative">
        ${badgeHtml}
        <a href="product.html?id=${product.id}" class="text-decoration-none">
          <div class="product-image-placeholder">
            <i class="bi ${product.icon}"></i>
          </div>
        </a>
        <div class="card-body d-flex flex-column">
          <a href="product.html?id=${product.id}" class="text-decoration-none text-reset">
            <h3 class="h6 mb-2">${product.name}</h3>
          </a>
          <div class="product-rating mb-2">
            <i class="bi bi-star-fill"></i> ${product.rating}
            <span class="text-muted ms-1">(${product.reviews})</span>
          </div>
          <div class="mb-3">
            <span class="price">${product.price.toLocaleString('ru-RU')} ₽</span>
            ${oldPriceHtml}
          </div>
          <button class="btn btn-primary btn-sm w-100 mt-auto" onclick="addToCart(${product.id})">
            В корзину
          </button>
        </div>
      </article>
    </div>
  `;
}

// Функция рендеринга детальной страницы товара
function renderProductDetail(product) {
  document.title = `${product.name} — ShopMarket`;
  
  const badgeHtml = product.badge 
    ? `<span class="badge text-bg-danger mb-3">${product.badge}</span>` 
    : '';
  
  const oldPriceHtml = product.oldPrice 
    ? `<span class="old-price ms-2">${product.oldPrice.toLocaleString('ru-RU')} ₽</span>` 
    : '';

  const specsHtml = product.specs.map(spec => `
    <tr>
      <th scope="row">${spec.label}</th>
      <td>${spec.value}</td>
    </tr>
  `).join('');

  document.getElementById('product-detail').innerHTML = `
    <div class="col-lg-6">
      <div class="card overflow-hidden">
        <div class="product-image-placeholder product-media--lg rounded-0">
          <i class="bi ${product.icon}"></i>
        </div>
      </div>
    </div>
    <div class="col-lg-6">
      ${badgeHtml}
      <h1 class="h3 fw-bold mb-3">${product.name}</h1>
      <p class="text-muted mb-4">${product.description}</p>
      <div class="mb-4">
        <span class="price fs-3">${product.price.toLocaleString('ru-RU')} ₽</span>
        ${oldPriceHtml}
      </div>
      <div class="d-flex flex-wrap gap-2 mb-4">
        <button type="button" class="btn btn-primary" onclick="addToCart(${product.id})">
          <i class="bi bi-cart-plus me-1"></i>В корзину
        </button>
        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#orderModal">
          Оформить заказ
        </button>
      </div>
      <p class="small text-muted mb-0"><i class="bi bi-truck me-1"></i>Доставка по России · Учебный проект</p>
    </div>
    <div class="col-12 mt-5">
      <h2 class="h4 fw-bold mb-3">Характеристики</h2>
      <table class="table table-bordered table-striped align-middle">
        <caption class="visually-hidden">Основные характеристики товара</caption>
        <thead>
          <tr><th scope="col">Параметр</th><th scope="col">Значение</th></tr>
        </thead>
        <tbody>${specsHtml}</tbody>
      </table>
    </div>
  `;
}

// Функция фильтрации каталога
function filterCatalog() {
  const searchQuery = document.getElementById('catalog-search').value.toLowerCase();
  const sortBy = document.getElementById('catalog-sort').value;
  const categoryCheckboxes = document.querySelectorAll('input[name="category"]:checked');
  const selectedCategories = Array.from(categoryCheckboxes).map(cb => cb.value);
  const priceFrom = parseFloat(document.getElementById('price-from').value) || 0;
  const priceTo = parseFloat(document.getElementById('price-to').value) || Infinity;

  let filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = product.price >= priceFrom && product.price <= priceTo;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Сортировка
  if (sortBy === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const catalogGrid = document.getElementById('catalog-grid');
  catalogGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
  
  document.getElementById('catalog-count').textContent = filteredProducts.length;
  document.getElementById('catalog-empty').style.display = filteredProducts.length === 0 ? 'block' : 'none';
}