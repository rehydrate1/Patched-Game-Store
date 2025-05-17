"use client";
import styles from "./MainHeader.module.scss";
import Link from "next/link";



export default function MainHeader() {

    

    return (
        <>
            <div className={`${styles.main}`}>
                <div className={`container mx-auto flex justify-between items-center text-white p-2`}>

                    <Link href={'/frontend/public'}>
                        <div className={'p-3'}>
                            <h1 className='text-bold text-2xl'>Patched</h1>
                        </div>
                    </Link>


                    <div className={''}>
                        <ul className={'flex gap-20 items-center'}>
                            <li><Link href={'/frontend/public'} >
                                <div className={`flex text-center justify-center items-center p-1 rounded-md ${styles.navItem}`}>
                                    <h3 className={`p-1 px-2`}>Магазин игр</h3>
                                </div></Link>
                            </li>
                            <li><Link href={'/frontend/public'} >
                                <div className={`flex text-center mx-auto items-center p-1 rounded-md   ${styles.navItem}`}>
                                    <h3 className={`p-1 px-2`}>Пополнение Steam</h3>
                                </div></Link>
                            </li>
                            <li><Link href={'/frontend/public'}>
                                <div className={`flex text-center items-center p-1 rounded-md  ${styles.navItem}`}>
                                    <h3 className={`p-1 px-2`}>Пополнение сервисов</h3>
                                </div></Link>
                            </li>
                        </ul>
                    </div>

                    <Link href={'/auth/login'} className={`p-2 px-8 rounded-md text-center ${styles.authButton}`}>
                        <h3 className={`text-bold text-m`}>Войти</h3>
                    </Link>
                </div>
            </div>
        </>
    );
}