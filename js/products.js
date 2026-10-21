// Каталог товаров — только чтение
// Чтобы добавить новый товар, просто добавьте объект в этот массив

const PRODUCTS = [
  {
    id: 1,
    name: 'Ноутбук UltraBook Pro',
    price: 45000,
    oldPrice: 55000,
    category: 'electronics',
    description: 'Учебный ноутбук для работы и учёбы: быстрый процессор, лёгкий корпус и продолжительное время автономной работы.',
    icon: 'bi-laptop',
    rating: 4.8,
    reviews: 124,
    badge: 'ХИТ',
    specs: [
      { label: 'Процессор', value: 'Intel Core i7' },
      { label: 'Память', value: '16 ГБ DDR5' },
      { label: 'Накопитель', value: '512 ГБ SSD' },
      { label: 'Гарантия', value: '2 года' }
    ]
  },
  {
    id: 2,
    name: 'Смартфон Galaxy X',
    price: 32000,
    oldPrice: 40000,
    category: 'electronics',
    description: 'Смартфон с большим экраном, двойной камерой и памяти достаточно для приложений, фото и видео.',
    icon: 'bi-phone',
    rating: 4.6,
    reviews: 89,
    badge: '-20%',
    specs: [
      { label: 'Экран', value: '6.4" AMOLED' },
      { label: 'Память', value: '8 ГБ' },
      { label: 'Накопитель', value: '256 ГБ' },
      { label: 'Гарантия', value: '1 год' }
    ]
  },
  {
    id: 3,
    name: 'Наушники SoundMax',
    price: 5990,
    oldPrice: null,
    category: 'accessories',
    description: 'Беспроводные наушники с активным шумоподавлением и мягкими амбушюрами для долгого прослушивания.',
    icon: 'bi-headphones',
    rating: 4.9,
    reviews: 210,
    badge: null,
    specs: [
      { label: 'Тип', value: 'Накладные' },
      { label: 'Подключение', value: 'Bluetooth 5.3' },
      { label: 'Автономность', value: '30 часов' },
      { label: 'Гарантия', value: '1 год' }
    ]
  },
  {
    id: 4,
    name: 'Клавиатура MechKey K75',
    price: 7490,
    oldPrice: null,
    category: 'accessories',
    description: 'Механическая клавиатура с компактной раскладкой и сменной подсветкой клавиш.',
    icon: 'bi-keyboard',
    rating: 4.7,
    reviews: 156,
    badge: null,
    specs: [
      { label: 'Тип', value: 'Механическая' },
      { label: 'Раскладка', value: '75%' },
      { label: 'Подключение', value: 'USB / Bluetooth' },
      { label: 'Гарантия', value: '1 год' }
    ]
  },
  {
    id: 5,
    name: 'Монитор ViewPro 27',
    price: 21900,
    oldPrice: 24900,
    category: 'electronics',
    description: 'Монитор с матрицей IPS и узкой рамкой для работы с текстом, графикой и видео.',
    icon: 'bi-display',
    rating: 4.8,
    reviews: 98,
    badge: 'ХИТ',
    specs: [
      { label: 'Диагональ', value: '27"' },
      { label: 'Матрица', value: 'IPS' },
      { label: 'Разрешение', value: '2560 × 1440' },
      { label: 'Гарантия', value: '3 года' }
    ]
  },
  {
    id: 6,
    name: 'Пауэрбанк PowerGo 20000',
    price: 2490,
    oldPrice: null,
    category: 'accessories',
    description: 'Внешний аккумулятор с двумя USB-портами и поддержкой быстрой зарядки.',
    icon: 'bi-battery-charging',
    rating: 4.5,
    reviews: 67,
    badge: null,
    specs: [
      { label: 'Ёмкость', value: '20000 мА·ч' },
      { label: 'Порты', value: 'USB-A + USB-C' },
      { label: 'Выходная мощность', value: '20 Вт' },
      { label: 'Гарантия', value: '1 год' }
    ]
  }
];

// Функции для работы с каталогом
function getProductById(id) {
  return PRODUCTS.find(product => product.id === id);
}

function getProductsByCategory(category) {
  return PRODUCTS.filter(product => product.category === category);
}

function getAllProducts() {
  return [...PRODUCTS]; // Возвращаем копию, чтобы нельзя было изменить оригинал
}