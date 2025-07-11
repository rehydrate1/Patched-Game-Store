"use client";

import {
    ShoppingCartIcon,
    TagIcon,
    ShieldCheckIcon,
    GiftIcon,
    RocketLaunchIcon,
    ClockIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';

import TextPressure from "@/components/UI/Modern/TextPressure";
import Image from "next/image";
import MainPrivilegeCards from "@/components/PrivilegeCards/MainPrivilegeCard";


const popularGames = [
    { id: 1, title: "Cyber Glitch 2099", price: "2499₽",  image: "https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg" },
    { id: 2, title: "Void Runners", price: "1899₽", image: "https://cdn.akamai.steamstatic.com/steam/apps/12210/header.jpg" },
    { id: 3, title: "Starfall Odyssey", price: "2999₽", image: "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg" },
    { id: 4, title: "Neon Fury", price: "999₽", image: "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg" },
];

const privileges = [
    {
        icon: TagIcon,
        title: 'Лучшие цены',
        text: 'Экономьте на каждой покупке благодаря нашим эксклюзивным скидкам и регулярным распродажам'
    },
    {
        icon: GiftIcon,
        title: 'Моментальная доставка',
        text: 'Не ждите ни секунды! Ключ от игры появится в вашем личном кабинете сразу после подтверждения оплаты'
    },
    {
        icon: SparklesIcon,
        title: 'Игры в день релиза',
        text: 'Получайте доступ к самым ожидаемым новинкам в день их официального выхода и начинайте играть вместе со всем миром'
    },
    {
        icon: RocketLaunchIcon,
        title: 'Быстрое пополнение',
        text: 'Пополняйте баланс вашего Steam аккаунта за считанные секунды с помощью удобных и безопасных платежных систем'
    },
    {
        icon: ClockIcon,
        title: 'Круглосуточная поддержка',
        text: 'Наша команда поддержки доступна 24/7 и готова оперативно решить любой ваш вопрос в чате или по почте'
    },
    {
        icon: ShieldCheckIcon,
        title: 'Надежный сервис',
        text: 'Мы работаем только с официальными издателями, гарантируя легальность и работоспособность каждого ключа'
    },
];

export default function Dashboard({products}) {
    return (
        <div className="min-h-screen">

            <header className="relative min-h-screen flex items-center justify-center overflow-hidden"><div className="absolute inset-0 bg-gradient-to-br from-[#4F0A78] to-[#004AAD] opacity-80"></div>
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#AFFF34]/10 rounded-full filter blur-2xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#004AAD]/20 rounded-lg filter blur-3xl animate-pulse delay-1000"></div>

                <div className="relative z-10 text-center w-full flex flex-col items-center">

                    <div className="w-full max-w-7xl">
                        <TextPressure
                            text="PATCHED"
                            flex={true}
                            alpha={false}
                            stroke={false}
                            width={true}
                            weight={true}
                            italic={true}
                            textColor="#ffffff"
                            minFontSize={60}
                        />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-20">
                <section id="popular-games" className="mb-35">
                    <h2 className="text-4xl font-bold text-center mb-20 text-white">Сейчас в топе продаж</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {popularGames.map(game => (
                            <div key={game.id} className="group relative bg-[#1A1129] rounded-xl overflow-hidden
                                                     border border-transparent hover:border-[#00FE92] transition-all duration-300">
                                <Image src={game.image} alt={game.title} width={1920} height={1080} className="w-full h-auto object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"/>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-4 w-full">
                                    <h3 className="text-xl font-bold text-white">{game.title}</h3>
                                    <div className="flex items-baseline gap-2 mt-2">
                                        <p className="text-2xl font-bold text-white">{game.price}</p>
                                    </div>
                                    <button className="mt-4 w-full bg-[#00FE92] text-black font-bold py-2 rounded-lg
                                                     flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100
                                                     transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        <ShoppingCartIcon className="h-5 w-5" /> В корзину
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>


                <section id="why-us" className="mb-5">
                    <h2 className="text-4xl font-bold text-center mb-20 text-white">Почему Patched?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {privileges.map(privilege => (
                            <MainPrivilegeCards
                                key = {privilege.title}
                                title = {privilege.title}
                                icon = {privilege.icon}
                                text = {privilege.text}
                            />
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}