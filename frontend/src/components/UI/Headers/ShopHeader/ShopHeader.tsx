"use client";
import styles from "./ShopHeader.module.scss";
import Link from "next/link";
import {useState} from "react";

import {
    Bars3Icon,
    ShoppingCartIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';


export default function ShopHeader() {

    const [isOpenCatalog, setIsOpenCatalog] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    return (
        <>
            <div className={`${styles.main} pt-3 pb-5`}>
                <div className="container mx-auto flex items-center justify-between">


                    <div className="flex-shrink-0">
                        <div className={`flex justify-center items-center p-2 px-4 ml-5 rounded-md ${styles.catalogButton}`}>
                            <Bars3Icon className={'h-8 w-8 text-black'} />
                            <h2 className={`font-semibold text-xl pl-3`}>Каталог</h2>
                        </div>
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