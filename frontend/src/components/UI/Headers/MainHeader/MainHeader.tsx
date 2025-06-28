"use client";
import { useState } from "react";
import styles from "./MainHeader.module.scss";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function MainHeader() {
    const [isMenuOpen, setIsMenuOpen] =useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Функция, которая будет закрывать меню. Мы будем вызывать ее при клике на ссылку.
    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    return (
        <>
            <div className={`${styles.main} relative`}>
                <div className={`container mx-auto flex justify-between items-center text-white py-2.5`}>
                    <Link href={'/'}>
                        <div className={'p-3'}>
                            <h1 className='font-semibold text-2xl'>Patched</h1>
                        </div>
                    </Link>

                    <div className={'hidden md:block'}>
                        <ul className={'flex gap-20 items-center'}>
                            <li>
                                <Link href={'/shop'}>
                                    <div className={`flex text-center justify-center items-center p-1 rounded-md ${styles.navItem}`}>
                                        <h3 className={`p-1 px-2 `}>Магазин игр</h3>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/steam-balance'}>
                                    <div className={`flex text-center mx-auto items-center p-1 rounded-md ${styles.navItem}`}>
                                        <h3 className={`p-1 px-2`}>Пополнение Steam</h3>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/service-balance'}>
                                    <div className={`flex text-center items-center p-1 rounded-md ${styles.navItem}`}>
                                        <h3 className={`p-1 px-2`}>Пополнение сервисов</h3>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <Link href={'/auth/login'} className={`hidden md:flex p-2 px-8 rounded-md text-center items-center ${styles.authButton}`}>
                        <h1 className={`font-semibold text-m`}>Войти</h1>
                    </Link>

                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white p-2 focus:outline-none">
                            {isMenuOpen ? (
                                <XMarkIcon className="h-7 w-7" />
                            ) : (
                                <Bars3Icon className="h-7 w-7" />
                            )}
                        </button>
                    </div>
                </div>

                {/* --- ВЫПАДАЮЩЕЕ МОБИЛЬНОЕ МЕНЮ --- */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-[#212227] z-20 shadow-lg text-white">
                        <ul className="flex flex-col items-center gap-2 p-4"> {/* Уменьшил gap, увеличил padding */}
                            <li className="w-full">
                                <Link href={'/shop'} onClick={closeMenu}>
                                    <div className={`w-full text-center justify-center items-center p-3 rounded-md ${styles.navItem}`}>
                                        <h3 className={`text-lg`}>Магазин игр</h3>
                                    </div>
                                </Link>
                            </li>
                            <li className="w-full">
                                <Link href={'/steam-balance'} onClick={closeMenu}>
                                    <div className={`w-full text-center items-center p-3 rounded-md ${styles.navItem}`}>
                                        <h3 className={`text-lg`}>Пополнение Steam</h3>
                                    </div>
                                </Link>
                            </li>
                            <li className="w-full">
                                <Link href={'/service-balance'} onClick={closeMenu}>
                                    <div className={`w-full text-center items-center p-3 rounded-md ${styles.navItem}`}>
                                        <h3 className={`text-lg`}>Пополнение сервисов</h3>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                        <div className="p-4 border-t border-gray-700">
                            <Link href={'/auth/login'} onClick={closeMenu} className={`block w-full p-3 rounded-md text-center ${styles.authButton}`}>
                                <h3 className={`font-bold text-lg`}>Войти</h3>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}