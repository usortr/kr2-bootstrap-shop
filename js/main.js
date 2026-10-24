'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // 0. Подсветка текущего пункта меню (включая корзину)
  const currentFile = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-navbar a.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    const isCatalogOnProduct = currentFile === 'product.html' && href === 'catalog.html';
    if (href === currentFile || isCatalogOnProduct) {
      link.classList.add('site-navbar__link--active');
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
    // Обновляем счётчик сразу при загрузке (учёт всех товаров)
    const catalogCount = document.getElementById('catalog-count');
    if (catalogCount) catalogCount.textContent = PRODUCTS.length;
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

      const toastEl = document.getElementById('successToast');
      if (toastEl) {
        const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
        toast.show();
      }

      form.reset();
      form.classList.remove('was-validated');

      const modalInstance = bootstrap.Modal.getInstance(orderModal);
      if (modalInstance) modalInstance.hide();

      if (form.id === 'checkout-form') {
        clearCart();
      }
    });
  });

  // 6. Кнопка "Наверх" (модификатор back-to-top--visible)
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    const toggleBackToTop = () => {
      backToTopBtn.classList.toggle('back-to-top--visible', window.scrollY > 200);
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

  // 8. Интерактивный рейтинг и chip-кнопки в форме обратной связи
  initContactExtras();
});

// Функция создания HTML-блока рейтинга (переиспользуется в карточке и на странице товара)
function createRatingHtml(product, modifier = '') {
  const modifierClass = modifier ? ` product-card__rating--${modifier}` : '';
  return `
    <div class="product-card__rating${modifierClass}">
      <i class="bi bi-star-fill"></i>
      <span class="product-card__rating-value">${product.rating}</span>
      <span class="product-card__rating-reviews text-muted ms-1">(${product.reviews} отзывов)</span>
    </div>
  `;
}

// Функция создания HTML карточки товара (БЭМ-классы для своих элементов)
function createProductCard(product) {
  const badgeHtml = product.badge
    ? `<span class="badge text-bg-danger product-card__badge">${product.badge}</span>`
    : '';

  const oldPriceHtml = product.oldPrice
    ? `<span class="product-card__old-price ms-2">${product.oldPrice.toLocaleString('ru-RU')} ₽</span>`
    : '';

  return `
    <div class="col">
      <article class="card product-card h-100 position-relative">
        ${badgeHtml}
        <a href="product.html?id=${product.id}" class="text-decoration-none">
          <div class="product-card__image">
            <i class="bi ${product.icon} product-card__icon"></i>
          </div>
        </a>
        <div class="card-body d-flex flex-column">
          <a href="product.html?id=${product.id}" class="text-decoration-none text-reset">
            <h3 class="h6 mb-2 product-card__title">${product.name}</h3>
          </a>
          <div class="mb-2">
            ${createRatingHtml(product)}
          </div>
          <div class="mb-3">
            <span class="product-card__price">${product.price.toLocaleString('ru-RU')} ₽</span>
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

// Функция рендеринга детальной страницы товара (БЭМ-классы для своих элементов)
function renderProductDetail(product) {
  document.title = `${product.name} — ShopMarket`;

  const badgeHtml = product.badge
    ? `<span class="badge text-bg-danger mb-3">${product.badge}</span>`
    : '';

  const oldPriceHtml = product.oldPrice
    ? `<span class="product-card__old-price ms-2">${product.oldPrice.toLocaleString('ru-RU')} ₽</span>`
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
        <div class="product-card__image product-card__image--lg rounded-0">
          <i class="bi ${product.icon} product-card__icon"></i>
        </div>
      </div>
    </div>
    <div class="col-lg-6">
      ${badgeHtml}
      <h1 class="h3 fw-bold mb-3 product-card__title product-card__title--detail">${product.name}</h1>
      <div class="mb-3">
        ${createRatingHtml(product, 'lg')}
      </div>
      <p class="text-muted mb-4">${product.description}</p>
      <div class="mb-4">
        <span class="product-card__price fs-3">${product.price.toLocaleString('ru-RU')} ₽</span>
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
    <div class="col-12 mt-5">
      <div class="related">
        <div class="related__header">
          <h2 class="h4 fw-bold mb-0">Похожие товары</h2>
          <a href="catalog.html" class="btn btn-outline-primary btn-sm">Смотреть все</a>
        </div>
        <div class="related__track" id="related-products">
          ${renderRelatedProducts(product)}
        </div>
      </div>
    </div>
  `;
}

// Функция рендеринга похожих товаров (та же категория, кроме текущего, до 8 штук)
function renderRelatedProducts(product) {
  const related = PRODUCTS
    .filter(item => item.category === product.category && item.id !== product.id)
    .slice(0, 8);

  if (related.length === 0) {
    return '<p class="text-muted mb-0">Похожих товаров пока нет.</p>';
  }

  // Возвращаем карточки без обёртки .col, чтобы они жили в горизонтальной ленте
  return related.map(item => {
    const badgeHtml = item.badge
      ? `<span class="badge text-bg-danger product-card__badge">${item.badge}</span>`
      : '';
    const oldPriceHtml = item.oldPrice
      ? `<span class="product-card__old-price ms-2">${item.oldPrice.toLocaleString('ru-RU')} ₽</span>`
      : '';

    return `
      <article class="card product-card product-card--related h-100 position-relative">
        ${badgeHtml}
        <a href="product.html?id=${item.id}" class="text-decoration-none">
          <div class="product-card__image">
            <i class="bi ${item.icon} product-card__icon"></i>
          </div>
        </a>
        <div class="card-body d-flex flex-column">
          <a href="product.html?id=${item.id}" class="text-decoration-none text-reset">
            <h3 class="h6 mb-2 product-card__title">${item.name}</h3>
          </a>
          <div class="mb-2">
            ${createRatingHtml(item)}
          </div>
          <div class="mb-3">
            <span class="product-card__price">${item.price.toLocaleString('ru-RU')} ₽</span>
            ${oldPriceHtml}
          </div>
          <button class="btn btn-primary btn-sm w-100 mt-auto" onclick="addToCart(${item.id})">
            В корзину
          </button>
        </div>
      </article>
    `;
  }).join('');
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

// Инициализация необычных полей формы «Обратная связь»
function initContactExtras() {
  /* --- Рейтинг звёздами --- */
  const ratingEl = document.getElementById('contact-rating');
  const ratingInput = document.getElementById('contact-rating-value');
  const ratingHint = document.getElementById('contact-rating-hint');

  if (ratingEl && ratingInput) {
    const stars = Array.from(ratingEl.querySelectorAll('.rating__star'));

    const setRating = (value) => {
      ratingInput.value = value;
      stars.forEach(star => {
        const starValue = parseInt(star.dataset.value, 10);
        const isActive = starValue <= value;
        star.classList.toggle('is-active', isActive);
        star.setAttribute('aria-checked', String(starValue === value));
      });
      if (ratingHint) {
        const messages = {
          1: 'Жаль, что так. Расскажите, что улучшить?',
          2: 'Спасибо, будем стараться лучше.',
          3: 'Спасибо, мы ещё работаем над удобством.',
          4: 'Спасибо! Рады, что вам удобно.',
          5: 'Спасибо! Нам очень приятно.'
        };
        ratingHint.textContent = value ? messages[value] : '';
      }
    };

    stars.forEach(star => {
      const value = parseInt(star.dataset.value, 10);
      star.addEventListener('click', () => setRating(value));
      star.addEventListener('mouseenter', () => {
        // Предпросмотр: подсвечиваем все до hovered включительно
        stars.forEach(s => {
          s.classList.toggle('is-active', parseInt(s.dataset.value, 10) <= value);
        });
      });
      star.addEventListener('mouseleave', () => {
        // Возвращаем фактическое значение
        const current = parseInt(ratingInput.value, 10) || 0;
        stars.forEach(s => {
          s.classList.toggle('is-active', parseInt(s.dataset.value, 10) <= current);
        });
      });
    });
  }

  /* --- Chip-кнопки «Как вы о нас узнали» --- */
  const chipsEl = document.getElementById('contact-source');
  const chipsInput = document.getElementById('contact-source-value');

  if (chipsEl && chipsInput) {
    const chips = Array.from(chipsEl.querySelectorAll('.chips__item'));

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const value = chip.dataset.value;
        const wasActive = chip.classList.contains('is-active');

        chips.forEach(c => {
          c.classList.remove('is-active');
          c.setAttribute('aria-pressed', 'false');
        });

        if (!wasActive) {
          chip.classList.add('is-active');
          chip.setAttribute('aria-pressed', 'true');
          chipsInput.value = value;
        } else {
          chipsInput.value = '';
        }
      });
    });
  }

  // Обработка формы обратной связи (на contacts.html)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Bootstrap-валидация
      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }
      contactForm.classList.add('was-validated');

      // Собираем данные (для демонстрации — просто выводим)
      const formData = {
        name: contactForm.querySelector('#contact-name').value,
        email: contactForm.querySelector('#contact-email').value,
        phone: contactForm.querySelector('#contact-phone').value,
        comment: contactForm.querySelector('#contact-comment').value,
        rating: parseInt(document.getElementById('contact-rating-value').value, 10) || null,
        source: document.getElementById('contact-source-value').value || null,
        agreement: contactForm.querySelector('#contact-agreement').checked
      };
      console.log('Заявка:', formData);

      // Показываем toast
      const toastEl = document.getElementById('app-toast');
      const toastText = document.getElementById('app-toast-text');
      if (toastEl && toastText) {
        toastText.textContent = 'Форма успешно принята';
        const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
        toast.show();
      }

      // Сброс
      contactForm.reset();
      contactForm.classList.remove('was-validated');
      resetContactExtras();

      // Закрываем модалку
      const modalEl = document.getElementById('contactModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();
    });
  }
}

// Сброс необычных полей при успешной отправке формы обратной связи
function resetContactExtras() {
  const ratingInput = document.getElementById('contact-rating-value');
  const ratingHint = document.getElementById('contact-rating-hint');
  const ratingStars = document.querySelectorAll('#contact-rating .rating__star');
  if (ratingInput) ratingInput.value = '';
  if (ratingHint) ratingHint.textContent = '';
  ratingStars.forEach(star => {
    star.classList.remove('is-active');
    star.setAttribute('aria-checked', 'false');
  });

  const chipsInput = document.getElementById('contact-source-value');
  const chips = document.querySelectorAll('#contact-source .chips__item');
  if (chipsInput) chipsInput.value = '';
  chips.forEach(chip => {
    chip.classList.remove('is-active');
    chip.setAttribute('aria-pressed', 'false');
  });
}