"use client"

import styles from "./MainProductCard.module.scss";
import Link from "next/link";
import Image from "next/image";
import {addItem} from "@/store/slices/cartSlice";
import {useAppDispatch} from "@/lib/hooks/useTypedRedux";
import {applicationIcons, platformIcons} from "@/lib/data/indexData";
import type { ApplicationKey, PlatformKey } from "@/lib/data/indexData";

interface MainProductCardProps {
    id: number,
    name: string,
    price: string,
    picture: string,
    releaseData: string,
    platforms: PlatformKey[],
    applications: ApplicationKey[],
    genres: string[],
}

export default function MainProductCard({ id, name, price, picture, releaseData, platforms, applications, genres = [] }: MainProductCardProps) {

    const dispatch = useAppDispatch(); // Получаем функцию dispatch

    const handleAddToCart = () => {
        // Создаем объект товара (без quantity)
        const itemToAdd = { id, name, price, picture };
        // Отправляем action с данными товара
        dispatch(addItem(itemToAdd));
    };

    return (
        <div key={id} className={`flex flex-col md:flex-row items-center p-4 md:p-6 rounded-lg ${styles.mainCard} gap-4 md:gap-6`}>
            <Link href={`/shop/catalog/keys/${id}`} className="w-full md:w-48 lg:w-56 flex-shrink-0">
                <Image
                    className="rounded-md w-full object-cover aspect-video"
                    src={picture}
                    width={1920}
                    height={1080}
                    alt={name}
                />
            </Link>

            <div className="flex flex-col lg:flex-row flex-grow items-center justify-between w-full gap-4">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                    <Link href={`/shop/catalog/keys/${id}`}>
                        <h1 className="text-white text-lg md:text-xl font-semibold hover:text-green-400 transition-colors">
                            {name}
                        </h1>
                    </Link>
                    <p className="text-gray-400 mt-1 text-md">Дата выхода: {releaseData}</p>

                    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-4 gap-y-2 mt-3">

                        <div className="flex items-center gap-3">
                            {applications.map(app => {
                                const iconSrc = applicationIcons[app];
                                return iconSrc ? <Image key={app} src={iconSrc} width={23} height={23} alt={`${app} Icon`} title={app} /> : null;
                            })}
                        </div>

                        {applications.length > 0 && platforms.length > 0 && (
                            <div className="h-5 border-r border-gray-300"></div>
                        )}

                        <div className="flex items-center gap-2">
                            {platforms.map(platform => {
                                const iconSrc = platformIcons[platform];
                                return iconSrc ? <Image key={platform} src={iconSrc} width={23} height={23} alt={`${platform} Icon`} title={platform} /> : null;
                            })}
                        </div>

                        {genres.map(genre => (
                            <p key={genre} className="text-gray-300 text-sm bg-gray-700/50 px-2 py-1 rounded">
                                {genre}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center lg:items-end w-full lg:w-auto flex-shrink-0 mt-2 lg:mt-0">
                    <h2 className="text-white font-bold text-3xl md:text-4xl mb-5">
                        {price} ₽
                    </h2>

                    <button onClick={handleAddToCart} className={`w-full lg:w-auto myButtonColor text-black cursor-pointer font-semibold py-2 px-4 rounded-md ${styles.addButton}`}>
                        Добавить в корзину
                    </button>
                </div>
            </div>
        </div>
    );
}

