"use client"
import styles from "./Registration.module.scss";
import {FormEvent, useState} from "react";
import { useRouter } from 'next/navigation';
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import Link from "next/link";


export default function Login(){

    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const payload = {
        userName: userName,
        email: email,
        password: password,
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

        if (!email.trim() || !userName.trim() || !password ) {
            setError("Пожалуйста, заполните все поля.");
            return;
        }

        if (!userName.trim() || !email.trim() || !password || !confirmPassword) {
            setError("Пожалуйста, заполните все поля.");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Введите корректный email.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Пароли не совпадают!");
            return;
        }

        if (!isValidPassword(password)) {
            setError("Пароль должен содержать от 8 символов до 25 символов, включать латинские буквы, хотя бы одну заглавную букву и цифры.");
            return;
        }


        if (userName.length < 2 || userName.length > 25) {
            setError("Имя пользователя должно содержать от 2 до 25 символов.");
            return;
        }

        if (userName !== userName.toLowerCase()) {
            setError("Имя пользователя должно содержать только строчные буквы.");
            return;
        }

        if (!/[a-z]/.test(userName)) {
            setError("Имя пользователя должно содержать хотя бы одну букву.");
            return;
        }




        try {
            console.log([userName, email, password, confirmPassword]);

            const response = await fetch("http://localhost:8080/api/user/registration", {
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
                setError(data.error || "Ошибка регистрации.");
            }
        } catch (err) {
            setError("Ошибка соединения с сервером");
        }
    }





    return (
        <>
            <div className={`flex items-center justify-center min-h-screen`}>

                <div className={`w-full max-w-md p-8 space-y-6 rounded-lg shadow-md ${styles.main}`}>
                    <h2 className="text-2xl font-semibold text-center text-white">
                        Регистрация
                    </h2>
                    {error && (
                        <div className={`${styles.errorMessage}`}>
                            <p className={'text-l text-bold'}>{error}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium text-white">
                                Имя пользователя
                            </label>
                            <input
                                id="userName"
                                name="userName"
                                type="text"
                                autoComplete="userName"
                                required
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${styles.inputField}`}
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                autoComplete="email"
                                required
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${styles.inputField}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

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
                                    className={`block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm ${styles.inputField}`}
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

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                                Повторите пароль
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="confirmPassword"
                                required
                                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${styles.inputField}`}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>



                        <div>
                            <button
                                type="submit"
                                className={`w-full flex justify-center py-2 px-4 border border-transparent 
                                rounded-md shadow-sm text-m font-medium text-black ${styles.submitButton}`}
                            >
                                Зарегистрироваться
                            </button>
                        </div>
                    </form>

                    <div className="mt-4 text-sm text-white text-center">
                        Уже есть аккаунт? <Link href="/auth/login" className={`font-medium text-indigo-600 hover:text-indigo-500 ${styles.links}`}>Авторизоваться</Link>
                    </div>
                </div>

            </div>
        </>
    );
}
