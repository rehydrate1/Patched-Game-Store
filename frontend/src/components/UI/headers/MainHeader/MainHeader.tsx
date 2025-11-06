"use client"

import {useCallback, memo, useState} from "react";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import PCHeaderItem from "@/components/navItems/PCHeaderItem";
import MobileHeaderItem from "@/components/navItems/MobileHeaderItem";
import {headerNavItems} from "@/lib/data/indexData";
import HeaderLoginBtn from "@/components/UI/headers/MainHeader/HeaderLoginBtn";
import MainHeaderLogo from "@/components/UI/headers/MainHeader/MainHeaderLogo";

function MainHeader() {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(!isMenuOpen);
    }, []);

    return (
        <div className={`mainColor relative`}>
            <div className={`container mx-auto flex justify-between items-center text-white py-2.5`}>

                <MainHeaderLogo />

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

                <HeaderLoginBtn
                    isPcPlatform={true}
                    toggleMenu={toggleMenu}
                />

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
                    <HeaderLoginBtn
                        isPcPlatform={false}
                        toggleMenu={toggleMenu}
                    />
                </div>
            )}
        </div>
    );
}

export default memo(MainHeader)