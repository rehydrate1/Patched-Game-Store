"use client"

import styles from "./AboutKey.module.scss";
import Image from "next/image";

const applicationIcons = {
    'Steam': '/steamIcon.svg',
    'Epic Games': '/epic.svg',
    'GOG': '/gog.svg',
    'Bethesda.net': '/bethesda.svg',
    'EA': '/eaIcon.svg',
    'Ubisoft Connect': "/ubisoftIcon.svg",
};

const platformIcons = { 'macOS': '/appleIcon.svg', 'Windows': '/windowsIcon.svg', 'Linux': '/linuxIcon.svg' };

export default function AboutKey({ product }) {
    if (!product) {
        return <div className="text-white text-center p-10">Загрузка...</div>;
    }

    const screenshots_placeholder = [
        "https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg",
        "https://cdn.akamai.steamstatic.com/steam/apps/12210/header.jpg",
        "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg",
    ];

    const requirements_placeholder = {
        minimum: { "ОС": "Windows 10 64-bit", "Процессор": "Core i7-6700 / Ryzen 5 1600", "Память": "12 GB RAM", "Видеокарта": "GeForce GTX 1060 6GB", "Место на диске": "70 GB SSD" },
        recommended: { "ОС": "Windows 10 64-bit", "Процессор": "Core i7-12700 / Ryzen 7 7800X3D", "Память": "16 GB RAM", "Видеокарта": "GeForce RTX 2060 SUPER", "Место на диске": "70 GB SSD" }
    };

    return (
        <div className="container mx-auto py-8 md:py-12">
            <main className={`rounded-xl shadow-2xl overflow-hidden ${styles.mainCard}`}>
                <div className="relative w-full aspect-video md:aspect-[2.5/0.8]">
                    <Image src={product.picture} alt={`${product.name} cover art`} fill priority className="object-cover" />
                </div>

                <div className="p-6 md:p-8 lg:p-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">{product.name}</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 lg:gap-x-8 xl:gap-x-12 mt-6">
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b border-white/10">Об игре</h2>
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    Погрузитесь в захватывающий мир {product.name}, разработанный студией {product.developer}. Вас ждут невероятные приключения, проработанный сюжет и графика нового поколения.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {product.genres.map(genre => (
                                        <span key={genre} className="bg-white/10 text-gray-200 text-sm font-medium px-3 py-1 rounded-full">
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* ---  ГАЛЕРЕЯ СКРИНШОТОВ --- */}
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">Галерея</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {screenshots_placeholder.map((src, index) => (
                                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer">
                                            <Image src={src} alt={`Скриншот ${index + 1}`} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/0"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* --- СИСТЕМНЫЕ ТРЕБОВАНИЯ --- */}
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">Системные требования</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-black/20 p-5 rounded-lg border border-white/10">
                                        <h3 className="text-lg font-semibold text-white mb-4">Минимальные</h3>
                                        <dl className="space-y-3">
                                            {Object.entries(requirements_placeholder.minimum).map(([key, value]) => (
                                                <div key={key} className="flex justify-between text-sm">
                                                    <dt className="text-gray-400">{key}</dt>
                                                    <dd className="text-white text-right font-medium">{value}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </div>
                                    <div className="bg-black/20 p-5 rounded-lg border border-white/10">
                                        <h3 className="text-lg font-semibold text-white mb-4">Рекомендуемые</h3>
                                        <dl className="space-y-3">
                                            {Object.entries(requirements_placeholder.recommended).map(([key, value]) => (
                                                <div key={key} className="flex justify-between text-sm">
                                                    <dt className="text-gray-400">{key}</dt>
                                                    <dd className="text-white text-right font-medium">{value}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* --- ПРАВАЯ КОЛОНКА: ПОКУПКА --- */}
                        <div className="lg:col-span-1">
                            <div className="bg-black/20 border border-white/10 rounded-lg p-6 flex flex-col gap-5">
                                <div className="text-center">
                                    <p className="text-gray-400 text-sm">Цена</p>
                                    <p className="text-5xl font-extrabold my-3 text-white tracking-tighter">
                                        {product.price} ₽
                                    </p>
                                </div>

                                <button className={`w-full text-black cursor-pointer font-bold py-3 px-4 rounded-lg text-lg ${styles.buyButton}`}>
                                    Добавить в корзину
                                </button>

                                <div className="pt-5 border-t border-white/10 space-y-3">
                                    <dl>
                                        <div className="flex justify-between items-center text-sm mt-1 py-1">
                                            <dt className="text-gray-400">Разработчик</dt>
                                            <dd className="text-white font-medium">{product.developer}</dd>
                                        </div>
                                        <div className="flex justify-between items-center text-sm mt-1 py-1">
                                            <dt className="text-gray-400">Издатель</dt>
                                            <dd className="text-white font-medium">{product.publisher}</dd>
                                        </div>
                                        <div className="flex justify-between items-center text-sm mt-1 py-1">
                                            <dt className="text-gray-400">Дата выхода</dt>
                                            <dd className="text-white font-medium">{product.releaseData}</dd>
                                        </div>
                                        <div className="flex justify-between items-center text-sm mt-1 py-1">
                                            <dt className="text-gray-400">Платформы</dt>
                                            <dd className="flex gap-3">
                                                {product.platforms.map(p => (
                                                    platformIcons[p] && <Image key={p} src={platformIcons[p]} width={20} height={20} alt={p} title={p} />
                                                ))}
                                            </dd>
                                        </div>
                                        <div className="flex justify-between items-center text-sm mt-1 py-1">
                                            <dt className="text-gray-400">Активация</dt>
                                            <dd className="flex gap-3">
                                                {product.applications.map(app => (
                                                    applicationIcons[app] && <Image key={app} src={applicationIcons[app]} width={20} height={20} alt={app} title={app} />
                                                ))}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}