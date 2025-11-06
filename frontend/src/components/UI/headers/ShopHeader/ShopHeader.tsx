"use client"

import styles from "./ShopHeader.module.scss";
import Link from "next/link";
import {useState} from "react";

import {
    Bars3Icon,
    ShoppingCartIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import {useCartStore} from "@/lib/store/cartStore";

export default function ShopHeader() {

    const [search, setSearch] = useState<string>('');
    const totalItems = useCartStore(s => s.getCartCount())

    return (
        <div className={`mainColor pt-3 pb-6`}>
            <div className="container mx-auto  flex items-center justify-between px-2 gap-2 md:px-0 md:gap-4">

                <div className="flex-shrink-0 relative">
                    <div
                        className={`flex justify-center items-center p-3 md:px-4 md:py-3 rounded-md
                         myButtonColor cursor-pointer`}
                    >
                        <Bars3Icon className={'h-6 w-6 text-black'} />
                        <h2 className={`hidden md:block font-bold text-x pl-2`}>Каталог</h2>
                    </div>
                </div>

                <div className="flex-grow">
                    <form action="#" method="GET" className="w-full">
                        <label htmlFor="search" className="sr-only">Поиск</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="search"
                                name="search"
                                className={`block w-full pr-3 pl-10 py-2 border rounded-md leading-8 placeholder-white focus:outline-none sm:text-sm ${styles.searchInput}`}
                                placeholder="Поиск..."
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </form>
                </div>

                <div className="flex-shrink-0 flex items-center justify-center">

                    <Link href="/shop/cart" className="relative">
                        <div className={`p-2 ${styles.shopButton} rounded-md`}>
                            <ShoppingCartIcon className="h-7 w-7 md:h-8 md:w-8 text-gray-100" aria-hidden="true" />
                        </div>

                        {/* УСЛОВНЫЙ РЕНДЕРИНГ КРУЖКА-СЧЕТЧИКА */}
                        {totalItems > 0 && (
                            <span
                                key={totalItems} // key заставит React перерендерить элемент и запустить анимацию
                                className={`
                                        absolute -top-1 -right-1 
                                        bg-red-500 text-white text-xs font-bold 
                                        rounded-full h-5 w-5 flex items-center justify-center
                                        animate-bounce-short // Добавляем кастомную анимацию
                                    `}
                            >
                                    {totalItems > 99 ? '99+' : totalItems}
                                </span>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
}