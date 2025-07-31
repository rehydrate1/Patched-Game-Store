"use client"

import styles from "./Registration.module.scss";
import {FormEvent, useState} from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import MainInput from "@/components/UI/Inputs/MainInput/MainInput";
import Particles from "@/components/UI/Modern/Particles";
import {BackEndResponse} from "@/types/mainTypes";
import HideInput from "@/components/UI/Inputs/HideInput/HideInput";


export default function Registration(){

    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const router = useRouter();


    const validateUserName = (userName: string):string | null => {
        if(!userName.trim()){
            return ('Пожалуйста, введите имя для вашего аккаунта')
        }

        if(userName.length < 3){
            return (`Имя аккаунта должно содержать минимум 3 символов (сейчас ${userName.length})`)
        }

        if(userName.length > 15){
            return (`Имя аккаунта может содержать максимум 15 символов (сейчас ${userName.length})`)
        }

        const userNameRegex = /^[a-zA-Z0-9!@#$%^&*.]$/;
        if(!userNameRegex.test(userName)) {
            return ('Имя аккаунта может содержать только латинские буквы, цифры и некоторые спец.символы')
        }

        return null;
    }



    const validateEmail = (email: string): string | null => {
        if (!email.trim()){
            return ('Пожалуйста, введите ваш email');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return ('Пожалуйста, введите корректный email')
        }

        return null;
    };

    const validatePassword = (password: string):string | null => {
        if (!password.trim()){
            return ('Пожалуйста, введите пароль для входа в аккаунт');
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

    const validateConfirmPassword = (password:string, confirmPassword:string):string | null => {
        if (!password.trim()){
            return ('Пожалуйста, подтвердите ваш пароль');
        }

        if (password != confirmPassword){
            return ('Пароль не совпадает с тем, что вы ввели ранее')
        }

        return null;
    }


    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        const validateUserNameErrors:string | null = validateUserName(userName);
        if (validateUserNameErrors) {
            newErrors.userName = validateUserNameErrors;
        }

        const validateEmailErrors:string | null = validateEmail(email);
        if (validateEmailErrors) {
            newErrors.email = validateEmailErrors;
        }

        const validatePasswordErrors:string | null = validatePassword(password);
        if (validatePasswordErrors) {
            newErrors.password = validatePasswordErrors;
        }

        const validateConfirmPasswordErrors:string | null = validateConfirmPassword(password, confirmPassword);
        if (validateConfirmPasswordErrors) {
            newErrors.confirmPassword = validateConfirmPasswordErrors;
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
            userName: userName,
            email: email,
            password: password,
        }

        try {
            const response = await fetch("http://localhost:8080/api/user/registration", {
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
                setErrors({ form: data.error || "Ошибка регистрации" });
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setErrors({ form: "Ошибка соединения с сервером" });
        }
    }


    return (
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
                        Регистрация
                    </h2>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <MainInput
                            id={userName}
                            value={userName}
                            onChange={setUserName}
                            label={'Имя пользователя'}
                            error={errors.userName}
                        />

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

                        <MainInput
                            id={confirmPassword}
                            type={'password'}
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            label={'Повторите пароль'}
                            error={errors.confirmPassword}
                        />

                        <div>
                            <button
                                type="submit"
                                className={`w-full flex justify-center py-2 px-4 border border-transparent 
                                rounded-md shadow-sm text-m cursor-pointer font-medium text-black ${styles.submitButton}`}
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
        </div>
    );
}