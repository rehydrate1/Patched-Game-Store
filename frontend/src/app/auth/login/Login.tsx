"use client"

import styles from "./Login.module.scss";
import {FormEvent, useState} from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import MainInput from "@/components/UI/Inputs/MainInput/MainInput";
import Particles from "@/components/UI/Modern/Particles";



export default function Login(){

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const payload = {
        email: email,
        password: password,
        rememberMe: rememberMe,
    }

    interface LoginResponse {
        error?: string;
    }

    const isValidPassword = (password: string):boolean => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{8,25}$/;
        return passwordRegex.test(password);
    }

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    const handleSubmit = async (e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !password) {
            setError("Пожалуйста, заполните все поля.");
            return;
        }

        if (!isValidPassword(password)) {
            setError("Пароль должен содержать от 8 символов до 25 символов, включать латинские буквы, хотя бы одну заглавную букву и цифры.");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Введите корректный email.");
            return;
        }




        try {
            console.log([email, password, rememberMe]);

            const response = await fetch("http://localhost:8080/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            console.log("Sending payload:", JSON.stringify(payload));
            const data = (await response.json()) as LoginResponse;

            if (response.ok) {
                router.replace('/');
            } else {
                setError(data.error || "Ошибка авторизации.");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Ошибка соединения с сервером");
        }
    }





    return (
        <>

            <div className="relative min-h-screen overflow-hidden">

                <div className="absolute inset-0 z-0">
                    <Particles
                        particleColors={['#00FE92', '#ffffff']}
                        particleCount={300}
                        particleSpread={10}
                        speed={0.1}
                        particleBaseSize={200}
                        moveParticlesOnHover={true}
                        alphaParticles={false}
                        disableRotation={false}
                    />
                </div>

                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <div className={`w-full max-w-md p-8 space-y-6 rounded-lg shadow-md ${styles.main}`}>
                        <h2 className="text-2xl font-semibold text-center text-white">
                            Авторизация
                        </h2>
                        {error && (
                            <div className={`${styles.errorMessage}`}>
                                <p className={'text-l text-bold'}>{error}</p>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>

                            <MainInput
                                id={email}
                                type={'email'}
                                value={email}
                                onChange={setEmail}
                                label={'Email'}
                            />

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-white">
                                    Пароль
                                </label>
                                <div className="relative mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        className={`block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md 
                                        shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm mainInput `}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="w-4 h-4 cursor-pointer border-gray-300 rounded"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <label htmlFor="remember-me" className="block ml-2 cursor-pointer text-sm text-white">
                                        Запомнить меня
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="/auth/forgot-password" className={`font-medium text-white ${styles.links}`}>
                                        Забыли пароль?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent 
                                rounded-md shadow-sm text-m font-medium cursor-pointer text-black ${styles.submitButton}`}
                                >
                                    Войти
                                </button>
                            </div>
                        </form>

                        <div className="mt-4 text-sm text-white text-center">
                            Нет аккаунта? <Link href="/auth/registration" className={`font-medium text-indigo-600 hover:text-indigo-500 ${styles.links}`}>Зарегистрироваться</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
