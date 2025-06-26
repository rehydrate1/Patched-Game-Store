"use client";

import styles from "./KeysCatalog.module.scss";
import Image from "next/image";
import { useState, useEffect, useMemo } from 'react';
import {useRouter} from "next/navigation";

interface KeysCatalogProps {
    keysArray?: {
        id: number;
        name: string;
        price: string;
        picture: string;
        releaseData: string;
        platforms: string[];
        applications: string[];
        genres: string[];
        developer: string;
    }[];
}

const applicationIcons = {
    'Steam': '/steamIcon.svg',
    'Epic Games Store': '/icons/epic.svg',
    'Ubisoft': '/ubisoftIcons.svg',
    'Xbox': '/xboxIcon.svg',
    'EA': '/eaIcon.svg',
};

const platformIcons = {
    'macOS': '/appleIcon.svg',
    'Windows': '/windowsIcon.svg',
    'Linux': '/linuxIcons.svg',
};


export default function KeysCatalog({ keysArray = [] }: KeysCatalogProps) {
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
    const [filteredKeys, setFilteredKeys] = useState(keysArray);
    const router = useRouter();

    const allPlatforms = useMemo(() => {
        const platformsSet = new Set<string>();
        keysArray.forEach(game => game.platforms.forEach(p => platformsSet.add(p)));
        return Array.from(platformsSet).sort();
    }, [keysArray]);

    const allGenres = useMemo(() => {
        const genresSet = new Set<string>();
        keysArray.forEach(game => game.genres.forEach(g => genresSet.add(g)));
        return Array.from(genresSet).sort();
    }, [keysArray]);

    const allApplications = useMemo(() => {
        const applicationsSet = new Set<string>();
        keysArray.forEach(game => game.applications.forEach(app => applicationsSet.add(app)));
        return Array.from(applicationsSet).sort();
    }, [keysArray]);

    useEffect(() => {
        let tempKeys = [...keysArray];


        const from = parseFloat(priceFrom);
        const to = parseFloat(priceTo);

        tempKeys = tempKeys.filter(game => {
            const gamePrice = parseFloat(game.price.replace(/[^0-9.]/g, ''));

            if (isNaN(gamePrice)) return false;

            if (!isNaN(from) && gamePrice < from) {
                return false;
            }
            if (!isNaN(to) && gamePrice > to) {
                return false;
            }
            return true;
        });

        if (selectedPlatforms.length > 0) {
            tempKeys = tempKeys.filter(game =>
                selectedPlatforms.some(platform => game.platforms.includes(platform))
            );
        }

        if (selectedGenres.length > 0) {
            tempKeys = tempKeys.filter(game =>
                selectedGenres.some(genre => game.genres.includes(genre))
            );
        }

        if (selectedApplications.length > 0) {
            tempKeys = tempKeys.filter(game =>
                selectedApplications.some(app => game.applications.includes(app))
            );
        }

        setFilteredKeys(tempKeys);

    }, [priceFrom, priceTo, selectedPlatforms, selectedGenres, selectedApplications, keysArray]);

    const handlePlatformChange = (platform: string) => {
        setSelectedPlatforms(prev =>
            prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
        );
    };

    const handleGenreChange = (genre: string) => {
        setSelectedGenres(prev =>
            prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
        );
    };

    const handleApplicationChange = (app: string) => {
        setSelectedApplications(prev =>
            prev.includes(app) ? prev.filter(a => a !== app) : [...prev, app]
        );
    };

    const resetFilters = () => {
        setPriceFrom('');
        setPriceTo('');
        setSelectedPlatforms([]);
        setSelectedGenres([]);
        setSelectedApplications([]);
    };

    const addNewKey = () => {
        router.push('/catalog/keys/new')
    }

    return (
        <>
            <div className="flex flex-col md:flex-row container mx-auto my-10 gap-8">

                <aside className={`text-white p-6 rounded-lg w-full md:w-1/4 ${styles.mainCard} h-fit`}>
                    <h2 className="text-2xl font-bold mb-6">Фильтры</h2>

                    <div className="mb-6">
                        <h3 className="font-semibold mb-3">Цена, ₽</h3>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={priceFrom}
                                onChange={(e) => setPriceFrom(e.target.value)}
                                placeholder="От"
                                min="0"
                                className={`w-full text-white text-sm rounded-lg focus:outline-none ${styles.searchInput} p-2.5`}
                            />
                            <span className="text-gray-400">-</span>
                            <input
                                type="number"
                                value={priceTo}
                                onChange={(e) => setPriceTo(e.target.value)}
                                placeholder="До"
                                min="0"
                                className={`w-full text-white text-sm rounded-lg focus:outline-none ${styles.searchInput} p-2.5`}
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-semibold mb-3">Платформы</h3>
                        <div className="space-y-2">
                            {allPlatforms.map(platform => (
                                <div key={platform} className="flex items-center">
                                    <input type="checkbox" id={`platform-${platform}`} checked={selectedPlatforms.includes(platform)} onChange={() => handlePlatformChange(platform)} className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-600" />
                                    <label htmlFor={`platform-${platform}`} className="ml-2 text-sm cursor-pointer">{platform}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-semibold mb-3">Активация в</h3>
                        <div className="space-y-2">
                            {allApplications.map(app => (
                                <div key={app} className="flex items-center">
                                    <input type="checkbox" id={`app-${app}`} checked={selectedApplications.includes(app)} onChange={() => handleApplicationChange(app)} className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-600" />
                                    <label htmlFor={`app-${app}`} className="ml-2 text-sm cursor-pointer">{app}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-semibold mb-3">Жанры</h3>
                        <div className="space-y-2">
                            {allGenres.map(genre => (
                                <div key={genre} className="flex items-center">
                                    <input type="checkbox" id={`genre-${genre}`} checked={selectedGenres.includes(genre)} onChange={() => handleGenreChange(genre)} className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-600" />
                                    <label htmlFor={`genre-${genre}`} className="ml-2 text-sm cursor-pointer">{genre}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <button onClick={resetFilters} className={`text-black w-full font-semibold p-2 rounded-md ${styles.addButton}`}>
                            Сбросить фильтры
                        </button>
                    </div>

                    <div className="mt-4">
                        <button onClick={addNewKey} className={`text-black w-full font-semibold p-2 rounded-md ${styles.addButton}`}>
                            Добавить новый товар
                        </button>
                    </div>
                </aside>

                <main className="w-full md:w-3/4">
                    {filteredKeys.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredKeys.map((game) => (
                                <div key={game.id} className={`flex flex-col sm:flex-row items-center py-4 px-6 rounded-lg ${styles.mainCard}`}>
                                    <Image className="rounded-md w-full sm:w-auto mb-4 sm:mb-0" src={game.picture} width={200} height={200} alt={game.name} />
                                    <div className="flex flex-col sm:flex-row flex-grow items-center justify-between pl-0 sm:pl-6 w-full">
                                        <div className="text-center sm:text-left mb-4 sm:mb-0">
                                            <h1 className={`text-white text-xl font-semibold`}>{game.name}</h1>
                                            <p className={`text-gray-400 mt-1`}>Дата выхода: {game.releaseData}</p>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-4 pt-5">
                                                    {game.applications.map(app => {
                                                        const iconSrc = applicationIcons[app];
                                                        return iconSrc ? <Image key={app} src={iconSrc} width={30} height={30} alt={`${app} Icon`} /> : null;
                                                    })}
                                                </div>

                                                <hr className={styles.separator} />

                                                <div className="flex items-center gap-4 pt-5">
                                                    {game.platforms.map(platform => {
                                                        const iconSrc = platformIcons[platform];
                                                        return iconSrc ? <Image key={platform} src={iconSrc} width={30} height={30} alt={`${platform} Icon`} /> : null;
                                                    })}
                                                </div>
                                            </div>

                                    </div>
                                    <div className="text-center sm:text-right">
                                        <h1 className={`text-white font-bold text-4xl mb-2 sm:mb-0`}>{game.price} ₽</h1>
                                        <button className={`text-black font-semibold p-2 mt-5 rounded-md ${styles.addButton}`}>Добавить в корзину</button>
                                    </div>
                                </div>
                                </div>
                                ))}
                        </div>
                    ) : (
                        <div className={`flex flex-col items-center justify-center p-10 rounded-lg ${styles.mainCard}`}>
                            <h2 className="text-2xl text-white font-bold">Ничего не найдено</h2>
                            <p className="text-gray-400 mt-2 text-center">Попробуйте изменить параметры фильтра или сбросить их.</p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}