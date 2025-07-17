"use client"

import styles from './SteamBalance.module.scss';
import { useState, useEffect } from "react";

export default function SteamBalance() {

    const [steamLogin, setSteamLogin] = useState<string>('');
    const [balance, setBalance] = useState<string>('500');
    const [promoCode, setPromoCode] = useState<string>('');
    const [error, setError] = useState<string | null>('');
    const [commission, setCommission] = useState<number>(0);
    const [endPrice, setEndPrice] = useState<number>(0);


    // ХУК useEffect ДЛЯ КОРРЕКТНОГО РАСЧЕТА
    // Он автоматически запускается при каждом изменении `balance`
    useEffect(() => {
        const balanceNumber = parseFloat(balance) || 0;
        const newCommission = balanceNumber / 10;
        const newEndPrice = balanceNumber + newCommission;

        setCommission(newCommission);
        setEndPrice(newEndPrice);
    }, [balance]); // Зависимость от `balance`


    return (
        <div className=" text-white min-h-screen flex items-center justify-center p-6">
            <div className={`${styles.steamCard} bg-[#212227] p-6 sm:p-8 rounded-xl w-full max-w-lg border border-white/10`}>
                <div className="text-center pb-5">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Пополнение баланса Steam
                    </h1>
                    <p className="text-gray-400 mb-8">
                        Моментальное зачисление на ваш аккаунт
                    </p>
                </div>

                <form className="space-y-8 ">
                    <div className="relative">
                        <input
                            type="text"
                            id="steam_login"
                            className="peer w-full bg-transparent pt-3 pb-2 px-1 border-b-2 border-gray-600
                            outline-none transition-colors"
                            placeholder="Логин Steam"
                            value={steamLogin}
                            onChange={e => setSteamLogin(e.target.value)}
                        />
                        <label
                            htmlFor="steam_login"
                            className="absolute left-1 top-3 text-gray-400 transition-all pointer-events-none
                                       peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                                       peer-focus:-top-3.5 peer-focus:text-green-400 peer-focus:text-sm
                                       peer-[&:not(:placeholder-shown)]:-top-3.5 peer-[&:not(:placeholder-shown)]:text-green-400 peer-[&:not(:placeholder-shown)]:text-sm"
                        >
                            Логин Steam
                        </label>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            id="amount"
                            placeholder="Сумма пополнения (₽)"
                            className="peer w-full bg-transparent pt-3 pb-2 px-1 border-b-2 border-gray-600
                            outline-none transition-colors"
                            value={balance}
                            onChange={e => setBalance(e.target.value)}
                        />
                        <label
                            htmlFor="amount"
                            className="absolute left-1 top-3 text-gray-400 transition-all pointer-events-none
                                       peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                                       peer-focus:-top-3.5 peer-focus:text-green-400 peer-focus:text-sm
                                       peer-[&:not(:placeholder-shown)]:-top-3.5 peer-[&:not(:placeholder-shown)]:text-green-400 peer-[&:not(:placeholder-shown)]:text-sm"
                        >
                            Сумма пополнения (₽)
                        </label>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            id="promoCode"
                            className="peer w-full bg-transparent pt-3 pb-2 px-1 border-b-2 border-gray-600
                            outline-none transition-colors"
                            value={promoCode}
                            placeholder="Промокод"
                            onChange={e => setPromoCode(e.target.value)}
                        />
                        <label
                            htmlFor="promoCode"
                            className="absolute left-1 top-3 text-gray-400 transition-all pointer-events-none
                                       peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                                       peer-focus:-top-3.5 peer-focus:text-green-400 peer-focus:text-sm
                                       peer-[&:not(:placeholder-shown)]:-top-3.5 peer-[&:not(:placeholder-shown)]:text-green-400 peer-[&:not(:placeholder-shown)]:text-sm"
                        >
                            Промокод
                        </label>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                        {['500', '1000', '2500', '5000'].map(amount => (
                            <button
                                key={amount}
                                type="button"
                                onClick={() => setBalance(amount)}
                                className="bg-gray-700 text-white font-medium p-2.5 rounded-lg border border-transparent
                                           hover:bg-gray-600 hover:border-[#aeb2ae] hover:text-green-400
                                           focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50
                                           transition-all duration-300"
                            >
                                {amount} ₽
                            </button>
                        ))}
                    </div>

                    <div className="border-t border-gray-700 pt-5 space-y-2 text-white">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Комиссия сервиса:</span>
                            <span className="font-medium text-green-400">{commission} ₽</span>
                        </div>
                        <div className="flex justify-between items-center text-xl">
                            <span className="font-bold">К оплате:</span>
                            <span className="font-bold text-green-400">{endPrice} ₽ </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`myButtonColor w-full py-3 text-base font-bold text-white bg-purple-500 rounded-lg transition-all duration-300 relative overflow-hidden`}
                    >
                        Перейти к оплате
                    </button>
                </form>
            </div>
        </div>
    );
}