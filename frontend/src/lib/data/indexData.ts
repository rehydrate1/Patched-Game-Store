import {SelectOption} from "@/components/Inputs/MultiSelectDropdown/MultiSelectDropdown";

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
};

export const platformIcons = {
    'macOS': '/appleIcon.svg',
    'Windows': '/windowsIcon.svg',
    'Linux': '/linuxIcon.svg',
};

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