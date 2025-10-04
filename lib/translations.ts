export type Language = "ru" | "kk"

export const translations = {
  ru: {
    // Header
    logo: "ArzanCRM",

    // Hero
    heroTitle: "ArzanCRM, которая понимает ваш бизнес",
    heroSubtitle: "Умная автоматизация с AI для каждой сферы бизнеса. От 3000₸ в месяц.",
    selectBusinessType: "Какой у вас бизнес?",

    // Business Types
    crmClassic: "ArzanCRM Классик",
    crmClassicSubtitle: "Для бизнеса с продажами",
    crmClassicDesc: "Полноценная система для управления продажами и клиентами",
    crmClassicFeatures: [
      "Воронки продаж",
      "Сделки и клиенты",
      "Календарь встреч",
      "Команда менеджеров",
      "AI-ассистент",
      "WhatsApp/Telegram чаты",
    ],
    crmClassicFor: "Подходит для: оптовики, B2B, агентства, услуги, производство",

    crmServices: "ArzanCRM для услуг",
    crmServicesSubtitle: "Для салонов и мастеров",
    crmServicesDesc: "Упор на запись клиентов и управление расписанием",
    crmServicesFeatures: [
      "Онлайн-запись клиентов",
      "Календарь мастеров",
      "Автонапоминания о записи",
      "База клиентов",
      "WhatsApp уведомления",
      "AI записывает клиентов",
    ],
    crmServicesFor: "Подходит для: салоны красоты, барбершопы, СПА, массаж, косметология, фитнес",

    crmKaspi: "ArzanCRM для Kaspi магазина",
    crmKaspiSubtitle: "Для продавцов на Kaspi",
    crmKaspiDesc: "Автоматизация работы с заказами из Kaspi Shop",
    crmKaspiFeatures: [
      "Интеграция с Kaspi API",
      "Автоответы в WhatsApp",
      "Чаты с клиентами",
      "AI обрабатывает вопросы",
      "Отслеживание заказов",
      "Статистика продаж",
    ],
    crmKaspiFor: "Подходит для: продавцы на Kaspi Shop",

    tryFree: "Попробовать бесплатно",

    // Benefits
    benefitsTitle: "Почему выбирают нас",
    benefit1Title: "Умный AI за дешево",
    benefit1Desc: "Два уровня AI: дешевый для простых задач, умный для сложных. Экономия до 90%.",
    benefit2Title: "Видит, слышит, читает",
    benefit2Desc: "Анализирует фото чеков, PDF, аудио, голосовые сообщения автоматически.",
    benefit3Title: "Настроили и забыли",
    benefit3Desc: "Автоуведомления работают сами: клиенты получают напоминания вовремя.",
    benefit4Title: "Доступная цена",
    benefit4Desc: "От 3000₸/месяц. Окупается за первый месяц.",
    benefit5Title: "Для Казахстана",
    benefit5Desc: "Kaspi интеграция, WhatsApp, поддержка 24/7.",
    benefit6Title: "Быстрый старт",
    benefit6Desc: "Готовая CRM под ваш бизнес за 5 минут.",

    // Testimonials
    testimonialsTitle: "Что говорят наши клиенты",
    testimonial1: "Неявки снизились с 30% до 5%!",
    testimonial1Text: "Раньше клиенты постоянно забывали о записи. Теперь автонапоминания в WhatsApp работают сами.",
    testimonial1Author: 'Айгуль, салон красоты "Гламур"',
    testimonial2: "AI отвечает быстрее, чем я!",
    testimonial2Text:
      "80% вопросов о заказах AI закрывает сам. Я только сложные случаи разбираю. Экономлю 3 часа в день!",
    testimonial2Author: "Ержан, магазин на Kaspi",
    testimonial3: "Продажи выросли на 25%",
    testimonial3Text: "Менеджеры видят все сделки в воронке, ничего не теряется. Конверсия выросла.",
    testimonial3Author: "Марат, оптовая компания",

    // CTA
    ctaTitle: "Готовы попробовать?",
    ctaSubtitle: "Выберите свой тип ArzanCRM и начните бесплатно. Без карты, без обязательств.",
    ctaContact: "Или напишите нам:",

    // Footer
    allRightsReserved: "Все права защищены",

    // Classic CRM Page
    classicHeroTitle: "ArzanCRM Классик — контролируйте продажи от А до Я",
    classicHeroSubtitle:
      "Управляйте сделками, клиентами и командой в одном месте. AI-ассистент закрывает 70% рутинных вопросов автоматически.",
    startFreeTrial: "Начать бесплатно — 14 дней",
    watchDemo: "Посмотреть демо",

    // Features
    featuresTitle: "Возможности",
    feature1: "Воронки продаж",
    feature1Desc: "Визуальные этапы сделок, контроль конверсии",
    feature2: "Клиенты",
    feature2Desc: "База контактов с историей сделок и чатов",
    feature3: "Чаты (WhatsApp/Telegram)",
    feature3Desc: "Вся переписка в одном окне",
    feature4: "AI-ассистент",
    feature4Desc: "Отвечает клиентам, создает сделки, записывает встречи",
    feature5: "Календарь",
    feature5Desc: "Встречи, задачи, напоминания для всей команды",
    feature6: "Менеджеры",
    feature6Desc: "Роли, права доступа, отчеты по каждому",
    feature7: "Аналитика",
    feature7Desc: "Отчеты по продажам, конверсии, доходу",
    feature8: "Автоуведомления",
    feature8Desc: "Напоминания клиентам и команде",

    // How it works
    howItWorksTitle: "Как это работает",
    step1Title: "Клиент пишет в WhatsApp",
    step1Desc: "AI распознает вопрос и отвечает мгновенно",
    step2Title: "Сделка создается автоматически",
    step2Desc: "Со всеми данными: сумма, этап, дедлайн",
    step3Title: "Менеджер контролирует",
    step3Desc: "Видит все сделки, чаты, задачи в одном месте",

    // Pricing
    pricingTitle: "Тарифы",
    freeTrialBadge: "Бесплатно 14 дней — без карты",
    thenChoosePlan: "Потом выбираете тариф:",
    basicPlan: "Базовый",
    basicPrice: "3000₸/мес",
    basicFeature1: "Воронки + Сделки + Клиенты",
    basicFeature2: "1 пользователь",
    basicFeature3: "Без AI и каналов",
    standardPlan: "Стандарт",
    standardPrice: "8000₸/мес",
    standardFeature1: "Всё из Базового",
    standardFeature2: "+ 1 канал (WhatsApp/Telegram)",
    standardFeature3: "+ Базовый AI-бот",
    standardFeature4: "До 3 пользователей",
    businessPlan: "Бизнес",
    businessPrice: "15000₸/мес",
    businessFeature1: "Всё из Стандарт",
    businessFeature2: "+ Полноценный AI-ассистент",
    businessFeature3: "+ 3 канала",
    businessFeature4: "+ Анализ фото/PDF/аудио",
    businessFeature5: "До 10 пользователей",
    addonsNote: "Каналы и AI докупаются отдельно:",
    addon1: "Канал (WhatsApp/Telegram): +2500₸/мес",
    addon2: "Полноценный AI: +5000₸/мес",

    // Target audience
    targetAudienceTitle: "Для кого это",
    classicTarget:
      "Оптовые компании • B2B продажи • Агентства • Производство • Консалтинг • Любой бизнес с воронкой продаж",

    // Registration form
    registrationTitle: "Попробуйте бесплатно 14 дней",
    nameField: "Имя",
    emailField: "Email",
    phoneField: "Телефон",
    companyField: "Название компании",
    submitButton: "Начать бесплатно",
    noCardRequired: "Без карты. Отмена в любой момент.",
    registrationFormTitle: "Начните бесплатный пробный период",
    registrationFormDescription: "Заполните форму и получите доступ ко всем функциям на 14 дней",
    fullNameLabel: "Полное имя",
    planLabel: "Выберите тариф",
    starterPlan: "Базовый — 3000₸/мес",
    professionalPlan: "Стандарт — 8000₸/мес",
    enterprisePlan: "Бизнес — 15000₸/мес",
    submittingButton: "Отправка...",
    successMessage: "Спасибо! Мы свяжемся с вами в ближайшее время.",
    errorMessage: "Произошла ошибка. Попробуйте еще раз.",

    // Services CRM Page
    servicesHeroTitle: "ArzanCRM для услуг — записывайте клиентов автоматически",
    servicesHeroSubtitle:
      "Онлайн-запись, календарь мастеров, автонапоминания. AI записывает клиентов в WhatsApp без вашего участия.",

    servicesFeature1: "Календарь мастеров",
    servicesFeature1Desc: "Расписание, свободные окна, автоматическая запись",
    servicesFeature2: "Онлайн-запись",
    servicesFeature2Desc: "Клиенты записываются сами через WhatsApp/сайт",
    servicesFeature3: "Автонапоминания",
    servicesFeature3Desc: "За 3 дня, 1 день, 3 часа — неявки снижаются до 5%",
    servicesFeature4: "База клиентов",
    servicesFeature4Desc: "История посещений, предпочтения, заметки",
    servicesFeature5: "AI записывает автоматически",
    servicesFeature5Desc: '"Хочу к Айгуль на маникюр в пятницу" → AI всё сделает',
    servicesFeature6: "Чаты WhatsApp/Telegram",
    servicesFeature6Desc: "Вся переписка с клиентами в одном месте",
    servicesFeature7: "Сделки",
    servicesFeature7Desc: "Отслеживание выручки, средний чек, повторные визиты",
    servicesFeature8: "Отчеты",
    servicesFeature8Desc: "По мастерам, услугам, загрузке, доходу",

    servicesStep1Title: 'Клиент: "Хочу записаться на маникюр"',
    servicesStep1Desc: "AI: проверяет календарь, предлагает время",
    servicesStep2Title: "AI записывает автоматически",
    servicesStep2Desc: "Создает событие в календаре мастера",
    servicesStep3Title: "Клиент получает напоминания",
    servicesStep3Desc: "За 3 дня, за 1 день, за 3 часа до визита",
    servicesStep4Title: "После визита — запрос отзыва",
    servicesStep4Desc: "Автоматически через 1 день",

    servicesBasicFeature1: "Календарь + Записи + Клиенты",
    servicesBasicFeature2: "До 2 мастеров",
    servicesBasicFeature3: "Без AI и WhatsApp",
    servicesStandardFeature2: "+ WhatsApp уведомления",
    servicesStandardFeature4: "До 5 мастеров",
    servicesBusinessFeature2: "+ AI записывает автоматически",
    servicesBusinessFeature3: "+ Анализ фото/аудио",
    servicesBusinessFeature4: "Безлимит мастеров",

    servicesTarget:
      "Салоны красоты • Барбершопы • СПА-салондар • Массажные кабинеты • Косметология • Стоматология • Фитнес-студии • Любые услуги по записи",

    servicesSpecialNote: "Фокус на календаре и записях",
    servicesSpecialDesc:
      "В отличие от классической системы, здесь упор на работу с расписанием мастеров и записями клиентов. Воронки продаж упрощены — главное запись и визит.",

    // Kaspi CRM Page
    kaspiHeroTitle: "ArzanCRM для Kaspi магазина — автоматизируйте работу с заказами",
    kaspiHeroSubtitle:
      "Интеграция с Kaspi Shop + автоответы клиентам в WhatsApp. AI обрабатывает 90% вопросов о заказах автоматически.",
    connectStore: "Подключить магазин бесплатно",

    kaspiFeature1: "Интеграция Kaspi Shop",
    kaspiFeature1Desc: "Все заказы автоматически попадают в CRM",
    kaspiFeature2: "Автоуведомления в WhatsApp",
    kaspiFeature2Desc: "Заказ принят → В обработке → Доставляется → Доставлен",
    kaspiFeature3: "AI отвечает на вопросы",
    kaspiFeature3Desc: '"Где мой заказ?" → AI проверяет статус и отвечает',
    kaspiFeature4: "Чаты с клиентами",
    kaspiFeature4Desc: "WhatsApp/Telegram — вся переписка в одном окне",
    kaspiFeature5: "AI проверяет чеки",
    kaspiFeature5Desc: "Клиент прислал фото чека → AI сверяет сумму автоматически",
    kaspiFeature6: "Сделки по заказам",
    kaspiFeature6Desc: "Каждый заказ = сделка с этапами и суммой",
    kaspiFeature7: "Аналитика продаж",
    kaspiFeature7Desc: "Отчеты по товарам, выручке, возвратам",
    kaspiFeature8: "База клиентов",
    kaspiFeature8Desc: "История заказов, предпочтения, сегментация",

    kaspiStep1Title: "Новый заказ на Kaspi",
    kaspiStep1Desc: "→ Автоматически попадает в CRM → Создается сделка",
    kaspiStep2Title: "Клиент получает WhatsApp",
    kaspiStep2Desc: '"Спасибо за заказ #12345! Собираем ваши товары 📦"',
    kaspiStep3Title: 'Клиент спрашивает: "Где заказ?"',
    kaspiStep3Desc: "→ AI проверяет статус в Kaspi → Отвечает с трек-номером",
    kaspiStep4Title: "Заказ доставлен",
    kaspiStep4Desc: "→ Автоуведомление + запрос отзыва",

    kaspiBasicFeature1: "Kaspi интеграция",
    kaspiBasicFeature2: "Сделки + Клиенты",
    kaspiBasicFeature3: "Без AI и WhatsApp",
    kaspiStandardPrice: "10000₸/мес",
    kaspiStandardBadge: "Для Kaspi",
    kaspiStandardFeature2: "+ WhatsApp автоуведомления",
    kaspiStandardFeature4: "До 500 заказов/мес",
    kaspiBusinessPrice: "20000₸/мес",
    kaspiBusinessFeature2: "+ Полноценный AI (отвечает на всё)",
    kaspiBusinessFeature3: "+ Проверка чеков фото",
    kaspiBusinessFeature4: "Безлимит заказов",

    kaspiTarget: "Продавцы на Kaspi Shop с любым объемом продаж. Особенно эффективно при 100+ заказов в месяц",

    kaspiSpecialNote: "Нет календаря и встреч",
    kaspiSpecialDesc:
      "Эта версия заточена под e-commerce: чаты, заказы, автоматизация уведомлений. Календарь не нужен — все действия онлайн.",

    // FAQ
    faqTitle: "Часто задаваемые вопросы",
    faq1Q: "Сколько стоит?",
    faq1A: "От 3000₸/месяц за базовую версию. Первые 14 дней бесплатно без карты.",
    faq2Q: "Что входит в бесплатный период?",
    faq2A: "Полный доступ ко всем функциям выбранного типа ArzanCRM. Без ограничений. Карта не требуется.",
    faq3Q: "Можно сменить тип CRM после регистрации?",
    faq3A: "Да, в любой момент можно переключиться между Классик / Услуги / Kaspi.",
    faq4Q: "Как подключить WhatsApp?",
    faq4A: 'Вы покупаете модуль "Канал" (2500₸/мес), мы помогаем с подключением. Занимает 1 день.',
    faq5Q: "AI платный дополнительно?",
    faq5A:
      "Базовый AI-бот (интенты + шаблоны) входит в тариф Стандарт. Полноценный AI докупается отдельно — 5000₸/мес или свой токен OpenAI.",
    faq6Q: "Kaspi интеграция сложная?",
    faq6A: "Нет, вы даете API ключ из личного кабинета Kaspi, мы подключаем за 10 минут.",
    faq7Q: "Сколько пользователей можно добавить?",
    faq7A: "Зависит от тарифа: 1-3-10 или безлимит. Дополнительные: 1500₸/мес за пользователя.",
    faq8Q: "Есть мобильное приложение?",
    faq8A: "Пока нет, но адаптивная веб-версия отлично работает на телефоне.",
    faq9Q: "Данные в безопасности?",
    faq9A: "Да, серверы в Казахстане, шифрование, резервные копии каждый день.",

    // Dashboard
    dashboard: "Дашборд",
    clients: "Клиенты",
    funnels: "Воронки",
    calendar: "Календарь",
    messages: "Сообщения",
    channels: "Каналы",
    automation: "Автоматизация",
    analytics: "Аналитика",
    settings: "Настройки",
    crmSystem: "ArzanCRM",
    profile: "Профиль",
    logout: "Выйти",
    plan: "План",
    status: "Статус",
    trialStatus: "Пробный период",
    activeStatus: "Активен",
  },
  kk: {
    // Header
    logo: "ArzanCRM",

    // Hero
    heroTitle: "Сіздің бизнесіңізді түсінетін ArzanCRM",
    heroSubtitle: "Әр бизнес саласы үшін AI арқылы ақылды автоматтандыру. Айына 3000₸-ден бастап.",
    selectBusinessType: "Сіздің бизнесіңіз қандай?",

    // Business Types
    crmClassic: "ArzanCRM Классик",
    crmClassicSubtitle: "Сатылымы бар бизнес үшін",
    crmClassicDesc: "Сатылым мен клиенттерді басқаруға арналған толық жүйе",
    crmClassicFeatures: [
      "Сатылым воронкалары",
      "Мәмілелер мен клиенттер",
      "Кездесулер күнтізбесі",
      "Менеджерлер тобы",
      "AI-ассистент",
      "WhatsApp/Telegram чаттары",
    ],
    crmClassicFor: "Қолайлы: көтерме сауда, B2B, агенттіктер, қызметтер, өндіріс",

    crmServices: "ArzanCRM қызметтерге",
    crmServicesSubtitle: "Салондар мен шеберлерге",
    crmServicesDesc: "Клиенттерді жазу және кестені басқаруға баса назар",
    crmServicesFeatures: [
      "Клиенттерді онлайн жазу",
      "Шеберлер күнтізбесі",
      "Жазу туралы автоеске салу",
      "Клиенттер базасы",
      "WhatsApp хабарламалары",
      "AI клиенттерді жазады",
    ],
    crmServicesFor: "Қолайлы: сұлулық салондары, шаштараздар, СПА, массаж, косметология, фитнес",

    crmKaspi: "ArzanCRM Kaspi дүкеніне",
    crmKaspiSubtitle: "Kaspi сатушыларына",
    crmKaspiDesc: "Kaspi Shop тапсырыстарымен жұмысты автоматтандыру",
    crmKaspiFeatures: [
      "Kaspi API интеграциясы",
      "WhatsApp автожауаптары",
      "Клиенттермен чаттар",
      "AI сұрақтарды өңдейді",
      "Тапсырыстарды қадағалау",
      "Сатылым статистикасы",
    ],
    crmKaspiFor: "Қолайлы: Kaspi Shop сатушылары",

    tryFree: "Тегін сынап көру",

    // Benefits
    benefitsTitle: "Бізді неге таңдайды",
    benefit1Title: "Арзан ақылды AI",
    benefit1Desc: "Екі деңгейлі AI: қарапайым тапсырмаларға арзан, күрделілерге ақылды. 90%-ға дейін үнемдеу.",
    benefit2Title: "Көреді, естеді, оқиды",
    benefit2Desc: "Чек фотоларын, PDF, аудио, дауыстық хабарламаларды автоматты талдайды.",
    benefit3Title: "Баптап, ұмытыңыз",
    benefit3Desc: "Автохабарламалар өздері жұмыс істейді: клиенттер уақытында еске салу алады.",
    benefit4Title: "Қолжетімді баға",
    benefit4Desc: "Айына 3000₸-ден. Бірінші айда өтеледі.",
    benefit5Title: "Қазақстан үшін",
    benefit5Desc: "Kaspi интеграциясы, WhatsApp, 24/7 қолдау.",
    benefit6Title: "Жылдам бастау",
    benefit6Desc: "Сіздің бизнесіңізге дайын CRM 5 минутта.",

    // Testimonials
    testimonialsTitle: "Клиенттеріміз не дейді",
    testimonial1: "Келмеушілік 30%-дан 5%-ға дейін төмендеді!",
    testimonial1Text:
      "Бұрын клиенттер жазу туралы үнемі ұмытып қалатын. Енді WhatsApp автоеске салулары өздері жұмыс істейді.",
    testimonial1Author: 'Айгүл, "Гламур" сұлулық салоны',
    testimonial2: "AI меннен тезірек жауап береді!",
    testimonial2Text:
      "Тапсырыстар туралы сұрақтардың 80%-ын AI өзі жабады. Мен тек күрделі жағдайларды қарастырамын. Күніне 3 сағат үнемдеймін!",
    testimonial2Author: "Ержан, Kaspi дүкені",
    testimonial3: "Сатылым 25%-ға өсті",
    testimonial3Text: "Менеджерлер барлық мәмілелерді воронкада көреді, ештеңе жоғалмайды. Конверсия өсті.",
    testimonial3Author: "Марат, көтерме сауда компаниясы",

    // CTA
    ctaTitle: "Сынап көруге дайынсыз ба?",
    ctaSubtitle: "ArzanCRM түріңізді таңдап, тегін бастаңыз. Картасыз, міндеттемесіз.",
    ctaContact: "Немесе бізге жазыңыз:",

    // Footer
    allRightsReserved: "Барлық құқықтар қорғалған",

    // Classic CRM Page
    classicHeroTitle: "ArzanCRM Классик — сатылымды А-дан Я-ға дейін бақылаңыз",
    classicHeroSubtitle:
      "Мәмілелерді, клиенттерді және тобыңызды бір жерде басқарыңыз. AI-ассистент рутиналық сұрақтардың 70%-ын автоматты түрде жабады.",
    startFreeTrial: "Тегін бастау — 14 күн",
    watchDemo: "Демоны көру",

    // Features
    featuresTitle: "Мүмкіндіктер",
    feature1: "Сатылым воронкалары",
    feature1Desc: "Мәмілелердің визуалды кезеңдері, конверсияны бақылау",
    feature2: "Клиенттер",
    feature2Desc: "Мәмілелер мен чаттар тарихы бар контактілер базасы",
    feature3: "Чаттар (WhatsApp/Telegram)",
    feature3Desc: "Барлық хат алмасу бір терезеде",
    feature4: "AI-ассистент",
    feature4Desc: "Клиенттерге жауап береді, мәмілелер жасайды, кездесулерді жазады",
    feature5: "Күнтізбе",
    feature5Desc: "Кездесулер, тапсырмалар, бүкіл топқа еске салулар",
    feature6: "Менеджерлер",
    feature6Desc: "Рөлдер, қол жеткізу құқықтары, әрқайсысы бойынша есептер",
    feature7: "Аналитика",
    feature7Desc: "Сатылым, конверсия, табыс бойынша есептер",
    feature8: "Автохабарламалар",
    feature8Desc: "Клиенттер мен топқа еске салулар",

    // How it works
    howItWorksTitle: "Бұл қалай жұмыс істейді",
    step1Title: "Клиент WhatsApp-қа жазады",
    step1Desc: "AI сұрақты танып, лезде жауап береді",
    step2Title: "Мәміле автоматты түрде жасалады",
    step2Desc: "Барлық деректермен: сома, кезең, мерзім",
    step3Title: "Менеджер бақылайды",
    step3Desc: "Барлық мәмілелерді, чаттарды, тапсырмаларды бір жерде көреді",

    // Pricing
    pricingTitle: "Тарифтер",
    freeTrialBadge: "Тегін 14 күн — картасыз",
    thenChoosePlan: "Содан кейін тарифті таңдайсыз:",
    basicPlan: "Базалық",
    basicPrice: "3000₸/ай",
    basicFeature1: "Воронкалар + Мәмілелер + Клиенттер",
    basicFeature2: "1 пайдаланушы",
    basicFeature3: "AI және арналарсыз",
    standardPlan: "Стандарт",
    standardPrice: "8000₸/ай",
    standardFeature1: "Базалықтың бәрі",
    standardFeature2: "+ 1 арна (WhatsApp/Telegram)",
    standardFeature3: "+ Базалық AI-бот",
    standardFeature4: "3 пайдаланушыға дейін",
    businessPlan: "Бизнес",
    businessPrice: "15000₸/ай",
    businessFeature1: "Стандарттың бәрі",
    businessFeature2: "+ Толық AI-ассистент",
    businessFeature3: "+ 3 арна",
    businessFeature4: "+ Фото/PDF/аудио талдау",
    businessFeature5: "10 пайдаланушыға дейін",
    addonsNote: "Арналар мен AI бөлек сатып алынады:",
    addon1: "Арна (WhatsApp/Telegram): +2500₸/ай",
    addon2: "Толық AI: +5000₸/ай",

    // Target audience
    targetAudienceTitle: "Бұл кімге арналған",
    classicTarget:
      "Көтерме сауда компаниялары • B2B сатылым • Агенттіктер • Өндіріс • Консалтинг • Сатылым воронкасы бар кез келген бизнес",

    // Registration form
    registrationTitle: "Тегін 14 күн сынап көріңіз",
    nameField: "Аты",
    emailField: "Email",
    phoneField: "Телефон",
    companyField: "Компания атауы",
    submitButton: "Тегін бастау",
    noCardRequired: "Картасыз. Кез келген уақытта тоқтату.",
    registrationFormTitle: "Тегін сынақ кезеңін бастаңыз",
    registrationFormDescription: "Форманы толтырып, 14 күнге барлық функцияларға қол жеткізіңіз",
    fullNameLabel: "Толық аты",
    planLabel: "Тарифті таңдаңыз",
    starterPlan: "Базалық — 3000₸/ай",
    professionalPlan: "Стандарт — 8000₸/ай",
    enterprisePlan: "Бизнес — 15000₸/ай",
    submittingButton: "Жіберілуде...",
    successMessage: "Рахмет! Біз сізбен жақын арада байланысамыз.",
    errorMessage: "Қате пайда болды. Қайталап көріңіз.",

    // Services CRM Page
    servicesHeroTitle: "ArzanCRM қызметтерге — клиенттерді автоматты түрде жазыңыз",
    servicesHeroSubtitle:
      "Онлайн жазу, шеберлер күнтізбесі, автоеске салулар. AI клиенттерді WhatsApp-та сіздің қатысуыңызсыз жазады.",

    servicesFeature1: "Шеберлер күнтізбесі",
    servicesFeature1Desc: "Кесте, бос терезелер, автоматты жазу",
    servicesFeature2: "Онлайн жазу",
    servicesFeature2Desc: "Клиенттер WhatsApp/сайт арқылы өздері жазылады",
    servicesFeature3: "Автоеске салулар",
    servicesFeature3Desc: "3 күн, 1 күн, 3 сағат бұрын — келмеушілік 5%-ға дейін төмендейді",
    servicesFeature4: "Клиенттер базасы",
    servicesFeature4Desc: "Келулер тарихы, қалаулар, жазбалар",
    servicesFeature5: "AI автоматты түрде жазады",
    servicesFeature5Desc: '"Айгүлге жұмада маникюрге жазылғым келеді" → AI бәрін жасайды',
    servicesFeature6: "WhatsApp/Telegram чаттары",
    servicesFeature6Desc: "Клиенттермен барлық хат алмасу бір жерде",
    servicesFeature7: "Мәмілелер",
    servicesFeature7Desc: "Табысты қадағалау, орташа чек, қайталанатын келулер",
    servicesFeature8: "Есептер",
    servicesFeature8Desc: "Шеберлер, қызметтер, жүктеме, табыс бойынша",

    servicesStep1Title: 'Клиент: "Маникюрге жазылғым келеді"',
    servicesStep1Desc: "AI: күнтізбені тексереді, уақытты ұсынады",
    servicesStep2Title: "AI автоматты түрде жазады",
    servicesStep2Desc: "Шебер күнтізбесінде оқиға жасайды",
    servicesStep3Title: "Клиент еске салулар алады",
    servicesStep3Desc: "3 күн, 1 күн, келуге 3 сағат қалғанда",
    servicesStep4Title: "Келуден кейін — пікір сұрау",
    servicesStep4Desc: "1 күннен кейін автоматты түрде",

    servicesBasicFeature1: "Күнтізбе + Жазулар + Клиенттер",
    servicesBasicFeature2: "2 шеберге дейін",
    servicesBasicFeature3: "AI және WhatsApp жоқ",
    servicesStandardFeature2: "+ WhatsApp хабарламалары",
    servicesStandardFeature4: "5 шеберге дейін",
    servicesBusinessFeature2: "+ AI автоматты түрде жазады",
    servicesBusinessFeature3: "+ Фото/аудио талдау",
    servicesBusinessFeature4: "Шеберлер шексіз",

    servicesTarget:
      "Сұлулық салондары • Шаштараздар • СПА-салондар • Массаж кабинеттері • Косметология • Стоматология • Фитнес-студиялар • Жазу бойынша кез келген қызметтер",

    servicesSpecialNote: "Күнтізбе мен жазуларға назар",
    servicesSpecialDesc:
      "Классикалық жүйеден айырмашылығы, мұнда шеберлердің кестесімен және клиенттерді жазумен жұмысқа баса назар аударылады. Сатылым воронкалары жеңілдетілген — басты нәрсе жазу және келу.",

    // Kaspi CRM Page
    kaspiHeroTitle: "ArzanCRM Kaspi дүкеніне — тапсырыстармен жұмысты автоматтандырыңыз",
    kaspiHeroSubtitle:
      "Kaspi Shop интеграциясы + WhatsApp-та клиенттерге автожауаптар. AI тапсырыстар туралы сұрақтардың 90%-ын автоматты түрде өңдейді.",
    connectStore: "Дүкенді тегін қосу",

    kaspiFeature1: "Kaspi Shop интеграциясы",
    kaspiFeature1Desc: "Барлық тапсырыстар автоматты түрде CRM-ге түседі",
    kaspiFeature2: "WhatsApp автохабарламалары",
    kaspiFeature2Desc: "Тапсырыс қабылданды → Өңделуде → Жеткізілуде → Жеткізілді",
    kaspiFeature3: "AI сұрақтарға жауап береді",
    kaspiFeature3Desc: '"Менің тапсырысым қайда?" → AI күйін тексеріп, жауап береді',
    kaspiFeature4: "Клиенттермен чаттар",
    kaspiFeature4Desc: "WhatsApp/Telegram — барлық хат алмасу бір терезеде",
    kaspiFeature5: "AI чектерді тексереді",
    kaspiFeature5Desc: "Клиент чек фотосын жіберді → AI сомасын автоматты түрде салыстырады",
    kaspiFeature6: "Тапсырыстар бойынша мәмілелер",
    kaspiFeature6Desc: "Әр тапсырыс = кезеңдері мен сомасы бар мәміле",
    kaspiFeature7: "Сатылым аналитикасы",
    kaspiFeature7Desc: "Тауарлар, табыс, қайтарулар бойынша есептер",
    kaspiFeature8: "Клиенттер базасы",
    kaspiFeature8Desc: "Тапсырыстар тарихы, қалаулар, сегменттеу",

    kaspiStep1Title: "Kaspi-де жаңа тапсырыс",
    kaspiStep1Desc: "→ Автоматты түрде CRM-ге түседі → Мәміле жасалады",
    kaspiStep2Title: "Клиент WhatsApp алады",
    kaspiStep2Desc: '"Тапсырысыңыз үшін рахмет #12345! Тауарларыңызды жинаймыз 📦"',
    kaspiStep3Title: 'Клиент сұрайды: "Тапсырыс қайда?"',
    kaspiStep3Desc: "→ AI Kaspi-де күйін тексереді → Трек-нөмірімен жауап береді",
    kaspiStep4Title: "Тапсырыс жеткізілді",
    kaspiStep4Desc: "→ Автохабарлама + пікір сұрау",

    kaspiBasicFeature1: "Kaspi интеграциясы",
    kaspiBasicFeature2: "Мәмілелер + Клиенттер",
    kaspiBasicFeature3: "AI және WhatsApp жоқ",
    kaspiStandardPrice: "10000₸/ай",
    kaspiStandardBadge: "Kaspi үшін",
    kaspiStandardFeature2: "+ WhatsApp автохабарламалары",
    kaspiStandardFeature4: "Айына 500 тапсырысқа дейін",
    kaspiBusinessPrice: "20000₸/ай",
    kaspiBusinessFeature2: "+ Толық AI (бәріне жауап береді)",
    kaspiBusinessFeature3: "+ Чектерді фотодан тексеру",
    kaspiBusinessFeature4: "Тапсырыстар шексіз",

    kaspiTarget: "Кез келген көлемдегі Kaspi Shop сатушылары. Айына 100+ тапсырыс кезінде ерекше тиімді",

    kaspiSpecialNote: "Күнтізбе мен кездесулер жоқ",
    kaspiSpecialDesc:
      "Бұл нұсқа e-commerce үшін арнайы жасалған: чаттар, тапсырыстар, хабарламаларды автоматтандыру. Күнтізбе қажет емес — барлық әрекеттер онлайн.",

    // FAQ
    faqTitle: "Жиі қойылатын сұрақтар",
    faq1Q: "Қанша тұрады?",
    faq1A: "Базалық нұсқа үшін айына 3000₸-ден. Алғашқы 14 күн картасыз тегін.",
    faq2Q: "Тегін кезеңге не кіреді?",
    faq2A: "Таңдалған ArzanCRM түрінің барлық функцияларына толық қол жеткізу. Шектеусіз. Карта қажет емес.",
    faq3Q: "Тіркелгеннен кейін CRM түрін өзгертуге бола ма?",
    faq3A: "Иә, кез келген уақытта Классик / Қызметтер / Kaspi арасында ауысуға болады.",
    faq4Q: "WhatsApp қалай қосу керек?",
    faq4A: '"Арна" модулін сатып аласыз (2500₸/ай), біз қосуға көмектесеміз. 1 күн алады.',
    faq5Q: "AI қосымша ақылы ма?",
    faq5A:
      "Базалық AI-бот (интенттер + үлгілер) Стандарт тарифіне кіреді. Толық AI бөлек сатып алынады — 5000₸/ай немесе өз OpenAI токеніңіз.",
    faq6Q: "Kaspi интеграциясы күрделі ме?",
    faq6A: "Жоқ, Kaspi жеке кабинетінен API кілтін бересіз, біз 10 минутта қосамыз.",
    faq7Q: "Қанша пайдаланушы қосуға болады?",
    faq7A: "Тарифке байланысты: 1-3-10 немесе шексіз. Қосымша: пайдаланушы үшін 1500₸/ай.",
    faq8Q: "Мобильді қосымша бар ма?",
    faq8A: "Әзірге жоқ, бірақ адаптивті веб-нұсқа телефонда тамаша жұмыс істейді.",
    faq9Q: "Деректер қауіпсіз бе?",
    faq9A: "Иә, серверлер Қазақстанда, шифрлау, күн сайын сақтық көшірмелер.",

    // Dashboard
    dashboard: "Басты бет",
    clients: "Клиенттер",
    funnels: "Воронкалар",
    calendar: "Күнтізбе",
    messages: "Хабарламалар",
    channels: "Арналар",
    automation: "Автоматтандыру",
    analytics: "Аналитика",
    settings: "Баптаулар",
    crmSystem: "ArzanCRM",
    profile: "Профиль",
    logout: "Шығу",
    plan: "Тариф",
    status: "Күй",
    trialStatus: "Сынақ кезеңі",
    activeStatus: "Белсенді",
  },
}

export function getTranslation(lang: Language) {
  return translations[lang]
}
