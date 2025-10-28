"use client";

import styles from "./KeysCatalog.module.scss";
import { useState, useEffect, useMemo } from 'react';
import {useRouter} from "next/navigation";
import MainProductCard from "@/components/productCards/MainProductCard/MainProductCard";
import {keysCatalogDataItems} from "@/lib/data/keysCatalogData";


export default function KeysCatalog() {

    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
    const [filteredKeys, setFilteredKeys] = useState(keysCatalogDataItems);
    const router = useRouter();

    const allPlatforms = useMemo(() => {
        const platformsSet = new Set<string>();
        keysCatalogDataItems.forEach(game => game.platforms.forEach(p => platformsSet.add(p)));
        return Array.from(platformsSet).sort();
    }, [keysCatalogDataItems]);

    const allGenres = useMemo(() => {
        const genresSet = new Set<string>();
        keysCatalogDataItems.forEach(game => game.genres.forEach(g => genresSet.add(g)));
        return Array.from(genresSet).sort();
    }, [keysCatalogDataItems]);

    const allApplications = useMemo(() => {
        const applicationsSet = new Set<string>();
        keysCatalogDataItems.forEach(game => game.applications.forEach(app => applicationsSet.add(app)));
        return Array.from(applicationsSet).sort();
    }, [keysCatalogDataItems]);

    useEffect(() => {
        let tempKeys = [...keysCatalogDataItems];


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

    }, [priceFrom, priceTo, selectedPlatforms, selectedGenres, selectedApplications, keysCatalogDataItems]);

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

    const addNewKeyPage = () => {
        router.push('/shop/catalog/keys/new');
    };

    return (
        <>
            <div className="flex flex-col md:flex-row container mx-auto my-10 gap-8">

                <aside className={`text-white p-6 rounded-lg w-full md:w-1/4 ${styles.mainAside} h-fit`}>
                    <h2 className="text-2xl font-bold mb-6">Фильтры</h2>

                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Цена, ₽</h3>
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
                        <h3 className="font-semibold mb-2">Платформы</h3>
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
                        <h3 className="font-semibold mb-2">Активация в</h3>
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
                        <h3 className="font-semibold mb-2">Жанры</h3>
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
                        <button onClick={resetFilters} className={`text-black myButtonColor cursor-pointer w-full font-semibold p-2 rounded-md `}>
                            Сбросить фильтры
                        </button>
                    </div>

                    <div className="mt-4">
                        <button onClick={addNewKeyPage} className={`text-black cursor-pointer w-full font-semibold p-2 rounded-md myButtonColor `}>
                            Добавить новый ключ
                        </button>
                    </div>
                </aside>

                <main className="w-full md:w-3/4">
                    {filteredKeys.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredKeys.map((game) => (
                                <MainProductCard
                                    key={game.id}
                                    id={game.id}
                                    name={game.name}
                                    price={game.price}
                                    picture={game.picture}
                                    releaseData={game.releaseData}
                                    platforms={game.platforms}
                                    applications={game.applications}
                                    genres={game.genres}
                                />
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