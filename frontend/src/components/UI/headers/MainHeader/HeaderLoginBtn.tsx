import Link from "next/link";
import {memo} from "react";

interface HeaderLoginBtnProps {
    isPcPlatform: boolean;
    toggleMenu: () => void;
}

function HeaderLoginBtn({isPcPlatform, toggleMenu}:HeaderLoginBtnProps) {

    return isPcPlatform ? (
        <Link href={'/auth/login'} className={`hidden md:flex p-2 px-8 rounded-md text-center items-center myButtonColor `}>
            <h3 className={`font-bold text-base`}>Войти</h3>
        </Link>
    ) : (
        <div className="p-4 border-t mb-5  border-gray-700">
            <Link
                href={'/auth/login'}
                onClick={toggleMenu}
                className={`block w-full mt-5 p-3 rounded-md text-center myButtonColor`}
            >
                <h3 className={`font-bold text-lg`}>Войти</h3>
            </Link>
        </div>
    )
}

export default memo(HeaderLoginBtn);