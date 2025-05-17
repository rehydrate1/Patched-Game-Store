"use client";
import styles from "./ShopHeader.module.scss";
import {useState} from "react";
import Image from "next/image";

import {
    Bars4Icon,
    ShoppingCartIcon,

} from '@heroicons/react/24/outline';


export default function ShopHeader(){

    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');


    return (
        <>
            <div className={`${styles.main}`}>
                <div className="container mx-auto flex justify-between items-center">

                    <div className={`flex items-center gap-5 ${styles.catalogButton}`}>
                        <Image src={Bars4Icon} alt={'icon'} width={'10'} height={'10'}  />
                        <h1 className={`text-black`}>Каталог</h1>
                    </div>

                    <div className="">
                        <form action="">
                            <input
                            type="text"
                            id="search-input"
                            name="search-input"
                            className={``}
                            placeholder={'Поиск'}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </form>
                    </div>

                    <div className="">
                        <div className={`flex items-center gap-5 ${styles.cartButton}`}>
                            <Image src={ShoppingCartIcon} alt={'icon'} width={'10'} height={'10'}  />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}