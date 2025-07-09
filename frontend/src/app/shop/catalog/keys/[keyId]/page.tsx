import AboutKey from "@/app/shop/catalog/keys/[keyId]/AboutKey";

const arrayOfData = [
    {
        id: 1,
        name: "Grand Theft Auto V",
        price: "899",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg",
        releaseData: "14.04.2015",
        platforms: ['Windows'],
        applications: ['Steam', 'Rockstar Launcher'],
        genres: ['Экшен', 'Открытый мир'],
        developer: 'Rockstar Games'
    },
    {
        id: 2,
        name: "Grand Theft Auto IV: The Complete Edition",
        price: "599",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/12210/header.jpg",
        releaseData: "02.12.2008",
        platforms: ['Windows'],
        applications: ['Steam'],
        genres: ['Экшен', 'Открытый мир'],
        developer: 'Rockstar Games'
    },
    {
        id: 3,
        name: "The Witcher 3: Wild Hunt",
        price: "1199",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg",
        releaseData: "19.05.2015",
        platforms: ['Windows'],
        applications: ['Steam', 'GOG', 'Epic Games'],
        genres: ['RPG', 'Открытый мир', 'Фэнтези'],
        developer: 'CD PROJEKT RED'
    },
    {
        id: 4,
        name: "Cyberpunk 2077",
        price: "1999",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg",
        releaseData: "10.12.2020",
        platforms: ['Windows'],
        applications: ['GOG', 'Steam'],
        genres: ['RPG', 'Экшен', 'Открытый мир', 'Киберпанк'],
        developer: 'CD PROJEKT RED'
    },
    {
        id: 5,
        name: "Red Dead Redemption 2",
        price: "2499",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg",
        releaseData: "05.11.2019",
        platforms: ['Windows'],
        applications: ['Steam', 'Rockstar Launcher', 'Epic Games'],
        genres: ['Экшен', 'Приключения', 'Вестерн'],
        developer: 'Rockstar Games'
    },
    {
        id: 6,
        name: "Elden Ring",
        price: "3999",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg",
        releaseData: "25.02.2022",
        platforms: ['Windows'],
        applications: ['Steam'],
        genres: ['RPG', 'Экшен', 'Хардкор', 'Фэнтези', 'Открытый мир'],
        developer: 'FromSoftware Inc.'
    },
    {
        id: 7,
        name: "Hollow Knight",
        price: "360",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/367520/header.jpg",
        releaseData: "24.02.2017",
        platforms: ['Windows', 'macOS', 'Linux'],
        applications: ['Steam'],
        genres: ['Метроидвания', 'Платформер', 'Инди'],
        developer: 'Team Cherry'
    },
    {
        id: 8,
        name: "Stardew Valley",
        price: "349",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg",
        releaseData: "26.02.2016",
        platforms: ['Windows', 'macOS', 'Linux'],
        applications: ['Steam', 'GOG'],
        genres: ['Симулятор', 'RPG', 'Инди'],
        developer: 'ConcernedApe'
    },
    {
        id: 9,
        name: "Baldur's Gate 3",
        price: "1999",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg",
        releaseData: "03.08.2023",
        platforms: ['Windows', 'macOS'],
        applications: ['Steam', 'GOG'],
        genres: ['RPG', 'Пошаговая', 'Фэнтези', 'Приключения'],
        developer: 'Larian Studios'
    },
    {
        id: 10,
        name: "The Elder Scrolls V: Skyrim Special Edition",
        price: "1599",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg",
        releaseData: "28.10.2016",
        platforms: ['Windows'],
        applications: ['Steam'],
        genres: ['RPG', 'Открытый мир', 'Фэнтези'],
        developer: 'Bethesda Game Studios'
    },
    {
        id: 11,
        name: "DOOM Eternal",
        price: "1999",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/782330/header.jpg",
        releaseData: "20.03.2020",
        platforms: ['Windows'],
        applications: ['Steam', 'Bethesda.net'],
        genres: ['Шутер', 'Экшен'],
        developer: 'id Software'
    },
    {
        id: 12,
        name: "Hades",
        price: "899",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg",
        releaseData: "17.09.2020",
        platforms: ['Windows', 'macOS'],
        applications: ['Steam', 'Epic Games'],
        genres: ['Экшен', 'Roguelike', 'Инди'],
        developer: 'Supergiant Games'
    },
    {
        id: 13,
        name: "Factorio",
        price: "1000",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/427520/header.jpg",
        releaseData: "14.08.2020",
        platforms: ['Windows', 'macOS', 'Linux'],
        applications: ['Steam'],
        genres: ['Стратегия', 'Симулятор', 'Выживание', 'Автоматизация'],
        developer: 'Wube Software LTD'
    },
    {
        id: 14,
        name: "Terraria",
        price: "249",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg",
        releaseData: "16.05.2011",
        platforms: ['Windows', 'macOS', 'Linux'],
        applications: ['Steam', 'GOG'],
        genres: ['Песочница', 'Приключения', 'Выживание'],
        developer: 'Re-Logic'
    },
    {
        id: 15,
        name: "Sid Meier's Civilization VI",
        price: "1999",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/289070/header.jpg",
        releaseData: "21.10.2016",
        platforms: ['Windows', 'macOS', 'Linux'],
        applications: ['Steam', 'Epic Games'],
        genres: ['Глобальная стратегия', 'Пошаговая стратегия'],
        developer: 'Firaxis Games'
    }
];
export async function generateMetadata({ params }) {
    const { keyId } = params;
    const product = arrayOfData.find(item => item.id === parseInt(keyId));

    return {
        title: product.name,
        description: `Подробная информация о ${product.name}`,
    };
}

export default function AboutKeyPage({ params }) {
    const { keyId } = params;


    const product = arrayOfData.find(item => item.id === parseInt(keyId));


    return (
        <>
            <AboutKey product={product} />
        </>
    );
}