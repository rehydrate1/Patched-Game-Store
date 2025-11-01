import {SelectOption} from "@/components/Inputs/MultiSelectDropdown/MultiSelectDropdown";
import {FaqDataStructure} from "@/types";

export const platformOptions: SelectOption[] = [
    { value: 'Windows', label: 'Windows' },
    { value: 'macOS', label: 'macOS' },
    { value: 'Linux', label: 'Linux' },
];

export const applicationOptions: SelectOption[] = [
    { value: 'Steam', label: 'Steam' },
    { value: 'Epic Games', label: 'Epic Games' },
    { value: 'EA', label: 'EA' },
    { value: 'GOG', label: 'GOG' },
    { value: 'Bethesda.net', label: 'Bethesda.net' },
    { value: 'Ubisoft', label: 'Ubisoft' },
];

export const genreOptions: SelectOption[] = [
    { value: 'action', label: 'Экшен' },
    { value: 'rpg', label: 'RPG' },
    { value: 'strategy', label: 'Стратегия' },
    { value: 'shooter', label: 'Шутер' },
    { value: 'adventure', label: 'Приключение' },
    { value: 'simulator', label: 'Симулятор' },
    { value: 'horror', label: 'Хоррор' },
    { value: 'indie', label: 'Инди' },
];

export const applicationIcons = {
    'Steam': '/steamIcon.svg',
    'Epic Games': '/epic.svg',
    'GOG': '/gog.svg',
    'Bethesda.net': '/bethesda.svg',
    'EA': '/eaIcon.svg',
    'Ubisoft Connect': "/ubisoftIcon.svg",
} as const;


export const platformIcons = {
    'macOS': '/appleIcon.svg',
    'Windows': '/windowsIcon.svg',
    'Linux': '/linuxIcon.svg',
} as const;

export type ApplicationKey = keyof typeof applicationIcons;
export type PlatformKey = keyof typeof platformIcons;

export const headerNavItems = [
    {
        text: 'Магазин ключей',
        link: '/shop/catalog/keys',
    },
    {
        text: 'Пополнение Steam',
        link: '/steam-balance',
    },
    {
        text: 'Консоли и сервисы',
        link: '/services',
    },
    {
        text: 'Гарантии',
        link: '/guarantees',
    },
    {
        text: 'Поддержка',
        link: '/support',
    },
];

export const steamFaqData: FaqDataStructure[] = [
    {
        question: "Как узнать свой логин Steam?",
        answer: "Ваш логин Steam — это имя, которое вы используете для входа в приложение Steam, а не ваш никнейм в профиле. Его можно посмотреть в правом верхнем углу клиента Steam."
    },
    {
        question: "Как быстро придут деньги?",
        answer: "Обычно пополнение происходит моментально, в течение 1-2 минут после успешной оплаты. В редких случаях из-за нагрузки на серверы Steam возможны задержки до 15 минут."
    },
    {
        question: "Какая у вас комиссия?",
        answer: "Наша комиссия составляет 10% от суммы пополнения. Она уже включена в итоговую сумму 'К оплате', вы видите конечную цену."
    },
    {
        question: "Что делать, если я ошибся логином?",
        answer: "К сожалению, мы не можем отменить платеж, отправленный на неверный логин. Пожалуйста, будьте предельно внимательны при вводе данных."
    }
];

export const screenshots_placeholder = [
    "https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg",
    "https://cdn.akamai.steamstatic.com/steam/apps/12210/header.jpg",
    "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg",
];

export const requirements_placeholder = {
    minimum: { "ОС": "Windows 10 64-bit", "Процессор": "Core i7-6700 / Ryzen 5 1600", "Память": "12 GB RAM", "Видеокарта": "GeForce GTX 1060 6GB", "Место на диске": "70 GB SSD" },
    recommended: { "ОС": "Windows 10 64-bit", "Процессор": "Core i7-12700 / Ryzen 7 7800X3D", "Память": "16 GB RAM", "Видеокарта": "GeForce RTX 2060 SUPER", "Место на диске": "70 GB SSD" }
};