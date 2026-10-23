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
  },
  {
    id: 7,
    name: 'Планшет TabLite 11',
    price: 18900,
    oldPrice: 22900,
    category: 'electronics',
    description: 'Планшет с ярким экраном и металлическим корпусом — удобен для учёбы, чтения и просмотра видео.',
    icon: 'bi-tablet',
    rating: 4.6,
    reviews: 74,
    badge: null,
    specs: [
      { label: 'Экран', value: '11" IPS' },
      { label: 'Память', value: '6 ГБ' },
      { label: 'Накопитель', value: '128 ГБ' },
      { label: 'Гарантия', value: '1 год' }
    ]
  },
  {
    id: 8,
    name: 'Умные часы FitBand S2',
    price: 8990,
    oldPrice: null,
    category: 'electronics',
    description: 'Умные часы с пульсометром, шагомером и уведомлениями со смартфона. Работают до 7 дней без подзарядки.',
    icon: 'bi-smartwatch',
    rating: 4.4,
    reviews: 132,
    badge: 'NEW',
    specs: [
      { label: 'Экран', value: '1.7" AMOLED' },
      { label: 'Защита', value: '5 ATM' },
      { label: 'Автономность', value: '7 дней' },
      { label: 'Гарантия', value: '1 год' }
    ]
  },
  {
    id: 9,
    name: 'Портативная колонка BoomBox Mini',
    price: 3490,
    oldPrice: 4290,
    category: 'electronics',
    description: 'Компактная Bluetooth-колонка с насыщенным звуком и защитой от брызг — для дома и прогулок.',
    icon: 'bi-speaker',
    rating: 4.5,
    reviews: 58,
    badge: '-18%',
    specs: [
      { label: 'Мощность', value: '10 Вт' },
      { label: 'Подключение', value: 'Bluetooth 5.0' },
      { label: 'Автономность', value: '12 часов' },
      { label: 'Гарантия', value: '1 год' }
    ]
  },
  {
    id: 10,
    name: 'Электронная книга PageTurn 6',
    price: 12900,
    oldPrice: null,
    category: 'electronics',
    description: 'Ридер с экраном E-Ink и подсветкой — глаза не устают даже при долгом чтении.',
    icon: 'bi-book',
    rating: 4.7,
    reviews: 41,
    badge: null,
    specs: [
      { label: 'Экран', value: '6" E-Ink' },
      { label: 'Память', value: '8 ГБ' },
      { label: 'Подсветка', value: 'Есть' },
      { label: 'Гарантия', value: '1 год' }
    ]
  },
  {
    id: 11,
    name: 'Веб-камера ClearView HD',
    price: 2790,
    oldPrice: null,
    category: 'electronics',
    description: 'Веб-камера 1080p со встроенным микрофоном — для онлайн-занятий и видеозвонков.',
    icon: 'bi-camera-video',
    rating: 4.3,
    reviews: 36,
    badge: null,
    specs: [
      { label: 'Разрешение', value: '1920×1080' },
      { label: 'Микрофон', value: 'Встроенный' },
      { label: 'Крепление', value: 'Клипса / штатив' },
      { label: 'Гарантия', value: '1 год' }
    ]
  },
  {
    id: 12,
    name: 'Портативный SSD DriveGo 500',
    price: 6490,
    oldPrice: 7490,
    category: 'electronics',
    description: 'Внешний SSD на 500 ГБ с интерфейсом USB-C — быстрый обмен файлами и компактный корпус.',
    icon: 'bi-hdd',
    rating: 4.8,
    reviews: 63,
    badge: 'ХИТ',
    specs: [
      { label: 'Ёмкость', value: '500 ГБ' },
      { label: 'Интерфейс', value: 'USB-C 3.2' },
      { label: 'Скорость', value: 'до 1000 МБ/с' },
      { label: 'Гарантия', value: '2 года' }
    ]
  },
  {
    id: 13,
    name: 'Роутер NetSpeed AX1800',
    price: 4590,
    oldPrice: null,
    category: 'electronics',
    description: 'Двухдиапазонный Wi-Fi 6 роутер с четырьмя антеннами и простой настройкой через приложение.',
    icon: 'bi-router',
    rating: 4.5,
    reviews: 47,
    badge: null,
    specs: [
      { label: 'Стандарт', value: 'Wi-Fi 6 (AX1800)' },
      { label: 'Диапазоны', value: '2.4 / 5 ГГц' },
      { label: 'Порты', value: '4 × LAN, 1 × WAN' },
      { label: 'Гарантия', value: '2 года' }
    ]
  },
  {
    id: 14,
    name: 'Мышка SilentClick Pro',
    price: 1990,
    oldPrice: null,
    category: 'accessories',
    description: 'Беспроводная мышь с тихими кнопками и точным сенсором — не отвлекает окружающих.',
    icon: 'bi-mouse',
    rating: 4.6,
    reviews: 112,
    badge: null,
    specs: [
      { label: 'Подключение', value: 'USB-ресивер' },
      { label: 'Сенсор', value: '1600 DPI' },
      { label: 'Питание', value: '1 × AA' },
      { label: 'Гарантия', value: '1 год' }
    ]
  },
  {
    id: 15,
    name: 'Коврик для мыши DeskMat XL',
    price: 1290,
    oldPrice: 1590,
    category: 'accessories',
    description: 'Большой тканевый коврик с прошитыми краями — под клавиатуру и мышь одновременно.',
    icon: 'bi-border',
    rating: 4.7,
    reviews: 84,
    badge: '-19%',
    specs: [
      { label: 'Размер', value: '900 × 400 мм' },
      { label: 'Материал', value: 'Ткань + резина' },
      { label: 'Края', value: 'Прошитые' },
      { label: 'Гарантия', value: '6 месяцев' }
    ]
  },
  {
    id: 16,
    name: 'USB-хаб PortMaster 7в1',
    price: 2290,
    oldPrice: null,
    category: 'accessories',
    description: 'Хаб на 7 портов с HDMI, USB-A, USB-C и слотом для карт памяти — расширяет возможности ноутбука.',
    icon: 'bi-usb-symbol',
    rating: 4.4,
    reviews: 39,
    badge: null,
    specs: [
      { label: 'Порты', value: '7' },
      { label: 'Видеовыход', value: 'HDMI 4K' },
      { label: 'Питание', value: 'PD 100 Вт' },
      { label: 'Гарантия', value: '1 год' }
    ]
  },
  {
    id: 17,
    name: 'Кабель USB-C → USB-C 2 м',
    price: 690,
    oldPrice: null,
    category: 'accessories',
    description: 'Прочный нейлоновый кабель для зарядки и передачи данных на скорости до 480 Мбит/с.',
    icon: 'bi-plug',
    rating: 4.3,
    reviews: 210,
    badge: null,
    specs: [
      { label: 'Длина', value: '2 м' },
      { label: 'Разъёмы', value: 'USB-C — USB-C' },
      { label: 'Ток', value: 'до 3 А' },
      { label: 'Гарантия', value: '6 месяцев' }
    ]
  },
  {
    id: 18,
    name: 'Зарядное устройство GaN 65 Вт',
    price: 2990,
    oldPrice: 3490,
    category: 'accessories',
    description: 'Компактный GaN-адаптер на 65 Вт с двумя портами — зарядит ноутбук и телефон одновременно.',
    icon: 'bi-lightning-charge',
    rating: 4.8,
    reviews: 96,
    badge: 'ХИТ',
    specs: [
      { label: 'Мощность', value: '65 Вт' },
      { label: 'Порты', value: '2 × USB-C' },
      { label: 'Технология', value: 'GaN' },
      { label: 'Гарантия', value: '1 год' }
    ]
  },
  {
    id: 19,
    name: 'Чехол для ноутбука SlimCase 15"',
    price: 1790,
    oldPrice: null,
    category: 'accessories',
    description: 'Мягкий чехол с водозащитной тканью и внутренним карманом для документов.',
    icon: 'bi-briefcase',
    rating: 4.5,
    reviews: 52,
    badge: null,
    specs: [
      { label: 'Диагональ', value: '15–16"' },
      { label: 'Материал', value: 'Полиэстер' },
      { label: 'Карманы', value: 'Внутренний + внешний' },
      { label: 'Гарантия', value: '6 месяцев' }
    ]
  },
  {
    id: 20,
    name: 'Подставка для ноутбука ErgoLift',
    price: 2190,
    oldPrice: null,
    category: 'accessories',
    description: 'Алюминиевая подставка с регулировкой угла — помогает держать правильную осанку.',
    icon: 'bi-layout-sidebar-inset',
    rating: 4.6,
    reviews: 33,
    badge: null,
    specs: [
      { label: 'Материал', value: 'Алюминий' },
      { label: 'Регулировка', value: '6 положений' },
      { label: 'Макс. вес', value: '10 кг' },
      { label: 'Гарантия', value: '1 год' }
    ]
  },
  {
    id: 21,
    name: 'Наушники InEar Air 3',
    price: 4490,
    oldPrice: 5290,
    category: 'accessories',
    description: 'Беспроводные TWS-наушники с кейсом-зарядкой и сенсорным управлением.',
    icon: 'bi-earbuds',
    rating: 4.7,
    reviews: 178,
    badge: '-15%',
    specs: [
      { label: 'Тип', value: 'TWS вкладыши' },
      { label: 'Подключение', value: 'Bluetooth 5.3' },
      { label: 'Автономность', value: '24 часа с кейсом' },
      { label: 'Гарантия', value: '1 год' }
    ]
  },
  {
    id: 22,
    name: 'Микрофон StreamMic USB',
    price: 5590,
    oldPrice: null,
    category: 'accessories',
    description: 'USB-микрофон для стримов, записи и онлайн-встреч с кардиоидной диаграммой направленности.',
    icon: 'bi-mic',
    rating: 4.5,
    reviews: 44,
    badge: null,
    specs: [
      { label: 'Тип', value: 'Конденсаторный' },
      { label: 'Подключение', value: 'USB' },
      { label: 'Частоты', value: '20 Гц – 20 кГц' },
      { label: 'Гарантия', value: '1 год' }
    ]
  },
  {
    id: 23,
    name: 'Кольцевая лампа RingLight 10"',
    price: 1890,
    oldPrice: null,
    category: 'accessories',
    description: 'Лампа с тремя режимами цвета и регулировкой яркости — для съёмок и видеозвонков.',
    icon: 'bi-lightbulb',
    rating: 4.2,
    reviews: 61,
    badge: null,
    specs: [
      { label: 'Диаметр', value: '10"' },
      { label: 'Режимы', value: '3 цвета' },
      { label: 'Питание', value: 'USB' },
      { label: 'Гарантия', value: '6 месяцев' }
    ]
  },
  {
    id: 24,
    name: 'Стилус для планшета PenGo',
    price: 2590,
    oldPrice: 2990,
    category: 'accessories',
    description: 'Активный стилус с поддержкой наклона и palm rejection — подходит для заметок и рисунков.',
    icon: 'bi-pencil',
    rating: 4.4,
    reviews: 29,
    badge: null,
    specs: [
      { label: 'Совместимость', value: 'iOS / Android' },
      { label: 'Питание', value: 'USB-C' },
      { label: 'Функции', value: 'Наклон, palm rejection' },
      { label: 'Гарантия', value: '1 год' }
    ]
  },
  {
    id: 25,
    name: 'Сетевой фильтр PowerSafe 5',
    price: 1490,
    oldPrice: null,
    category: 'accessories',
    description: 'Сетевой фильтр на 5 розеток с защитой от перегрузок и кабелем 3 м.',
    icon: 'bi-outlet',
    rating: 4.6,
    reviews: 73,
    badge: null,
    specs: [
      { label: 'Розетки', value: '5' },
      { label: 'Кабель', value: '3 м' },
      { label: 'Защита', value: 'От перегрузок' },
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