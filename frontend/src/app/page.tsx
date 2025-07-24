import Dashboard from './Dashboard'
import {
    ClockIcon,
    GiftIcon,
    RocketLaunchIcon,
    ShieldCheckIcon,
    SparklesIcon,
    TagIcon
} from "@heroicons/react/24/outline";




export const metadata = {
    title: "Patched",
    description: "Patched - цифровой магазин игр",
}

interface ArrayOfData {
    id: number;
    name: string;
    price: string;
    picture: string;
}

const arrayOfData: ArrayOfData[] = [
    {
        id: 1,
        name: "Grand Theft Auto V",
        price: "899",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg",
    },
    {
        id: 2,
        name: "Grand Theft Auto IV: The Complete Edition",
        price: "599",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/12210/header.jpg",
    },
    {
        id: 3,
        name: "The Witcher 3: Wild Hunt",
        price: "1199",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg",
    },
    {
        id: 4,
        name: "Cyberpunk 2077",
        price: "1999",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg",
    },
    {
        id: 5,
        name: "Red Dead Redemption 2",
        price: "2499",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg",
    },
    {
        id: 6,
        name: "Elden Ring",
        price: "3999",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg",
    },
    {
        id: 7,
        name: "Hollow Knight",
        price: "360",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/367520/header.jpg",
    },
    {
        id: 8,
        name: "Stardew Valley",
        price: "349",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg",
    },
    {
        id: 9,
        name: "Baldur's Gate 3",
        price: "1999",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg",
    },
    {
        id: 10,
        name: "The Elder Scrolls V: Skyrim Special Edition",
        price: "1599",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg",
    },
    {
        id: 11,
        name: "DOOM Eternal",
        price: "1999",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/782330/header.jpg",
    },
    {
        id: 12,
        name: "Hades",
        price: "899",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg",
    },
    {
        id: 13,
        name: "Factorio",
        price: "1000",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/427520/header.jpg",
    },
    {
        id: 14,
        name: "Terraria",
        price: "249",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg",
    },
    {
        id: 15,
        name: "Sid Meier's Civilization VI",
        price: "1999",
    }
];

interface FaqData {
    question: string;
    answer: string;
}

const faqData: FaqData[] = [
    {
        question: "Как быстро я получу свой ключ после оплаты?",
        answer: "Моментально! Сразу после подтверждения оплаты цифровой ключ от игры автоматически отправляется на вашу электронную почту. Также он будет доступен в вашем личном кабинете на сайте."
    },
    {
        question: "Это официальные ключи? Мой аккаунт не забанят?",
        answer: "Абсолютно! Мы работаем только с официальными дистрибьюторами и издателями игр. Все ключи являются лицензионными, поэтому вы можете быть уверены в безопасности вашего аккаунта."
    },
    {
        question: "Что делать, если ключ не работает или возникла проблема с активацией?",
        answer: "Не волнуйтесь! Наша служба поддержки работает круглосуточно и готова помочь. Просто напишите нам в чат на сайте или на почту, приложив скриншот ошибки, и мы оперативно решим ваш вопрос."
    },
    {
        question: "Я купил игру, но она мне не понравилась. Могу я вернуть деньги?",
        answer: "К сожалению, согласно правилам цифровой дистрибуции, возврат средств за активированный цифровой ключ невозможен. Пожалуйста, убедитесь, что вы покупаете нужную игру и ваш ПК соответствует системным требованиям."
    },
    {
        question: "У меня нет зарубежной карты. Как я могу пополнить Steam или купить игру?",
        answer: "С помощью нашего сервиса вы можете легко пополнить баланс вашего кошелька Steam или приобрести любую игру, используя российские банковские карты. Мы берем все сложности с конвертацией и оплатой на себя!"
    },
    {
        question: "Что означает 'Region: GLOBAL' или 'Region: RU/CIS'?",
        answer: "Это регион активации ключа. 'GLOBAL' означает, что ключ можно активировать в любой стране мира. 'RU/CIS' означает, что ключ предназначен для активации в России и странах СНГ. Внимательно читайте описание товара перед покупкой."
    }
];

interface TestimonialsData {
    id: number;
    author: string;
    avatar: string;
    game: string;
    rating: number;
    text: string;
}

const testimonialsData: TestimonialsData[] = [
    {
        id: 1,
        author: 'Alex_Gamer',
        avatar: 'https://i.pravatar.cc/48?u=alex_gamer',
        game: 'Cyberpunk 2077',
        rating: 5,
        text: 'Ключ пришел моментально, даже не успел чайник вскипеть! Все активировалось без проблем. Спасибо, Patched, теперь только к вам!'
    },
    {
        id: 2,
        author: 'Elena_Swift',
        avatar: 'https://i.pravatar.cc/48?u=elena_swift',
        game: 'Elden Ring',
        rating: 5,
        text: 'Очень боялась покупать ключи в интернете, но тут все прошло гладко. Цена была самой низкой из всех, что я нашла. Поддержка ответила на мой вопрос за 5 минут. Супер!'
    },
    {
        id: 3,
        author: 'MadMax_Play',
        avatar: 'https://i.pravatar.cc/48?u=madmax_play',
        game: 'Baldur\'s Gate 3',
        rating: 5,
        text: 'Пополнил Стим через этот сайт, деньги пришли сразу же. Удобно, быстро и без заморочек с зарубежными картами. Настоящее спасение.'
    },
    {
        id: 4,
        author: 'GamerGirl94',
        avatar: 'https://i.pravatar.cc/48?u=GamerGirl94',
        game: 'Helldivers 2',
        rating: 5,
        text: 'Купила ключ для Helldivers 2, активация в Steam прошла успешно. Цена порадовала, ниже чем у конкурентов. Буду брать еще!'
    },
    {
        id: 5,
        author: 'S_T_A_L_K_E_R',
        avatar: 'https://i.pravatar.cc/48?u=S_T_A_L_K_E_R',
        game: 'Escape from Tarkov',
        rating: 5,
        text: 'Все четко и быстро. Ключ пришел на почту через минуту после оплаты. Сервис на высшем уровне, рекомендую.'
    },
    {
        id: 6,
        author: 'Dmitry_S',
        avatar: 'https://i.pravatar.cc/48?u=Dmitry_S',
        game: 'Starfield',
        rating: 4,
        text: 'Немного волновался, так как покупал впервые. Но все прошло отлично. Единственное, ждал ключ минут 15, но в остальном все супер.'
    },
    {
        id: 7,
        author: 'Katya_Stream',
        avatar: 'https://i.pravatar.cc/48?u=Katya_Stream',
        game: 'Lethal Company',
        rating: 5,
        text: 'Брали с друзьями сразу 4 ключа для Lethal Company. Все пришли моментально, уже играем! Спасибо за отличные цены и скорость!'
    },
    {
        id: 8,
        author: 'Old_Gamer',
        avatar: 'https://i.pravatar.cc/48?u=Old_Gamer',
        game: 'Пополнение Steam',
        rating: 5,
        text: 'Отличный способ пополнить кошелек Steam. Комиссия адекватная, деньги зачисляются практически мгновенно. Теперь не нужно просить друзей из-за границы.'
    }
];


interface Privileges {
    icon: 'TagIcon' | 'GiftIcon' | 'SparklesIcon' | 'RocketLaunchIcon' | 'ClockIcon' | 'ShieldCheckIcon' ;
    title: string;
    text: string;
}

const privileges:Privileges[] = [
    {
        icon: 'TagIcon',
        title: 'Лучшие цены',
        text: 'Экономьте на каждой покупке благодаря нашим эксклюзивным скидкам и регулярным распродажам'
    },
    {
        icon: 'GiftIcon',
        title: 'Моментальная доставка',
        text: 'Не ждите ни секунды! Ключ от игры появится в вашем личном кабинете сразу после подтверждения оплаты'
    },
    {
        icon: 'SparklesIcon',
        title: 'Игры в день релиза',
        text: 'Получайте доступ к самым ожидаемым новинкам в день их официального выхода и начинайте играть вместе со всем миром'
    },
    {
        icon: 'RocketLaunchIcon',
        title: 'Быстрое пополнение',
        text: 'Пополняйте баланс вашего Steam аккаунта за считанные секунды с помощью удобных и безопасных платежных систем'
    },
    {
        icon: 'ClockIcon',
        title: 'Круглосуточная поддержка',
        text: 'Наша команда поддержки доступна 24/7 и готова оперативно решить любой ваш вопрос в чате или по почте'
    },
    {
        icon: 'ShieldCheckIcon',
        title: 'Надежный сервис',
        text: 'Мы работаем только с официальными издателями, гарантируя легальность и работоспособность каждого ключа'
    },
];

export default function Home() {
  return (
      <Dashboard
          arrayOfData = {arrayOfData}
          faqData = {faqData}
          testimonialsData = {testimonialsData}
          privileges = {privileges}
      />
  );
}
