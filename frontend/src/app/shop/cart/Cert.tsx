"use client";

import { useAppSelector, useAppDispatch } from '@/hooks/useTypedRedux';
import { removeItem, clearCart } from '@/store/slices/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { TrashIcon, XCircleIcon } from '@heroicons/react/24/outline';
import styles from './cart.module.scss';

export default function Cart() {
    const dispatch = useAppDispatch();
    const { items: cartItems } = useAppSelector(state => state.cart);

    // Рассчитываем общую стоимость
    const totalPrice = cartItems.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
        return total + price * item.quantity;
    }, 0).toFixed(2); // toFixed(2) для копеек

    const handleRemoveItem = (id: number) => {
        dispatch(removeItem(id));
    };

    const handleClearCart = () => {
        if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
            dispatch(clearCart());
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto text-center py-20 px-4">
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
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-extrabold text-white mb-8">Ваша корзина</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Список товаров */}
                <div className="lg:w-2/3">
                    <ul role="list" className="divide-y divide-gray-700">
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex py-6">
                                <div className="h-35 w-70 flex-shrink-0 overflow-hidden rounded-md border border-gray-700">
                                    <Image
                                        src={item.picture}
                                        alt={item.name}
                                        width={1920}
                                        height={1080}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-white">
                                            <h3>
                                                <Link href={`/shop/catalog/keys/${item.id}`}>{item.name}</Link>
                                            </h3>
                                            <p className="ml-4">{parseFloat(item.price).toFixed(2)} ₽</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-400">Кол-во: {item.quantity}</p>
                                        <div className="flex">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="font-medium text-red-500 hover:text-red-400 flex items-center gap-1"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {cartItems.length > 0 && (
                        <div className="mt-6">
                            <button onClick={handleClearCart} className={styles.clearButton}>
                                Очистить корзину
                            </button>
                        </div>
                    )}
                </div>

                {/* Итоги заказа */}
                <aside className={`lg:w-1/3 p-6 rounded-lg h-fit ${styles.summaryCard}`}>
                    <h2 className="text-lg font-medium text-white border-b border-gray-700 pb-4">Итоги заказа</h2>
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