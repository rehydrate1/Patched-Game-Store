"use client"

import styles from "./Login.module.scss";
import {FormEvent, useState} from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import MainInput from "@/components/UI/Inputs/MainInput/MainInput";
import Particles from "@/components/UI/Modern/Particles";
import {BackEndResponse} from "@/types/mainTypes";
import HideInput from "@/components/UI/Inputs/HideInput/HideInput";



export default function Login(){

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const router = useRouter();



    const validateEmail = (email: string): string | null => {
        if (!email.trim()){
            return ('Пожалуйста, введите ваш email');
        }

        return null;
    };

    const validatePassword = (password: string):string | null => {
       if (!password.trim()){
           return ('Пожалуйста, введите ваш пароль');
       }

        if (password.length < 8)  {
            return (`Пароль должен содержать минимум 8 символов (сейчас ${password.length})`);
        }

        if (password.length > 25){
            return (`Пароль может быть максимум 25 символов (сейчас ${password.length})`);
        }

        const passwordRegex = /^[a-zA-Z0-9!@#$%^&*.]$/;
        if(!passwordRegex.test(password)) {
            return ('Пароль может содержать только латинские буквы, цифры и некоторые спец.символы')
        }
        return null;
    }


    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        const validateEmailErrors:string | null = validateEmail(email);
        if (validateEmailErrors) {
            newErrors.email = validateEmailErrors;
        }

        const validatePasswordErrors:string | null = validatePassword(password);
        if (validatePasswordErrors) {
            newErrors.password = validatePasswordErrors;
        }

        return newErrors;
    }




    const handleSubmit = async (e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();
        setErrors({});


        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const payload = {
            email: email,
            password: password,
            rememberMe: rememberMe,
        }

        try {
            const response = await fetch("http://localhost:8080/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            console.log("Sending payload:", JSON.stringify(payload));
            const data = (await response.json()) as BackEndResponse;

            if (response.ok) {
                router.replace('/');
            } else {
                setErrors({ form: data.error || "Ошибка авторизации" });
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setErrors({ form: "Ошибка соединения с сервером" });
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
                        <form className="space-y-6" onSubmit={handleSubmit}>

                            <MainInput
                                id={email}
                                type={'email'}
                                value={email}
                                onChange={setEmail}
                                label={'Email'}
                                error={errors.email}
                            />

                            <HideInput
                                label={'Пароль'}
                                id={'password'}
                                value={password}
                                onChange={setPassword}
                                error={errors.password}
                            />

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
