"use client";
import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Header() {



    return (
        <>
            <div className={`flex justify-around items-center text-white p-2 ${styles.main}`}>

                <Link href={'/'}>
                    <div className={'p-3'}>
                        <h1 className='text-bold text-2xl'>Patched</h1>
                    </div>
                </Link>


                <div className={''}>
                    <ul className={'flex gap-20 items-center'}>
                        <li><Link href={'/'} >
                            <div className={`flex text-center items-center p-1 px-3 ${styles.navItem}`}>
                                <Image src={'/header-shop.png'} alt={''} width={'30'} height={'30'} />
                                <h3 className={`pl-2`}>Магазин игр</h3>
                            </div></Link>
                        </li>
                        <li><Link href={'/'} >
                            <div className={`flex text-center items-center p-1 px-3 ${styles.navItem}`}>
                                <Image src={'/header-steam.png'} alt={''} width={'30'} height={'30'} />
                                <h3 className={`pl-2`}>Пополнение Steam</h3>
                            </div></Link>
                        </li>
                        <li><Link href={'/'}>
                            <div className={`flex text-center items-center p-1 px-3 ${styles.navItem}`}>
                                <Image src={'/header-reach.png'} alt={''} width={'30'} height={'30'} />
                                <h3 className={`pl-2`}>Пополнение сервисов</h3>
                            </div></Link>
                        </li>
                    </ul>
                </div>

                <Link href={'/auth/login'} className={`p-2 px-8 rounded-md text-center ${styles.authButton}`}>
                    <h3 className={``}>Войти</h3>
                </Link>

            </div>
        </>
    );
}