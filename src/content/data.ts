// Единственный источник контента - DATA_SOURCE из промпта
export const metadata = {
  projectName: "BIOPRINTER — учебный биопринтер (Anet A8 Plus + шприцевый экструдер)",
  educationOnly: true,
  noLiveCells: true,
  needleRequired: "18G preferred (≈1.2 мм), совместимо 18–21G",
  languages: ["ru", "uz", "en"],
}

export const disclaimers = {
  ru: "Только для образовательных опытов. Без живых клеток и патогенов. Используются пищевые/бытовые реагенты (E401, E422, E509).",
  en: "For educational use only. No live cells. Food-grade reagents (E401, E422, E509).",
  uz: "Faqat ta'limiy maqsadlar uchun. Tirik hujayralar yo'q. Oziq-ovqat darajasidagi reagentlar (E401, E422, E509).",
}

export const home = {
  ru: {
    heroTitle: "Учебный биопринтер с шприцевым экструдером",
    heroSub: "Печать гидрогелями без живых клеток — безопасно для школы",
    ctaPrimary: "Посмотреть принтер",
    ctaSecondary: "Рецепты биогеля",
    usp: [
      "Безопасные пищевые реагенты (E401, E422, E509)",
      "Рецепты и пошаговые инструкции",
      "RU • UZ • EN"
    ]
  },
  uz: {
    heroTitle: "Shpritsli ekstruderli o'quv bioprinter",
    heroSub: "Tirik hujayralarsiz gidrojellar bilan bosib chiqarish — maktab uchun xavfsiz",
    ctaPrimary: "Printerni ko'rish",
    ctaSecondary: "Biojel retseptlari",
  },
  en: {
    heroTitle: "Educational Bioprinter with Syringe Extruder",
    heroSub: "Hydrogel printing without live cells — safe for schools",
    ctaPrimary: "View Printer",
    ctaSecondary: "Bioink Recipes",
  }
}

export const product = {
  name: "Учебный биопринтер (Anet A8 Plus, шприцевый экструдер)",
  spec: [
    { key: "Область печати", value: "≥220×220×240 мм (типично для A8 Plus)" },
    { key: "Материал печати", value: "Гидрогели на водной основе (альгинат/желатин и др.), без клеток" },
    { key: "Скорость", value: "5–30 мм/с (рекомендуемо 5–20 мм/с)" },
    { key: "Высота слоя", value: "0,6–1,2 мм (сопла 18–21G; рекомендовано 18G)" },
    { key: "Температура стола/сопла", value: "Не требуется (комнатная)" },
    { key: "Питание", value: "~220–240 В, 50 Гц; ≤150 Вт" },
  ],
  safety: [
    "Только пищевые/бытовые реагенты; живых клеток и патогенов нет.",
    "СИЗ: перчатки, очки. Растворы CaCl₂ ≥2% — избегать контакта с глазами.",
    "Утилизация: гели высушить и выбросить; CaCl₂ ≤2% — в канализацию с большим количеством воды.",
  ],
  nozzle: "Сопла 18–21G (рекомендовано 18G ≈ 1.2 мм).",
  setup: [
    "Площадка: стекло/ПЭТ, комната.",
    "Калибровка: зазор 0,2–0,4 мм.",
    "Скорость: контуры 5–20 мм/с.",
    "Ретракты: минимум/выкл.",
    "Высота слоя: 0,6–1,0 мм (под 18–21G).",
  ]
}

export const bioinks = {
  recipes: [
    {
      id: "A",
      title: "Альгинатный (универсальный)",
      composition: [
        "Альгинат натрия (E401) — 2 г",
        "Вода — 100 мл",
        "Глицерин — 2–3 мл",
        "Пищевой краситель — 1–2 капли (опц.)"
      ],
      hardener: "Раствор CaCl₂ 2% (2 г на 100 мл)"
    },
    {
      id: "B",
      title: "Желатиновый",
      composition: [
        "Желатин — 5 г",
        "Вода — 100 мл",
        "Глицерин — 3 мл",
        "Крахмал — 1 г (опц.)",
        "Краситель — по желанию"
      ],
      hardener: null
    },
    {
      id: "C",
      title: "«Мягкие ткани» (двухкомпонентный)",
      composition: [
        "Альгинат — 2%",
        "Желатин — 3%",
        "Глицерин — 2%",
        "Вода — до 100 мл"
      ],
      hardener: "Раствор CaCl₂ 1,5–2%"
    }
  ],
  howto: {
    steps: [
      "Нагреть воду до 40–50°C.",
      "Всыпать порошок (альгинат/желатин) при помешивании до растворения.",
      "Добавить глицерин и (опц.) краситель.",
      "Остудить, удалить пузыри (10–15 мин).",
      "Заправить шприц без пузырьков.",
      "Печатать на стекле/ПЭТ, комн. температура.",
      "Альгинат: погрузить в CaCl₂ 2% на 5–10 мин."
    ]
  },
  miniBatch: "50 мл воды + 1 г альгината + 1 мл глицерина.",
  printParams: [
    "Скорость: 5–20 мм/с",
    "Высота слоя: 0,6–1,0 мм (18–21G)",
    "Стол: без подогрева",
    "Ретракты: выкл./минимум"
  ],
  troubleshooting: [
    { issue: "Расплыв линии", fix: "Снизить скорость/подачу, увеличить зазор, концентрация до 2.5–3%." },
    { issue: "Обрыв нити", fix: "Чуть повысить подачу/температуру геля (30–35°C) или диаметр сопла." },
    { issue: "Пузыри", fix: "Дегазировать дольше; наполнять шприц медленно." },
    { issue: "Нитение", fix: "Уменьшить подачу, отключить ретракт, пауза на углах." },
  ],
  materials: {
    fromStores: [
      "Альгинат натрия (E401) — порошок",
      "Глицерин аптечный",
      "Хлорид кальция 10% (ампулы или флакон; CaCl₂)",
      "Вода очищенная/дистиллированная",
      "Пищевой краситель (по желанию)",
      "Желатин или крахмал (опционально) — для изменения вязкости"
    ],
    fromStoresUz: [
      "Natriy alginat (E401) — kukun",
      "Dorixona glitserini",
      "Kaltsiy xlorid 10% (ampulalar yoki flakon; CaCl₂)",
      "Tozalangan/distillangan suv",
      "Oziq-ovqat bo'yog'i (ixtiyoriy)",
      "Jelatin yoki kraxmal (ixtiyoriy) — qovushqoqlikni o'zgartirish uchun"
    ],
    fromStoresEn: [
      "Sodium alginate (E401) — powder",
      "Pharmacy glycerin",
      "Calcium chloride 10% (ampoules or vial; CaCl₂)",
      "Purified/distilled water",
      "Food coloring (optional)",
      "Gelatin or starch (optional) — to adjust viscosity"
    ],
    tools: [
      "Стакан/мензурка для смешивания",
      "Ложка/палочка для перемешивания",
      "Весы кухонные (или мерные ложки)",
      "Шприцы Luer-Lock 20 мл или 50 мл",
      "Иглы/канюли 18G–20G",
      "Перчатки и очки защитные",
      "Чистые баночки/контейнеры для хранения"
    ],
    toolsUz: [
      "Stakan/menzurka aralashma uchun",
      "Qoshiq/tayoqcha aralashma uchun",
      "Oshxona tarozisi (yoki o'lchov qoshiqlari)",
      "Luer-Lock shpritslar 20 ml yoki 50 ml",
      "Ignalar/kanyullar 18G–20G",
      "Qo'lqoplar va himoya ko'zoynagi",
      "Toza idishlar/konteynerlar saqlash uchun"
    ],
    toolsEn: [
      "Glass/graduated cylinder for mixing",
      "Spoon/stirring rod for mixing",
      "Kitchen scale (or measuring spoons)",
      "Luer-Lock syringes 20 ml or 50 ml",
      "Needles/cannulas 18G–20G",
      "Protective gloves and goggles",
      "Clean jars/containers for storage"
    ]
  },
  detailedRecipe: {
    title: "Базовый рецепт биочернил (на 100 мл)",
    description: "Учебный гель без клеток. Печатается через шприц и схватывается кальцием.",
    composition: [
      "Вода (40–50°C): 90 мл",
      "Альгинат натрия: 2,0 г (≈2%)",
      "Глицерин: 5 мл",
      "Краситель: 1–2 капли (по желанию)"
    ],
    steps: [
      "Налить тёплую воду (40–50°C) в чистую ёмкость",
      "Медленно всыпать альгинат, постоянно размешивая (без комков)",
      "Добавить глицерин и краситель (если нужно), размешать до однородности",
      "Дать постоять 30–60 минут для выхода пузырьков",
      "Заправить шприц (20 или 50 мл Luer-Lock)",
      "Если комки — оставить на 1–2 часа и перемешать снова (можно использовать мини-миксер)"
    ]
  },
  hardeningSolution: {
    title: "Раствор для схватывания после печати",
    description: "Ион кальция превращает альгинат в упругий гель",
    variants: [
      {
        name: "Вариант А (быстрый, из ампул)",
        recipe: [
          "Вода: 100 мл",
          "Раствор CaCl₂ 10%: 5–10 мл",
          "Результат: ≈0,5–1% CaCl₂ (для школы достаточно)"
        ]
      },
      {
        name: "Вариант Б (жёстче)",
        recipe: [
          "Вода: 100 мл",
          "Раствор CaCl₂ 10%: 10–20 мл",
          "Результат: 1–2% итоговая концентрация"
        ]
      }
    ],
    usage: "Налить раствор в лоток/тарелку — можно печатать сразу в него, чтобы нить схватывалась при выходе из иглы"
  },
  printingGuide: [
    "Поставить шприц в насос, накрутить иглу 18G (толще) или 20G",
    "Скорость подачи: начинать медленно и увеличивать, пока нить ложится ровно (без обрывов и хвостов)",
    "Печатать прямо в ванночку с CaCl₂ или печатать на подложку и сбрызгивать CaCl₂ из второго шприца/пульверизатора",
    "Через 10–30 секунд деталь схватится",
    "Промыть водой для удаления лишнего кальция"
  ],
  viscosityTuning: [
    { issue: "Слишком жидко, расползается", fix: "Увеличить альгинат до 2,5–3% или добавить крахмал 0,5–1%" },
    { issue: "Слишком густо, тяжело выдавливать", fix: "Уменьшить альгинат до 1,5% или добавить немного воды" },
    { issue: "Хрупко после схватывания", fix: "Уменьшить концентрацию CaCl₂ (разбавить ванну водой)" },
    { issue: "Для иглы 18G", fix: "Обычно комфортно 2–2,5% альгината" },
    { issue: "Для иглы 20G", fix: "Обычно комфортно 1,5–2% альгината" }
  ],
  reinforcedVersion: {
    title: "Альгинат + желатин (мягче и плотнее)",
    composition: [
      "Вода 50°C: 88 мл",
      "Альгинат: 2,0 г",
      "Желатин: 1,0 г (растворить полностью)",
      "Глицерин: 5 мл"
    ],
    note: "Дальше всё как в базовом рецепте. Схватывание — тем же CaCl₂"
  },
  safetyReminder: [
    "Перчатки и очки обязательны",
    "Не пить и не пробовать на вкус",
    "Иглы хранить с колпачками",
    "После работы промыть шприцы тёплой водой",
    "Все ингредиенты нетоксичны при правильном применении",
    "Это учебный материал, не пищевой продукт"
  ],
  checklist: [
    "Альгинат, глицерин, вода приготовлены",
    "Ванна CaCl₂ 0,5–1% готова",
    "Шприц Luer-Lock 20/50 мл + игла 18–20G",
    "Гель отстоялся 30–60 мин (меньше пузырей)",
    "Начать печать медленно, подобрать скорость"
  ]
}

export const education = {
  teacherGuide: {
    goals: [
      "Показать принципы экструзионного 3D‑биопринтинга на безопасных гидрогелях.",
      "Подбор вязкости/скорости, контроль формы.",
      "Понять: гидрогель, CaCl₂‑сшивание, слой, траектория."
    ],
    plan: [
      "Вводная презентация 10–15 мин",
      "Приготовление геля 15–20 мин",
      "Настройка принтера 10 мин",
      "Печать и закрепление 20–30 мин",
      "Разбор ошибок 10 мин"
    ],
    safety: [
      "Пищевые реагенты: E401, желатин, глицерин, краситель, CaCl₂.",
      "СИЗ: перчатки/очки; CaCl₂ ≥2% — осторожно с глазами.",
      "Утилизация: гели высушить; CaCl₂ ≤2% — в канализацию.",
      "Электробезопасность: не касаться подвижных частей, питание off при замене."
    ],
    materials: [
      "Альгинат 20–30 г, CaCl₂ 20–30 г, глицерин 30–50 мл, желатин 50 г (опц.), вода 2–3 л, красители.",
      "Шприцы 10–20 мл, сопла 18–21G, мензурки, перчатки."
    ],
    rubric: "10 баллов: подготовка (2), калибровка (3), качество образца (3), ТБ/командная (2)."
  },
  uz_short: "O'qituvchi uchun qisqa qo'llanma: xavfsiz biojel (E401/E422/E509), 5–20 mm/s, qatlam 0.6–1.0 mm, bosmagandan so'ng CaCl₂ 2% 5–10 daq. Qo'lqop/ko'zoynak.",
  passport: {
    title: "Паспорт учебного биопринтера",
    kit: [
      "Anet A8 Plus (мод, шприцевый экструдер)",
      "Держатель шприцов 10–20 мл, сопла 18–21G",
      "Площадка: стекло/ПЭТ",
      "Веб‑камера (опц.)",
      "Кабели, ЗИП"
    ],
    acceptance: [
      "Решётка 30×30 мм, шаг 5 мм — непрерывная линия",
      "Отверждение в CaCl₂ 2% ≤ 10 мин"
    ]
  },
  labs: {
    course: "4 занятия × 45–60 мин",
    sessions: [
      { name: "Введение в биопринтинг", result: "понимание этапов" },
      { name: "Реология и параметры", result: "таблица наблюдений" },
      { name: "Отверждение и каркасы", result: "устойчивая форма" },
      { name: "Мини‑проект", result: "каркас, защита" }
    ],
    gcodeDemo: `; Минимальный пример (движение, подача — внешним приводом)
G21
G90
G92 E0
G1 X10 Y10 F600
G1 X60 Y10 F300
G1 X60 Y60 F300
G1 X10 Y60 F300
G1 X10 Y10 F300`
  }
}

export const aiModule = {
  idea: [
    "Камера → ноутбук/RPi",
    "OpenCV + TFLite: анализ слоя",
    "Сравнение с эталоном (SVG/маска)",
    "При отклонении — сигнал оператору/принтеру"
  ],
  notes: [
    "Экспериментальный модуль, не медизделие."
  ]
}

export const shopUz = {
  note: "Локальные ссылки и категории с доставкой по Узбекистану.",
  bundle: "Набор под ключ: альгинат 100 г + CaCl₂ 500 г + глицерин 250 мл + желатин 100 г + крахмал 500 г + красители (набор) + шприцы 50 мл Luer-Lock (2 шт) + канюли 18G (5 шт) + ПЭТ‑плёнка (5 листов) + мензурка 500 мл + контейнеры (3 шт) + перчатки (50 пар) + очки защитные.",
  links: {
    alginate: [
      "https://uz.ozon.com/product/alginat-natriya-pishchevoy-100-g-dyadya-kolya-natrievaya-sol-alginovoy-kisloty-v-poroshke-1547038903/",
      "https://uz.ozon.com/product/zagustitel-alginat-natriya-pishchevoy-konditerskiy-pishchevaya-dobavka-e401-poroshok-paket-130g-1679621525/",
      "https://uz.ozon.com/category/alginat-natriya-pishchevoy/"
    ],
    cacl2: [
      "https://uz.ozon.com/product/hloristyy-kaltsiy-dlya-syra-500-g-zakvaska-dlya-syra-i-tvoroga-hlorid-katsiya-sychuzhnyy-163084963/",
      "https://uz.ozon.com/category/hlorid-kaltsiya/",
      "https://www.prom.uz/ads/kaltsiy-khloristyy-bezvodnyy-pishchevoy-e509-/"
    ],
    glycerin: [
      "https://uz.ozon.com/category/glitserin-pischevoy/"
    ],
    syringes: [
      "https://apteka.uz/good/spric-odnokratnogo-primeneniya-kd-ject-iii-bez-igly-50-ml-luer-lock",
      "https://apteka.uz/good/spric-odnokratnogo-primeneniya-kd-ject-50-ml",
      "https://apteka.uz/price/50-ml-shprits-kd-ject-iii"
    ],
    needles: [
      "https://apteka.uz/good/kanyulya-s-portom-dlya-vnutrivennyx-inekcii-i-krylyami-polyflon-fep-18g",
      "https://apteka.uz/good/kanyulya-s-zashhelkivayushhimsya-kolpackom-i-ssivaemymi-krylyami-dlya-vnutrivennyx-inekcii-polyflex-pur-18g",
      "https://apteka.uz/good/kanyulya-vnutrivennaya-16-26g"
    ],
    gelatin: [
      "https://uz.ozon.com/product/zhelatin-pishchevoy-250-grammov-v-granulakh-dlya-marmela-deserta-kholodtsa-zalivnogo-790218899/",
      "https://uz.ozon.com/product/zhelatin-pishchevoy-gost-11293-2017-170-blum-dlya-tvoroga-smetany-zhele-zalivnogo-holodca-759976506/",
      "https://uz.ozon.com/category/zhelatin/"
    ],
    starch: [
      "https://uz.ozon.com/product/krahmal-kartofelnyy-premium-1-kg-belyy-1336506062/",
      "https://uz.ozon.com/product/krahmal-kukuruznyy-1-kg-bez-glyutena-1349990933/",
      "https://uz.ozon.com/category/krahmal-pishchevoy/"
    ],
    colorants: [
      "https://uz.ozon.com/product/krasiteli-pishchevye-gelevy-nabor-7-tsvetov-po-25-gr-dlya-krema-biskvita-mastiki-karamelimirani-1397746059/",
      "https://uz.ozon.com/product/pishchevye-krasiteli-nabor-gel-10-tsvetov-naturalnyy-krasitel-dlya-konditerskih-izdeliy-1656829050/",
      "https://uz.ozon.com/category/pishchevye-krasiteli/"
    ],
    petFilm: [
      "https://uz.ozon.com/product/plenka-polyarizatsionnaya-98h68-mm-zhk-ekrana-noutbuka-0-98h68-1473968848/",
      "https://uz.ozon.com/product/prozrachnaya-plenka-pet-220x300-mm-0-5mm-tolshchiny-list-plastikovoy-prozrachnoy-plenki-dlya-1547777732/",
      "https://uz.ozon.com/category/plenka-pet/"
    ],
    containers: [
      "https://uz.ozon.com/product/nabor-banochek-steklyannyh-s-vintovoy-kryshkoy-6-sht-po-200-ml-dlya-domashnih-zagotovok-1426801855/",
      "https://uz.ozon.com/product/nabor-emkostey-dlya-hraneniya-produktov-plastikovyh-s-kryshkami-5-sht-0-2-0-4-0-65-1-1-5-l-1454322968/",
      "https://uz.ozon.com/category/konteyner-dlya-hraneniya/"
    ],
    beakers: [
      "https://uz.ozon.com/product/mernaya-kruzhka-stakan-prozrachnyy-plastik-1000-ml-1-litr-1582859454/",
      "https://uz.ozon.com/product/mernaya-emkost-stakan-3-v-1-iz-stekla-250-500-1000-ml-pishchevoy-kolba-1494488808/",
      "https://uz.ozon.com/category/mernaya-posuda/"
    ],
    gloves: [
      "https://uz.ozon.com/product/perchatki-nitrilovye-nesterilnye-neopronovye-100-sht-razmer-l-1442367839/",
      "https://uz.ozon.com/product/perchatki-meditsinskie-nitrilovye-100-sht-v-upakovke-razmer-m-siniy-1520607715/",
      "https://uz.ozon.com/category/meditsinskie-perchatki/"
    ],
    goggles: [
      "https://uz.ozon.com/product/zashchitnye-ochki-dlya-rabot-s-prozrachnym-steklom-1437854905/",
      "https://uz.ozon.com/product/ochki-zashchitnye-prozrachnye-dlya-rabot-s-instrumentami-universalnye-1559082376/",
      "https://uz.ozon.com/category/ochki-zashchitnye/"
    ]
  },
  tips: [
    "Проверяйте: Luer‑Lock, 18G, длина ~40 мм.",
    "Если шприц Luer‑Slip — используйте переходник на Luer‑Lock.",
    "В Apteka.uz регулярно в наличии 50 мл Luer-Lock; 20 мл появляются реже.",
    "Если нужен конкретный город — проверьте ближайшие аптеки через раздел «Цены»."
  ],
  budget: [
    "Альгинат 100–130 г: 45–120 тыс сум",
    "CaCl₂ 200–500 г: 20–80 тыс сум",
    "Глицерин 150–500 мл: 20–70 тыс сум",
    "Желатин 100–250 г: 20–50 тыс сум",
    "Крахмал 500 г–1 кг: 10–30 тыс сум",
    "Красители (набор): 30–80 тыс сум",
    "Шприцы/иглы: 50–200 тыс сум",
    "Мензурки/контейнеры: 20–50 тыс сум",
    "Перчатки/очки: 20–50 тыс сум",
    "ПЭТ-плёнка (листы): 10–30 тыс сум",
    "Итого полный набор: ~250–750 тыс сум"
  ]
}

export const faq = [
  {
    q: "Можно ли использовать живые клетки?",
    a: "Нет. Учебная версия предназначена только для пищевых/бытовых гидрогелей без клеток."
  },
  {
    q: "Нет альгината — что делать?",
    a: "Используйте ссылки uz.ozon.com/Prom.uz; как альтернатива — магазины молекулярной кухни."
  },
  {
    q: "Линия рвётся или расплывается?",
    a: "Корректируйте скорость/зазор; подбирайте сопло 18G; дегазируйте гель."
  },
  {
    q: "Где взять 18G?",
    a: "Смотрите раздел «Shop UZ», фильтр 18G и Luer‑Lock."
  }
]

export const contacts = {
  website: {
    domain: "edubioprinter.uz",
    name: "EDU BIOPRINTER"
  },
  team: [
    {
      name: "Юрий Владимирович",
      nameUz: "Yuriy Vladimirovich",
      nameEn: "Yuriy Vladimirovich",
      role: "Тимлид",
      roleUz: "Team lead",
      roleEn: "Team Lead",
      telegram: "@yurustamov",
      phone: "+998 91 254 10 50",
      phoneDisplay: "+998 91 254-10-50"
    },
    {
      name: "Мухаммадали Иззатулаев",
      nameUz: "Muhammadali Izzatulayev",
      nameEn: "Muhammadali Izzatulayev",
      role: "Разработчик",
      roleUz: "Dasturchi / Ishlab chiquvchi",
      roleEn: "Developer",
      telegram: "@zimdevuz",
      phone: "+998 93 755 50 43",
      phoneDisplay: "+998 93 075-50-43"
    },
    {
      name: "Одилбек Норпулатов",
      nameUz: "Odilbek Norpulatov",
      nameEn: "Odilbek Norpulatov",
      role: "Биолог / Научный консультант",
      roleUz: "Biolog / Ilmiy maslahatchi",
      roleEn: "Biologist / Scientific Advisor",
      phone: "+998 88 269 10 07",
      phoneDisplay: "+998 88 269-10-07"
    },
    {
      name: "Шермуродова Асал",
      nameUz: "Shermurodova Asal",
      nameEn: "Shermurodova Asal",
      role: "Член команды",
      roleUz: "Jamoa a'zosi",
      roleEn: "Team Member",
      phone: "+998 88 053 87 37",
      phoneDisplay: "+998 88 053-87-37"
    }
  ],
  email: "info@edubioprinter.uz",
  support: "support@edubioprinter.uz",
  address: {
    ru: "Узбекистан, Навои",
    uz: "O'zbekiston, Navoiy",
    en: "Uzbekistan, Navoi"
  }
}

