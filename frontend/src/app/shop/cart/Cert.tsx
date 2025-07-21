"use client";

import { useAppSelector, useAppDispatch } from '@/hooks/useTypedRedux';
import { removeItem, clearCart } from '@/store/slices/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import styles from './cart.module.scss';

export default function Cart() {
    const dispatch = useAppDispatch();
    const { items: cartItems } = useAppSelector(state => state.cart);

    // Расчеты и хендлеры остаются без изменений
    const totalPrice = cartItems.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
        return total + price * item.quantity;
    }, 0).toFixed(2);

    const handleRemoveItem = (id: number) => {
        dispatch(removeItem(id));
    };

    const handleClearCart = () => {
        if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
            dispatch(clearCart());
        }
    };

    // Блок для пустой корзины остается без изменений, он уже адаптивен
    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto text-center py-40 px-4">
                <XCircleIcon className="mx-auto h-24 w-24 text-gray-400" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Корзина пуста</h1>
                <p className="mt-6 text-base leading-7 text-gray-400">Похоже, вы еще не добавили ни одного товара.</p>
                <div className="mt-10">
                    <Link href="/shop/catalog/keys" className={styles.primaryButton}>
                        Перейти в каталог
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 md:py-12 px-4">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-6 md:mb-8">Ваша корзина</h1>

            <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
                {/* Список товаров */}
                <div className="lg:w-2/3">
                    <ul role="list" className="space-y-4 md:space-y-5">
                        {cartItems.map((item) => (
                            <li key={item.id} className={`flex flex-col sm:flex-row p-4 md:p-6 rounded-md ${styles.mainCard}`}>

                                {/* Изображение */}
                                <div className="w-full sm:w-48 md:w-56 flex-shrink-0 self-center">
                                    <div className="aspect-video overflow-hidden rounded-md border border-gray-700">
                                        <Image
                                            src={item.picture}
                                            alt={item.name}
                                            width={1920}
                                            height={1080}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Контент справа от картинки */}
                                <div className="mt-4 sm:mt-0 sm:ml-4 md:ml-6 flex flex-1 flex-col">
                                    {/* Верхняя часть: название и кнопка удаления */}
                                    <div className="flex justify-between items-start text-base font-medium text-white">
                                        <h2 className="text-lg md:text-xl font-semibold pr-4">
                                            <Link href={`/shop/catalog/keys/${item.id}`} className="hover:text-green-400 transition-colors">
                                                {item.name}
                                            </Link>
                                        </h2>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveItem(item.id)}
                                            className={`p-1.5 rounded-md flex-shrink-0 ${styles.removeButton}`}
                                            title="Удалить товар"
                                        >
                                            <XMarkIcon className="h-5 w-5 md:h-6 md:w-6" />
                                        </button>
                                    </div>

                                    {/* Нижняя часть: цена и количество */}
                                    <div className="flex flex-1 items-end justify-between mt-4">
                                        <p className="text-white font-semibold text-xl md:text-2xl">
                                            {parseFloat(item.price).toFixed(2)} ₽
                                        </p>
                                        <p className="text-gray-400 text-sm md:text-base">Кол-во: {item.quantity}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Итоги заказа */}
                <aside className={`lg:w-1/3 p-6 rounded-lg h-fit ${styles.summaryCard}`}>
                    <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                        <h2 className="text-lg font-medium text-white">Итоги заказа</h2>
                        {cartItems.length > 0 && (
                            <button onClick={handleClearCart} className={`py-1 px-2 text-sm text-gray-300 hover:text-white rounded-lg ${styles.clearButton}`}>
                                Очистить
                            </button>
                        )}
                    </div>
                    {/* Блок с расчетами остается без изменений, он уже адаптивен */}
                    <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-300">Товаров ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} шт.)</p>
                            <p className="text-sm font-medium text-white">{totalPrice} ₽</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-300">Скидка</p>
                            <p className="text-sm font-medium text-green-400">- 0.00 ₽</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                            <p className="text-base font-medium text-white">Итого к оплате</p>
                            <p className="text-base font-medium text-white">{totalPrice} ₽</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button className={`${styles.primaryButton} w-full`}>
                            Перейти к оформлению
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}