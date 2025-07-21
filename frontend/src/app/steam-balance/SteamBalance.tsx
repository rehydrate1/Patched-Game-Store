"use client"

import styles from './SteamBalance.module.scss';

import {
    CheckIcon
} from '@heroicons/react/24/outline';

import { useState, useEffect } from "react";
import SteamInput from "@/components/UI/Inputs/SteamInput/SteamInput";
import SteamFAQ from "@/components/FAQ/SteamFAQ";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function SteamBalance() {

    const [steamLogin, setSteamLogin] = useState<string>('');
    const [balance, setBalance] = useState<string>('500');
    const [promoCode, setPromoCode] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [commission, setCommission] = useState<number>(0);
    const [endPrice, setEndPrice] = useState<number>(0);
    const router = useRouter();


    interface BackEndResponse {
        error?: string;
    }

    useEffect(() => {
        const balanceNumber = parseFloat(balance) || 0;
        const newCommission = balanceNumber / 10;
        const newEndPrice = balanceNumber + newCommission;

        setCommission(newCommission);
        setEndPrice(newEndPrice);
    }, [balance]);



    const validateSteamLogin = (steamLogin:string): string | null => {
        if (!steamLogin.trim()) {
            return `Пожалуйста, введите логин от Steam аккаунта`;
        }

        const nameCheckRegex = /^[a-zA-Z0-9_]+$/;
        if(!nameCheckRegex.test(steamLogin)) {
            return (`Логин может содержать только латинские буквы, цифры и нижнее подчёркивание`)
        }

        if (steamLogin.length < 3 || steamLogin.length > 35) {
            return (`Длинна логина может содержать от 3 до 35 символов (сейчас ${steamLogin.length})`)
        }

        return null;
    }

    const validateSteamBalance = (steamBalance:string): string | null => {
        if (!steamBalance.trim()) {
            return `Пожалуйста, введите желаемую сумму пополнения аккаунта`;
        }

        const balanceCheckRegex = /^[0-9]+$/;
        if(!balanceCheckRegex.test(steamBalance)) {
            return (`Сумма пополнения должна содержать только цифры`)
        }


        if (Number(steamBalance) < 100 ) {
            return (`Минимальная сумма пополнения 100`)
        }

        if (Number(steamBalance) > 100000) {
            return (`Максимальная сумма пополнения 100.000`)
        }

        return null;
    }

    const validatePromoCode = (promoCode:string): string | null => {
        const promoCodeCheckRegex = /^[a-zA-Z0-9]*$/;
        if(!promoCodeCheckRegex.test(promoCode)) {
            return (`Промокод может содержать только латинские буквы и цифры`)
        }

        if( !(promoCode == '') ){
            if (promoCode.length < 3 || promoCode.length > 35) {
                return (`Промокод может содержать от 3 до 35 символов (сейчас ${promoCode.length})`)
            }
        }
        return null;
    }


    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        const steamLoginError:string | null = validateSteamLogin(steamLogin);
        if (steamLoginError) {
            newErrors.steamLogin = steamLoginError;
        }

        const steamBalanceError:string | null = validateSteamBalance(balance);
        if (steamBalanceError) {
            newErrors.balance = steamBalanceError;
        }

        const promoCodeError:string | null = validatePromoCode(promoCode);
        if (promoCodeError) {
            newErrors.promoCode = promoCodeError;
        }

        return newErrors;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({});

        const formErrors = validateForm();

        // Если есть хотя бы одна ошибка, обновляем состояние и прерываем выполнение
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const peyload = {
            steamLogin,
            balance,
            promoCode,
        }

        try {
            const response = await fetch("http://localhost:8082/api/create/key", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            console.log('Валидация пройдена, пошла отправка на бек');
            const data = (await response.json()) as BackEndResponse;

            if (response.ok) {
                router.push('/steam-balance/success');
            } else {
                setErrors({ form: data.error || "Ошибка пополнения" });
            }
        } catch (err) {
            setErrors({ form: "Ошибка соединения с сервером" });
        }

    }

    return (
        <>
            <div className="text-white min-h-screen w-full p-4 sm:p-8 lg:p-12">
                <div className="w-full max-w-screen-2xl pt-8 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">

                    <SteamFAQ />

                    {/* === ЦЕНТРАЛЬНАЯ КОЛОНКА: ФОРМА ПОПОЛНЕНИЯ === */}
                    <div className={`bg-[#212227] p-6 sm:p-8 rounded-xl w-full border border-white/10 lg:col-span-1`}>
                        <div className="text-center pb-5">
                            <h1 className="text-3xl font-bold text-white mb-2">
                                Пополнение Steam
                            </h1>
                            <p className="text-gray-400 mb-8">
                                Моментальное зачисление
                            </p>
                        </div>

                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div className="relative">
                                <SteamInput
                                    id={'steam_login'}
                                    placeholder={'Логин Steam'}
                                    value={steamLogin}
                                    onChange={setSteamLogin}
                                    label={'Логин Steam'}
                                    error={errors.steamLogin}
                                />
                            </div>
                            <div className="relative">
                                <SteamInput
                                    id={'amount'}
                                    placeholder={'Сумма пополнения (₽)'}
                                    value={balance}
                                    onChange={setBalance}
                                    label={'Сумма пополнения (₽)'}
                                    error={errors.balance}
                                />
                            </div>
                            <div className="relative">
                                <SteamInput
                                    id={'promoCode'}
                                    placeholder={'Промокод'}
                                    value={promoCode}
                                    onChange={setPromoCode}
                                    label={'Промокод'}
                                    error={errors.promoCode}
                                />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                                {['500', '1000', '2500', '5000'].map(amount => (
                                    <button
                                        key={amount}
                                        type="button"
                                        onClick={() => setBalance(amount)}
                                        className="bg-gray-700 text-white font-medium p-2.5 rounded-lg
                                    border border-transparent hover:bg-gray-600 hover:border-[#aeb2ae]
                                    hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400
                                    focus:ring-opacity-50 transition-all duration-300"
                                    >
                                        {amount} ₽
                                    </button>
                                ))}
                            </div>
                            <div className="border-t border-gray-700 pt-5 space-y-2 text-white">
                                <div className="flex justify-between items-center"><span className="text-gray-400">Комиссия сервиса:</span><span className="font-medium text-green-400">{commission} ₽</span></div>
                                <div className="flex justify-between items-center text-xl"><span className="font-bold">К оплате:</span><span className="font-bold text-green-400">{endPrice} ₽ </span></div>
                            </div>
                            <button type="submit"  className={`myButtonColor w-full py-3 text-base font-bold text-white bg-purple-500 rounded-lg transition-all duration-300 relative overflow-hidden`}>
                                Перейти к оплате
                            </button>
                        </form>
                    </div>

                    {/* === ПРАВАЯ КОЛОНКА: ПРЕИМУЩЕСТВА И БАННЕР === */}
                    <div className="space-y-8 lg:col-span-1">
                        <div className="bg-[#212227] p-6 rounded-xl border border-white/10">
                            <h3 className="text-xl font-bold mb-4">Почему выбирают Patched?</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-center gap-3"><CheckIcon className={`text-green-400 h-6 w-6 font-bold`}/> Моментальное пополнение</li>
                                <li className="flex items-center gap-3"><CheckIcon className={`text-green-400 h-6 w-6 font-bold`}/> Гарантия безопасности платежа</li>
                                <li className="flex items-center gap-3"><CheckIcon className={`text-green-400 h-6 w-6 font-bold`}/> Отзывчивая поддержка</li>
                                <li className="flex items-center gap-3"><CheckIcon className={`text-green-400 h-6 w-6 font-bold`}/>Регулярные акции и скидки</li>
                            </ul>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-green-800 p-6 rounded-xl  text-center flex flex-col items-center">
                            <h3 className="text-2xl font-bold mb-2">Новые игры уже в Patched!</h3>
                            <p className="font-bold mb-4 max-w-xs">Покупайте ключи для Steam, Epic Games и других платформ по лучшим ценам.</p>
                            <Link href="/shop/catalog/keys" className="bg-white text-black font-bold py-2 px-6 rounded-lg transition-transform hover:scale-105">
                                Перейти в магазин
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </>

    );
}