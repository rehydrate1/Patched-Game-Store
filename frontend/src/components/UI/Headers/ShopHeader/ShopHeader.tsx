"use client";
import styles from "./ShopHeader.module.scss";
import Link from "next/link";
import {useState, useRef, useEffect} from "react";

import {
    Bars3Icon,
    ShoppingCartIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';


const catalogElements = [
    { href: '/shop/keys', text: 'Ключи' },
    { href: '/shop/accounts', text: 'Аккаунты' },
    { href: '/shop/gifts', text: 'Гифты' },
];

export default function ShopHeader() {

    const [isOpenCatalog, setIsOpenCatalog] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    const catalogButtonRef = useRef<HTMLDivElement>(null);
    const catalogDropdownRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                isOpenCatalog &&
                catalogButtonRef.current &&
                !catalogButtonRef.current.contains(event.target as Node) &&
                catalogDropdownRef.current &&
                !catalogDropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpenCatalog(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpenCatalog]);




    return (
        <>
            <div className={`${styles.main} pt-3 pb-5`}>
                <div className="container mx-auto flex items-center justify-between">


                    <div className="flex-shrink-0 relative" ref={catalogButtonRef}>
                        <div
                            className={`flex justify-center items-center p-3 px-4 ml-4 rounded-md ${styles.catalogButton} cursor-pointer`} // Добавляем cursor-pointer
                            onClick={() => setIsOpenCatalog(!isOpenCatalog)}
                        >
                            <Bars3Icon className={'h-6 w-6 text-black'} />
                            <h2 className={`font-bold text-x pl-2`}>Каталог</h2>
                        </div>

                        {isOpenCatalog && (
                            <div
                                ref={catalogDropdownRef}
                                className={`absolute top-full left-4 mt-2 w-64 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 ${styles.catalogList}`}
                            >
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    {catalogElements.map((element) => {
                                        return (
                                            <Link
                                                href={element.href}
                                                className={`block px-4 py-2 text-sm ${styles.catalogElement}`}
                                                role="menuitem"
                                                onClick={() => setIsOpenCatalog(false)}
                                            >
                                                {element.text}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>


                    <div className="flex-grow mx-4">
                        <form action="#" method="GET" className="w-full">
                            <label htmlFor="search" className="sr-only">Поиск</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    id="search"
                                    name="search"
                                    className={`block w-full  pr-3 pl-10 py-2 border rounded-md
                                    leading-8  placeholder-white focus:outline-none  
                                    sm:text-sm ${styles.searchInput}`}
                                    placeholder="Поиск товаров..."
                                    type="search"
                                    value = {search}
                                    onChange={(e) => {setSearch(e.target.value)}}
                                />
                            </div>
                        </form>
                    </div>


                    <div className="flex-shrink-0 flex items-center justify-center">
                        <Link href="/shop">
                            <div className={`p-2 mx-1 ${styles.shopButton} mr-2 rounded-md`}>
                                <ShoppingCartIcon className="h-8 w-8 text-gray-100" aria-hidden="true" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}