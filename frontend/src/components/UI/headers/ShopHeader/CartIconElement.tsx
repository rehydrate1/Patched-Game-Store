import {memo} from "react";
import Link from "next/link";
import {ShoppingCartIcon} from "@heroicons/react/24/outline";
import {useCartStore} from "@/lib/store/cartStore";


function CartIconElement() {

    const totalItems = useCartStore(s => s.getCartCount())

    return (
        <div className="flex-shrink-0 flex items-center justify-center">

            <Link href="/shop/cart" className="relative">
                <div className={`p-2 shopHeaderCertButton rounded-md`}>
                    <ShoppingCartIcon className="h-7 w-7 md:h-8 md:w-8 text-gray-100" aria-hidden="true" />
                </div>

                {/* УСЛОВНЫЙ РЕНДЕРИНГ КРУЖКА-СЧЕТЧИКА */}
                {totalItems > 0 && (
                    <span
                        key={totalItems} // key заставит React перерендерить элемент и запустить анимацию
                        className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold 
                        rounded-full h-5 w-5 flex items-center justify-center animate-bounce-short`}
                    >
                        {totalItems > 99 ? '99+' : totalItems}
                    </span>
                )}
            </Link>
        </div>
    )
}

export default memo(CartIconElement);