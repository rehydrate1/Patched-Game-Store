"use client"

import { useState } from "react";
import styles from "./MainHeader.module.scss";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import PCHeaderItem from "@/components/navItems/PCHeaderItem";
import MobileHeaderItem from "@/components/navItems/MobileHeaderItem";
import {headerNavItems} from "@/lib/data/indexData";

export default function MainHeader() {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={`${styles.main} relative`}>
            <div className={`container mx-auto flex justify-between items-center text-white py-2.5`}>
                <Link href={'/'}>
                    <div className={'p-3'}>
                        <h1 className='font-semibold text-2xl'>Patched</h1>
                    </div>
                </Link>

                <div className={'hidden md:block'}>
                    <ul className={'flex gap-20 items-center'}>
                        {headerNavItems.map((item) => (
                            <PCHeaderItem
                                key={item.link}
                                text={item.text}
                                link={item.link}
                            />
                        ))}
                    </ul>
                </div>


                <Link href={'/auth/login'} className={`hidden md:flex p-2 px-8 rounded-md text-center items-center myButtonColor `}>
                    <h3 className={`font-bold text-m`}>Войти</h3>
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
                    <ul className="flex flex-col items-center gap-2 p-4">
                        {headerNavItems.map((item) => (
                            <MobileHeaderItem
                                key={item.link}
                                text={item.text}
                                link={item.link}
                                functionName={toggleMenu}
                            />
                        ))}
                    </ul>
                    <div className="p-4 border-t mb-5  border-gray-700">
                        <Link href={'/auth/login'} onClick={toggleMenu} className={`block w-full mt-5 p-3 rounded-md text-center myButtonColor`}>
                            <h3 className={`font-bold text-lg`}>Войти</h3>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}