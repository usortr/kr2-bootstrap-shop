// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  const orderForm = document.getElementById('orderForm');
  const successMessage = document.getElementById('successMessage');
  const selectedProductInput = document.getElementById('selectedProduct');

  // Bootstrap модальное окно (для доступа к его событиям)
  const modalElement = document.getElementById('orderModal');
  const modal = new bootstrap.Modal(modalElement);

  // При показе модалки записываем название товара в скрытое поле
  modalElement.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget; // Кнопка, которая открыла модалку
    const productName = button.getAttribute('data-product');
    if (selectedProductInput && productName) {
      selectedProductInput.value = productName;
    }
  });

  // Обработка отправки формы
  if (orderForm) {
    orderForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Отменяем стандартную отправку

      if (!orderForm.checkValidity()) {
        event.stopPropagation();
        orderForm.classList.add('was-validated'); // Включаем валидацию Bootstrap
        return;
      }

      // Если форма валидна:
      orderForm.classList.remove('was-validated');
      orderForm.reset();
      
      // Показываем сообщение об успехе (Bootstrap alert)
      successMessage.classList.remove('d-none');
      
      // Скрываем модалку
      modal.hide();

      // Скрываем сообщение через 3 секунды
      setTimeout(() => {
        successMessage.classList.add('d-none');
      }, 3000);
    });
  }
});